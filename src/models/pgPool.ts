import { Pool } from 'pg';
import type { PoolClient, QueryResult, QueryResultRow } from 'pg';

const ErrPoolNotCreated = new Error('Please first create a pg pool');

class PgPool {
  #pool: Pool | null;

  constructor() {
    this.#pool = null;
  }

  async open(connectionString: string): Promise<void> {
    this.#pool = new Pool({
      connectionString,
    });

    await this.#pool.query('SELECT 1 + 1');
  }

  connect(): Promise<PoolClient> {
    if (!this.#pool) throw ErrPoolNotCreated;

    return this.#pool.connect();
  }

  query<R extends QueryResultRow>(
    query: string,
    args?: unknown[]
  ): Promise<QueryResult<R>> {
    if (!this.#pool) throw ErrPoolNotCreated;

    return this.#pool.query<R>(query, args);
  }

  close(): Promise<void> {
    if (!this.#pool) throw ErrPoolNotCreated;

    return this.#pool.end();
  }
}

const pgPool = new PgPool();

export default pgPool;
