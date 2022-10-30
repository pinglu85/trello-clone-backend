import { LexoRank } from 'lexorank';

import { CardModel, isErrorDuplicateRank } from '../../models';
import {
  EditConflictError,
  NoRecordError,
  UpdateOnClosedItemError,
} from '../errors';
import type { CardModule } from './generatedTypes/moduleTypes';
import type { Card, CardUpdateManyUpdateMap } from '../../models';

const Query: CardModule.QueryResolvers = {
  cards: (_, { listId }) => {
    return CardModel.getAll(listId);
  },

  card: async (_, { id }) => {
    const card = await CardModel.get(id);
    if (!card) throw new NoRecordError('Card');

    return card;
  },
};

const Mutation: CardModule.MutationResolvers = {
  createCard: async (_, { boardId, listId, name, rank }) => {
    try {
      return await CardModel.insert(boardId, listId, name, rank);
    } catch (error) {
      if (!isErrorDuplicateRank(error)) throw error;

      return await CardModel.resolveDuplicateRankOnInsert(
        boardId,
        listId,
        name,
        rank
      );
    }
  },

  moveAllCardsInList: async (
    _,
    { sourceListId, destinationBoardId, destinationListId }
  ) => {
    const updateMap: CardUpdateManyUpdateMap = {
      id: [],
      boardId: [],
      closed: [],
      description: [],
      listId: [],
      name: [],
      rank: [],
      version: [],
    };

    const cardsInDestinationList = await CardModel.getAll(destinationListId);
    const lastCard = getLast(cardsInDestinationList);
    let prevCardLexoRank = lastCard && LexoRank.parse(lastCard.rank);

    const cards = await CardModel.getAll(sourceListId);

    for (const card of cards) {
      const newLexoRank = prevCardLexoRank
        ? prevCardLexoRank.genNext()
        : LexoRank.middle();
      prevCardLexoRank = newLexoRank;

      updateMap.id.push(card.id);
      updateMap.boardId.push(destinationBoardId);
      updateMap.closed.push(card.closed);
      updateMap.description.push(card.description);
      updateMap.listId.push(destinationListId);
      updateMap.name.push(card.name);
      updateMap.rank.push(newLexoRank.toString());
      updateMap.version.push(card.version);
    }

    const updatedCards = await CardModel.updateMany(updateMap);
    if (updatedCards.length !== cards.length) {
      throw new EditConflictError('cards');
    }

    return updatedCards;
  },

  moveCard: async (_, { id, newBoardId, newListId, newRank }) => {
    const card = await CardModel.get(id);
    if (!card) throw new NoRecordError('Card');

    if (card.closed) throw new UpdateOnClosedItemError('card');

    const oldListId = card.listId;
    card.boardId = newBoardId;
    card.listId = newListId;
    card.rank = newRank;

    let updatedCard: Card | null = null;

    try {
      updatedCard = await CardModel.update(card);
    } catch (error) {
      if (!isErrorDuplicateRank(error)) throw error;

      updatedCard = await CardModel.resolveDuplicateRankOnUpdate(card);
    }

    if (!updatedCard) throw new EditConflictError('card');

    return {
      oldListId,
      card: updatedCard,
    };
  },

  updateCard: async (_, { id, updates: { closed, description, name } }) => {
    const card = await CardModel.get(id);
    if (!card) throw new NoRecordError('Card');

    if (card.closed) throw new UpdateOnClosedItemError('card');

    if (closed) card.closed = closed;

    if (description) card.description = description;

    if (name) card.name = name;

    const updatedCard = await CardModel.update(card);
    if (!updatedCard) throw new EditConflictError('card');

    return updatedCard;
  },
};

function getLast<T>(array: T[]): T | null {
  if (array.length === 0) return null;

  return array[array.length - 1];
}

// Cannot define the resolvers like below, because we will get an error
// of 'Index signature for type 'string' is missing in type 'Resolvers'.'
// when trying to merge resolvers.
// const resolvers: CardModule.Resolvers = {...}
export default {
  Query,
  Mutation,
};
