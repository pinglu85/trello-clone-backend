import ListModel from '../../models/ListModel';
import { ERROR_EDIT_CONFLICT, ERROR_NOT_FOUND } from '../../constants/errors';
import generateErrorUpdateOnClosedItem from '../../utils/generateErrorUpdateOnClosedItem';
import CardModel from '../../models/CardModel';
import type { ListModule } from './generatedTypes/moduleTypes';

const Query: ListModule.QueryResolvers = {
  lists: (_, { boardId }) => {
    return ListModel.getAll(boardId);
  },

  list: async (_, { id }) => {
    const list = await ListModel.get(id);
    if (!list) throw ERROR_NOT_FOUND;

    return list;
  },
};

const Mutation: ListModule.MutationResolvers = {
  createList: (_, { boardId, name, rank }) => {
    return ListModel.insert(boardId, name, rank);
  },

  updateList: async (
    _,
    { id, updateInput: { boardId, closed, name, rank } }
  ) => {
    const list = await ListModel.get(id);
    if (!list) throw ERROR_NOT_FOUND;

    if (list.closed) throw generateErrorUpdateOnClosedItem('list');

    if (boardId && rank) {
      list.boardId = boardId;
      list.rank = rank;
    }

    if (closed) list.closed = closed;

    if (name) list.name = name;

    const updatedList = await ListModel.update(list);
    if (!updatedList) throw ERROR_EDIT_CONFLICT;

    return updatedList;
  },
};

const List: ListModule.ListResolvers = {
  cards: (list) => {
    if (!list.id) return [];

    return CardModel.getAll(list.id);
  },
};

// Cannot define the resolvers like below, because we will get an error
// of 'Index signature for type 'string' is missing in type 'Resolvers'.'
// when trying to merge resolvers.
// const resolvers: ListModule.Resolvers = {};
export default {
  Query,
  Mutation,
  List,
};
