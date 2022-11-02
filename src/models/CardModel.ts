import type { PoolClient } from 'pg';

import pgPool from './pgPool';
import findOrderableIndex from './utils/findOrderableIndex';
import NoRecordError from './errors';
import calcItemRank from './utils/calcItemRank';
import type { Orderable } from './types';

interface Card {
  id: string;
  boardId: string;
  closed: boolean;
  createdAt: string;
  description: string | null;
  listId: string;
  name: string;
  rank: string;
  updatedAt: string;
  version: number;
}

interface CardUpdateManyUpdateMap {
  id: Card['id'][];
  boardId: Card['boardId'][];
  closed: Card['closed'][];
  description: Card['description'][];
  listId: Card['listId'][];
  name: Card['name'][];
  rank: Card['rank'][];
  version: Card['version'][];
}

class CardModel {
  static async delete(id: string): Promise<boolean> {
    const queryText = `--sql
      DELETE FROM
        cards
      WHERE
        id = $1
        AND closed = true;
    `;

    const { rows } = await pgPool.query(queryText, [id]);

    return rows.length === 1;
  }

  static async get(id: string): Promise<Card | null> {
    const queryText = `--sql
      SELECT
        id::text,
        board_id AS "boardId",
        closed,
        created_at AS "createdAt",
        description,
        list_id AS "listId",
        name,
        rank,
        updated_at AS "updatedAt",
        version
      FROM
        cards
      WHERE
        id = $1;
    `;

    const { rows } = await pgPool.query<Card>(queryText, [id]);

    return rows.length === 0 ? null : rows[0];
  }

  static async getAll(listId: string, closed: boolean): Promise<Card[]> {
    const queryText = `--sql
      SELECT
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        description,
        list_id::text AS "listId",
        name,
        rank,
        updated_at AS "updatedAt",
        version
      FROM
        cards
      WHERE
        list_id = $1
        AND closed = $2
      ORDER BY
        rank;    
    `;

    const { rows } = await pgPool.query<Card>(queryText, [listId, closed]);

    return rows;
  }

  static async insert(
    boardId: string,
    listId: string,
    name: string,
    rank: string
  ): Promise<Card> {
    const [queryText, args] = CardModel.#getInsertQueryTextAndArgs(
      boardId,
      listId,
      name,
      rank
    );

    const { rows } = await pgPool.query<Card>(queryText, args);

