import CardModel from '../../models/CardModel';
import { ERROR_EDIT_CONFLICT, ERROR_NOT_FOUND } from '../../constants/errors';
import generateErrorUpdateOnClosedItem from '../../utils/generateErrorUpdateOnClosedItem';
import type { CardModule } from './generatedTypes/moduleTypes';

const Query: CardModule.QueryResolvers = {
  cards: (_, { listId }) => {
    return CardModel.getAll(listId);
  },

  card: async (_, { id }) => {
    const card = await CardModel.get(id);
    if (!card) throw ERROR_NOT_FOUND;

    return card;
  },
};

const Mutation: CardModule.MutationResolvers = {
  createCard: (_, { boardId, listId, name, rank }) => {
    return CardModel.insert(boardId, listId, name, rank);
  },

  updateCard: async (
    _,
    { id, updates: { boardId, closed, description, listId, name, rank } }
  ) => {
    const card = await CardModel.get(id);
    if (!card) throw ERROR_NOT_FOUND;

    if (card.closed) throw generateErrorUpdateOnClosedItem('card');

    if (boardId && listId && rank) {
      card.boardId = boardId;
      card.listId = listId;
      card.rank = rank;
    }

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
