import { DatabaseError } from 'pg';

import { PG_UNIQUE_VIOLATION } from '../constants/postgresErrorCodes';

function isErrorDuplicateRank(error: unknown): boolean {
  if (error instanceof DatabaseError && error.code === PG_UNIQUE_VIOLATION) {
    return (
      error.constraint === 'lists_board_id_rank_idx' ||
      error.constraint === 'cards_list_id_rank_idx'
    );
  }

  return false;
}

export default isErrorDuplicateRank;
