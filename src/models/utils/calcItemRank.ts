import { LexoRank } from 'lexorank';

import type { Orderable } from '../types';

function calcItemRank(
  prevItem: Orderable | undefined,
  nextItem: Orderable | undefined
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
