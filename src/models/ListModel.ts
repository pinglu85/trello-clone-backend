import type { PoolClient } from 'pg';

import pgPool from './pgPool';
import findOrderableIndex from './utils/findOrderableIndex';
import calcItemRank from './utils/calcItemRank';
import NoRecordError from './errors';
import type { Orderable } from './types';

interface List {
  id: string;
  boardId: string;
  closed: boolean;
  createdAt: string;
  name: string;
  rank: string;
  updatedAt: string;
  version: number;
}

class ListModel {
  static async delete(id: string): Promise<boolean> {
    const queryText = `--sql
      DELETE FROM
        lists
      WHERE
        id = $1
        AND closed = true;
    `;

    const { rows } = await pgPool.query(queryText, [id]);

    return rows.length === 1;
  }

  static async get(id: string): Promise<List | null> {
    const queryText = `--sql
      SELECT
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        name,
        rank,
        updated_at AS "updatedAt",
        version
      FROM
        lists
      WHERE
        id = $1;
    `;

    const { rows } = await pgPool.query<List>(queryText, [id]);

    return rows.length === 0 ? null : rows[0];
  }

  static async getAll(boardId: string, closed: boolean): Promise<List[]> {
    const queryText = `--sql
      SELECT
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        name,
        rank,
        updated_at AS "updatedAt",
        version
      FROM
        lists
      WHERE
        board_id = $1
        AND closed = $2
      ORDER BY
        rank;     
    `;

    const { rows } = await pgPool.query<List>(queryText, [boardId, closed]);

    return rows;
  }

  static async insert(
    boardId: string,
    name: string,
    rank: string
  ): Promise<List> {
    const [queryText, args] = ListModel.#getInsertQueryTextAndArgs(
      boardId,
      name,
      rank
    );

    const { rows } = await pgPool.query<List>(queryText, args);

    return rows[0];
  }

  static async update(list: List): Promise<List | null> {
    const [queryText, args] = ListModel.#getUpdateQueryTextAndArgs(list);

    const { rows } = await pgPool.query<List>(queryText, args);

    return rows.length === 0 ? null : rows[0];
  }

  static async resolveDuplicateRankOnInsert(
    boardId: string,
    name: string,
    duplicateRank: string
  ): Promise<List> {
    const client = await pgPool.connect();

    try {
      await client.query('BEGIN');

      const newRank = await ListModel.#calcNewRankOnDuplicate(
        client,
        boardId,
        duplicateRank
      );

      const [queryText, args] = ListModel.#getInsertQueryTextAndArgs(
        boardId,
        name,
        newRank
      );

      const { rows } = await client.query<List>(queryText, args);

      await client.query('COMMIT');

      return rows[0];
    } catch (error) {
      await client.query('ROLLBACK');

      throw error;
    } finally {
      client.release();
    }
  }

  static async resolveDuplicateRankOnUpdate(list: List): Promise<List | null> {
    const client = await pgPool.connect();

    try {
      await client.query('BEGIN');

      const newRank = await ListModel.#calcNewRankOnDuplicate(
        client,
        list.boardId,
        list.rank
      );

      list.rank = newRank;

      const [queryText, args] = ListModel.#getUpdateQueryTextAndArgs(list);

      const { rows } = await client.query<List>(queryText, args);

      await client.query('COMMIT');

      return rows.length === 0 ? null : rows[0];
    } catch (error) {
      await client.query('ROLLBACK');

      throw error;
    } finally {
      client.release();
    }
  }

  static #getInsertQueryTextAndArgs(
    boardId: string,
    name: string,
    rank: string
  ): [queryText: string, args: unknown[]] {
    const queryText = `--sql
      INSERT INTO
        lists (board_id, name, rank)
      VALUES
        ($1, $2, $3)
      RETURNING
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        name,
        rank,
        updated_at AS "updatedAt",
        version;
    `;

    const args = [boardId, name, rank];

    return [queryText, args];
  }

  static #getUpdateQueryTextAndArgs(
    list: List
  ): [queryText: string, args: unknown[]] {
    const queryText = `--sql
      UPDATE
        lists
      SET
        board_id = $1,
        closed = $2,
        name = $3,
        rank = $4,
        updated_at = CURRENT_TIMESTAMP,
        version = version + 1
      WHERE
        id = $5
        AND version = $6
      RETURNING
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        name,
        rank,
        updated_at AS "updatedAt",
        version;
    `;

    const args = [
      list.boardId,
      list.closed,
      list.name,
      list.rank,
      list.id,
      list.version,
    ];

    return [queryText, args];
  }

  static async #calcNewRankOnDuplicate(
    client: PoolClient,
    boardId: string,
    duplicateRank: string
  ): Promise<string> {
    const queryText = `--sql
      SELECT
        rank
      FROM
        lists
      WHERE
        board_id = $1
        AND closed = false
      ORDER BY
        rank;
    `;

    const { rows: lists } = await client.query<Orderable>(queryText, [boardId]);
    const listWithDuplicateRankIndex = findOrderableIndex(lists, duplicateRank);

    if (listWithDuplicateRankIndex === -1) {
      throw new NoRecordError('list', 'rank', duplicateRank);
    }

    return calcItemRank(
      lists[listWithDuplicateRankIndex],
      lists[listWithDuplicateRankIndex + 1]
    );
  }
}

export default ListModel;

export type { List };
