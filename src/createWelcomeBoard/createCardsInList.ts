import { LexoRank } from 'lexorank';

import { cardNames } from './boardData';
import CardModel from '../models/CardModel';
import type { Card } from '../models/CardModel';

function createCardsInList(
  boardId: number,
  listId: number,
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
