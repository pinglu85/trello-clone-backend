import { LexoRank } from 'lexorank';

import { cardNames } from './boardData';
import { CardModel } from '../models';
import type { Card } from '../models';

function createCardsInList(
  boardId: string,
  listId: string,
  listName: string
): Promise<Card>[] {
  const cardsInList = cardNames[listName];
  let lexoRank = LexoRank.middle();

  return cardsInList.map((name) => {
    const cardRank = lexoRank.toString();
    lexoRank = lexoRank.genNext();

    return CardModel.insert(boardId, listId, name, cardRank);
  });
}

export default createCardsInList;
