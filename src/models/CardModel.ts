import pgPool from './pgPool';

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

class CardModel {
  static async get(id: string): Promise<Card | null> {
    const query = `
      SELECT
        *
      FROM
        cards
      WHERE
        id = $1;
    `;

    const { rows } = await pgPool.query<Card>(query, [id]);

    return rows.length === 0 ? null : rows[0];
  }

  static async getAll(listId: string): Promise<Card[]> {
    const query = `
      SELECT
        *
      FROM
        cards
      WHERE 
        list_id = $1
        AND closed = false
      ORDER BY
        rank;    
    `;

    const { rows } = await pgPool.query<Card>(query, [listId]);

    return rows;
  }

  static async insert(
    boardId: string,
    listId: string,
    name: string,
    rank: string
  ): Promise<Card> {
    const query = `
      INSERT INTO 
        cards (board_id, list_id, name, rank)
      VALUES 
        ($1, $2, $3, $4)  
      RETURNING *;
    `;

    const { rows } = await pgPool.query<Card>(query, [
      boardId,
      listId,
      name,
      rank,
    ]);

    return rows[0];
  }

  static async update(card: Card): Promise<Card | null> {
    const query = `
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
      RETURNING *;
    `;

    const { rows } = await pgPool.query<Card>(query, [
      card.boardId,
      card.closed,
      card.description,
      card.listId,
      card.name,
      card.rank,
      card.id,
      card.version,
    ]);

    return rows.length === 0 ? null : rows[0];
  }
}

export default CardModel;

export type { Card };
