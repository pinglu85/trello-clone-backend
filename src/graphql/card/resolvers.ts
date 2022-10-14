import CardModel from '../../models/CardModel';
import {
  UserInputError,
  EditConflictError,
  NoRecordError,
  UpdateOnClosedItemError,
} from '../utils/errors';
import type { CardModule } from './generatedTypes/moduleTypes';
import type { UpdateManyUpdateMap } from '../../models/CardModel';

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
  createCard: (_, { boardId, listId, name, rank }) => {
    return CardModel.insert(boardId, listId, name, rank);
  },

  moveAllCardsInList: async (
    _,
    { oldListId, newBoardId, newListId, newRankMap }
  ) => {
    const cards = await CardModel.getAll(oldListId);
    const numOfCardsNeedUpdate = Object.keys(newRankMap).length;

    if (cards.length !== numOfCardsNeedUpdate) {
      throw new UserInputError(
        'Some of the cards either do not exist or have been archived.'
      );
    }

    const updateMap: UpdateManyUpdateMap = {
      id: [],
      boardId: [],
      closed: [],
      description: [],
      listId: [],
      name: [],
      rank: [],
      version: [],
    };

    for (const card of cards) {
      if (!Object.prototype.hasOwnProperty.call(newRankMap, card.id)) {
        throw new UserInputError(`Missing rank for card with id ${card.id}.`);
      }

      updateMap.id.push(card.id);
      updateMap.boardId.push(newBoardId);
      updateMap.closed.push(card.closed);
      updateMap.description.push(card.description);
      updateMap.listId.push(newListId);
      updateMap.name.push(card.name);
      updateMap.rank.push(newRankMap[card.id]);
      updateMap.version.push(card.version);
    }

    const updatedCards = await CardModel.updateMany(updateMap);
    if (updatedCards.length !== numOfCardsNeedUpdate) {
      throw new EditConflictError('cards');
    }

    return {
      oldListId,
      cards: updatedCards,
    };
  },

  moveCard: async (_, { id, newBoardId, newListId, newRank }) => {
    const card = await CardModel.get(id);
    if (!card) throw new NoRecordError('Card');

    if (card.closed) throw new UpdateOnClosedItemError('card');

    const oldListId = card.listId;
    card.boardId = newBoardId;
    card.listId = newListId;
    card.rank = newRank;

    const updatedCard = await CardModel.update(card);
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

// Cannot define the resolvers like below, because we will get an error
// of 'Index signature for type 'string' is missing in type 'Resolvers'.'
// when trying to merge resolvers.
// const resolvers: CardModule.Resolvers = {...}
export default {
  Query,
  Mutation,
};
