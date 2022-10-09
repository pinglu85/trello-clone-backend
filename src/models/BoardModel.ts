import pgPool from './pgPool';

interface Board {
  id: number;
  backgroundColor: string | null;
  backgroundImage: string | null;
  closed: boolean;
  createdAt: string;
  name: string;
  updatedAt: string;
  version: number;
}

class BoardModel {
  static async get(id: number): Promise<Board | null> {
    const query = `--sql
      SELECT
        id,
        background_color AS "backgroundColor",
        background_image AS "backgroundImage",
        closed,
        created_at AS "createdAt",
        name,
        updated_at AS "updatedAt",
        version
      FROM
        boards
      WHERE
        id = $1;
    `;

    const { rows } = await pgPool.query<Board>(query, [id]);

    return rows.length === 0 ? null : rows[0];
  }

  static async getAll(closed: boolean): Promise<Board[]> {
    const query = `--sql
      SELECT
        id,
        background_color AS "backgroundColor",
        background_image AS "backgroundImage",
        closed,
        created_at AS "createdAt",
        name,
        updated_at AS "updatedAt",
        version
      FROM
        boards
      WHERE
        closed = $1;
    `;

    const { rows } = await pgPool.query<Board>(query, [closed]);

    return rows;
  }

  static async insert(
    backgroundColor: string | null,
    backgroundImage: string | null,
    name: string
  ): Promise<Board> {
    const query = `--sql
      INSERT INTO
        boards (background_color, background_image, name)
      VALUES
        ($1, $2, $3)
      RETURNING
        id,
        background_color AS "backgroundColor",
        background_image AS "backgroundImage",
        closed,
        created_at AS "createdAt",
        name,
        updated_at AS "updatedAt",
        version;
    `;

    const { rows } = await pgPool.query<Board>(query, [
      backgroundColor,
      backgroundImage,
      name,
    ]);

    return rows[0];
  }

  static async update(board: Board): Promise<Board | null> {
    const query = `--sql
      UPDATE
        boards
      SET
        background_color = $1,
        background_image = $2,
        closed = $3,
        name = $4,
        updated_at = CURRENT_TIMESTAMP,
        version = version + 1
      WHERE
        id = $5
        AND version = $6
      RETURNING
        id,
        background_color AS "backgroundColor",
        background_image AS "backgroundImage",
        closed,
        created_at AS "createdAt",
        name,
        updated_at AS "updatedAt",
        version;
    `;

    const { rows } = await pgPool.query<Board>(query, [
      board.backgroundColor,
      board.backgroundImage,
      board.closed,
      board.name,
      board.id,
      board.version,
    ]);

    return rows.length === 0 ? null : rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const query = `--sql
      DELETE FROM
        boards
      WHERE
        id = $1
        AND closed = true;
    `;

    const { rowCount } = await pgPool.query(query, [id]);

    return rowCount === 1;
  }
}

export default BoardModel;

export type { Board };
