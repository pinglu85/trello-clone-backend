import { LexoRank } from 'lexorank';

import { listNames } from './boardData';
import { ListModel } from '../models';
import type { List } from '../models';

async function createLists(boardId: string): Promise<List[]> {
  let lexoRank = LexoRank.middle();

  const promises = listNames.map((name) => {
    const listRank = lexoRank.toString();
    lexoRank = lexoRank.genNext();

    return ListModel.insert(boardId, name, listRank);
  });

  return await Promise.all(promises);
}

export default createLists;
