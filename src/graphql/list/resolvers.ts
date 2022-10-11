import { UserInputError } from 'apollo-server-core';

import ListModel from '../../models/ListModel';
import {
  ERROR_EDIT_CONFLICT,
  generateErrorNotFound,
  generateErrorUpdateOnClosedItem,
} from '../utils/errors';
import CardModel from '../../models/CardModel';
import type { ListModule } from './generatedTypes/moduleTypes';

const Query: ListModule.QueryResolvers = {
  lists: (_, { boardId }) => {
    return ListModel.getAll(boardId);
  },

  list: async (_, { id }) => {
    const list = await ListModel.get(id);
    if (!list) throw generateErrorNotFound('List');

    return list;
  },
};

const Mutation: ListModule.MutationResolvers = {
  copyList: async (_, { targetId, newListRank }) => {
    const newList = await ListModel.duplicate(targetId, newListRank);
    if (!newList) {
      throw new UserInputError(
        'Target List either does not exist or has been archived'
      );
    }

    const newCards = await CardModel.duplicateAll(targetId, newList.id);

    return {
      ...newList,
      cards: newCards,
    };
  },

  createList: (_, { boardId, name, rank }) => {
    return ListModel.insert(boardId, name, rank);
  },

  moveList: async (_, { id, newBoardId, newRank }) => {
    const list = await ListModel.get(id);
    if (!list) throw generateErrorNotFound('List');

    if (list.closed) throw generateErrorUpdateOnClosedItem('list');

    const oldBoardId = list.boardId;
    list.boardId = newBoardId;
    list.rank = newRank;

    const updatedList = await ListModel.update(list);
    if (!updatedList) throw ERROR_EDIT_CONFLICT;

    return {
      id,
      boardId: updatedList.boardId,
      oldBoardId,
      rank: updatedList.rank,
    };
  },

  updateList: async (_, { id, updates: { closed, name } }) => {
    const list = await ListModel.get(id);
    if (!list) throw generateErrorNotFound('List');

    if (list.closed) throw generateErrorUpdateOnClosedItem('list');

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
