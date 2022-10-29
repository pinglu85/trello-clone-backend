import { LexoRank } from 'lexorank';

import type { Orderable } from '../types';

function calcItemRank<T extends Orderable>(
  prevItem: T | undefined,
  nextItem: T | undefined
): string {
  const prevItemLexoRank = prevItem && LexoRank.parse(prevItem.rank);
  const nextItemLexoRank = nextItem && LexoRank.parse(nextItem.rank);
  let itemLexoRank;

  if (prevItemLexoRank && nextItemLexoRank) {
    itemLexoRank = prevItemLexoRank.between(nextItemLexoRank);
  } else if (nextItemLexoRank) {
    itemLexoRank = nextItemLexoRank.genPrev();
  } else if (prevItemLexoRank) {
    itemLexoRank = prevItemLexoRank.genNext();
  } else {
    itemLexoRank = LexoRank.middle();
  }

  return itemLexoRank.toString();
}

export default calcItemRank;
