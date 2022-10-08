import CardModel from '../../models/CardModel';
import {
  ERROR_EDIT_CONFLICT,
  generateErrorNotFound,
  generateErrorUpdateOnClosedItem,
} from '../utils/errors';
import type { CardModule } from './generatedTypes/moduleTypes';

const Query: CardModule.QueryResolvers = {
  cards: (_, { listId }) => {
    return CardModel.getAll(listId);
  },

  card: async (_, { id }) => {
    const card = await CardModel.get(id);
    if (!card) throw generateErrorNotFound('Card');

    return card;
  },
};

const Mutation: CardModule.MutationResolvers = {
  createCard: (_, { boardId, listId, name, rank }) => {
    return CardModel.insert(boardId, listId, name, rank);
  },

  moveCard: async (_, { id, boardId, listId, rank }) => {
    const card = await CardModel.get(id);
    if (!card) throw generateErrorNotFound('Card');

    if (card.closed) throw generateErrorUpdateOnClosedItem('card');

    const oldBoardId = card.boardId;
    const oldListId = card.listId;
    card.boardId = boardId;
    card.listId = listId;
    card.rank = rank;

    const updatedCard = await CardModel.update(card);
    if (!updatedCard) throw ERROR_EDIT_CONFLICT;

    return {
      id,
      boardId: updatedCard.boardId,
      listId: updatedCard.listId,
      oldBoardId,
      oldListId,
      rank: updatedCard.rank,
      version: updatedCard.version,
    };
  },

  updateCard: async (_, { id, updates: { closed, description, name } }) => {
    const card = await CardModel.get(id);
    if (!card) throw generateErrorNotFound('Card');

    if (card.closed) throw generateErrorUpdateOnClosedItem('card');

    if (closed) card.closed = closed;

    if (description) card.description = description;

    if (name) card.name = name;

    const updatedCard = await CardModel.update(card);
    if (!updatedCard) throw ERROR_EDIT_CONFLICT;

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
