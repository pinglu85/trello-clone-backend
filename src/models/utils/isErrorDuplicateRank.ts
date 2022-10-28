import { DatabaseError } from 'pg';

import { PG_UNIQUE_VIOLATION } from '../constants/postgresErrorCodes';

function isErrorDuplicateRank(error: unknown): boolean {
  return (
    error instanceof DatabaseError &&
    error.code === PG_UNIQUE_VIOLATION &&
    error.constraint === 'lists_uc_board_id_rank'
  );
}

export default isErrorDuplicateRank;
