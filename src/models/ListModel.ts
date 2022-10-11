import pgPool from './pgPool';

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
  static async get(id: string): Promise<List | null> {
    const query = `--sql
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

    const { rows } = await pgPool.query<List>(query, [id]);

    return rows.length === 0 ? null : rows[0];
  }

  static async getAll(boardId: string): Promise<List[]> {
    const query = `--sql
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
        AND closed = false
      ORDER BY
        rank;     
    `;

    const { rows } = await pgPool.query<List>(query, [boardId]);

    return rows;
  }

  static async insert(
    boardId: string,
    name: string,
    rank: string
  ): Promise<List> {
    const query = `--sql
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

    const { rows } = await pgPool.query<List>(query, [boardId, name, rank]);

    return rows[0];
  }

  static async duplicate(
    targetId: string,
    newListName: string,
    newListRank: string
  ): Promise<List | null> {
    const query = `--sql
      INSERT INTO
        lists (board_id, name, rank) (
          SELECT
            board_id,
            $1 AS name,
            $2 AS rank
          FROM
            lists
          WHERE
            id = $3
            AND closed = false
        )
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

    const { rows } = await pgPool.query<List>(query, [
      newListName,
      newListRank,
      targetId,
    ]);

    return rows.length === 0 ? null : rows[0];
  }

  static async update(list: List): Promise<List | null> {
    const query = `--sql
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

    const { rows } = await pgPool.query<List>(query, [
      list.boardId,
      list.closed,
      list.name,
      list.rank,
      list.id,
      list.version,
    ]);

    return rows.length === 0 ? null : rows[0];
  }
}

export default ListModel;

export type { List };