    return rows[0];
  }

  static async duplicateAll(
    oldListId: string,
    newListId: string
  ): Promise<Card[]> {
    const queryText = `--sql
      WITH inserted AS (
        INSERT INTO 
          cards (board_id, description, list_id, name, rank) (
            SELECT 
              board_id, 
              description, 
              $1 AS list_id, 
              name, 
              rank
            FROM 
              cards 
            WHERE 
              list_id = $2 
              AND closed = false   
          )
        RETURNING 
          id::text,
          board_id::text AS "boardId",
          closed,
          created_at AS "createdAt",
          description,
          list_id::text AS "listId",
          name,
          rank,
          updated_at AS "updatedAt",
          version    
      )
      SELECT 
        * 
      FROM 
        inserted
      ORDER BY 
        rank;    
    `;

    const { rows } = await pgPool.query<Card>(queryText, [
      newListId,
      oldListId,
    ]);

    return rows;
  }

  static async update(card: Card): Promise<Card | null> {
    const [queryText, args] = CardModel.#getUpdateQueryTextAndArgs(card);

    const { rows } = await pgPool.query<Card>(queryText, args);

    return rows.length === 0 ? null : rows[0];
  }

  static async updateMany(updateMap: CardUpdateManyUpdateMap): Promise<Card[]> {
    const queryText = `--sql
      WITH data AS (
        SELECT
          *
        FROM
          UNNEST (
            $1::int[],     --id
            $2::int[],     --board_id
            $3::boolean[], --closed
            $4::text[],    --description
            $5::int[],     --list_id
            $6::text[],    --name
            $7::text[],    --rank
            $8::int[]      --version
          ) AS DATA(id, board_id, closed, description, list_id, name, rank, version)
      ), 
      updated AS (
        UPDATE
          cards AS c
        SET
          board_id = d.board_id,
          closed = d.closed,
          description = d.description,
          list_id = d.list_id,
          name = d.name,
          rank = d.rank,
          updated_at = CURRENT_TIMESTAMP,
          version = c.version + 1
        FROM
          data AS d
        WHERE
          c.id = d.id
          AND c.version = d.version
        RETURNING
          c.id::text,
          c.board_id::text AS "boardId",
          c.closed,
          c.created_at AS "createdAt",
          c.description,
          c.list_id::text AS "listId",
          c.name,
          c.rank,
          c.updated_at AS "updatedAt",
          c.version
      )
      SELECT
        *
      FROM
        updated
      ORDER BY
        rank;
    `;

    const { rows } = await pgPool.query<Card>(queryText, [
      updateMap.id,
      updateMap.boardId,
      updateMap.closed,
      updateMap.description,
      updateMap.listId,
      updateMap.name,
      updateMap.rank,
      updateMap.version,
    ]);

    return rows;
  }

  static async resolveDuplicateRankOnInsert(
    boardId: string,
    listId: string,
    name: string,
    duplicateRank: string
  ): Promise<Card> {
    const client = await pgPool.connect();

    try {
      await client.query('BEGIN');

      const newRank = await CardModel.#calcNewRankOnDuplicate(
        client,
        listId,
        duplicateRank
      );

      const [queryText, args] = CardModel.#getInsertQueryTextAndArgs(
        boardId,
        listId,
        name,
        newRank
      );

      const { rows } = await client.query<Card>(queryText, args);

      await client.query('COMMIT');

      return rows[0];
    } catch (error) {
      await client.query('ROLLBACK');

      throw error;
    } finally {
      client.release();
    }
  }

  static async resolveDuplicateRankOnUpdate(card: Card): Promise<Card | null> {
    const client = await pgPool.connect();

    try {
      await client.query('BEGIN');

      const newRank = await CardModel.#calcNewRankOnDuplicate(
        client,
        card.listId,
        card.rank
      );

      card.rank = newRank;

      const [queryText, args] = CardModel.#getUpdateQueryTextAndArgs(card);

      const { rows } = await client.query<Card>(queryText, args);

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
    listId: string,
    name: string,
    rank: string
  ): [queryText: string, args: unknown[]] {
    const queryText = `--sql
      INSERT INTO
        cards (board_id, list_id, name, rank)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        description,
        list_id::text AS "listId",
        name,
        rank,
        updated_at AS "updatedAt",
        version;
    `;

    const args = [boardId, listId, name, rank];

    return [queryText, args];
  }

  static #getUpdateQueryTextAndArgs(
    card: Card
  ): [queryText: string, args: unknown[]] {
    const queryText = `--sql
      UPDATE
        cards
      SET
        board_id = $1,
        closed = $2,
        description = $3,
        list_id = $4,
        name = $5,
        rank = $6,
        updated_at = CURRENT_TIMESTAMP,
        version = version + 1
      WHERE
        id = $7
        AND version = $8
      RETURNING
        id::text,
        board_id::text AS "boardId",
        closed,
        created_at AS "createdAt",
        description,
        list_id::text AS "listId",
        name,
        rank,
        updated_at AS "updatedAt",
        version;
    `;

    const args = [
      card.boardId,
      card.closed,
      card.description,
      card.listId,
      card.name,
      card.rank,
      card.id,
      card.version,
    ];

    return [queryText, args];
  }

  static async #calcNewRankOnDuplicate(
    client: PoolClient,
    listId: string,
    duplicateRank: string
  ): Promise<string> {
    const queryText = `--sql
      SELECT
        rank
      FROM
        cards
      WHERE
        list_id = $1
        AND closed = false
      ORDER BY
        rank;
    `;

    const { rows: cards } = await client.query<Orderable>(queryText, [listId]);
    const cardWithDuplicateRankIndex = findOrderableIndex(cards, duplicateRank);
    if (cardWithDuplicateRankIndex === -1) {
      throw new NoRecordError('card', 'rank', duplicateRank);
    }

    return calcItemRank(
      cards[cardWithDuplicateRankIndex],
      cards[cardWithDuplicateRankIndex + 1]
    );
  }
}

export default CardModel;

export type { Card, CardUpdateManyUpdateMap };
