import ListModel from '../../models/ListModel';
import {
  EditConflictError,
  NoRecordError,
  UpdateOnClosedItemError,
} from '../utils/errors';
import CardModel from '../../models/CardModel';
import type { ListModule } from './generatedTypes/moduleTypes';

const Query: ListModule.QueryResolvers = {
  lists: (_, { boardId }) => {
    return ListModel.getAll(boardId);
  },

  list: async (_, { id }) => {
    const list = await ListModel.get(id);
    if (!list) throw new NoRecordError('List');

    return list;
  },
};

const Mutation: ListModule.MutationResolvers = {
  copyList: async (_, { sourceListId, newListName, newListRank }) => {
    const newList = await ListModel.duplicate(
      sourceListId,
      newListName,
      newListRank
    );
    if (!newList) throw new NoRecordError('List');

    const newCards = await CardModel.duplicateAll(sourceListId, newList.id);

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
    if (!list) throw new NoRecordError('List');

    if (list.closed) throw new UpdateOnClosedItemError('list');

    const oldBoardId = list.boardId;
    list.boardId = newBoardId;
    list.rank = newRank;

    const updatedList = await ListModel.update(list);
    if (!updatedList) throw new EditConflictError('list');

    return {
      id,
      boardId: updatedList.boardId,
      oldBoardId,
      rank: updatedList.rank,
    };
  },

  updateList: async (_, { id, updates: { closed, name } }) => {
    const list = await ListModel.get(id);
    if (!list) throw new NoRecordError('List');

    if (list.closed) throw new UpdateOnClosedItemError('list');

    if (closed) list.closed = closed;

    if (name) list.name = name;

    const updatedList = await ListModel.update(list);
    if (!updatedList) throw new EditConflictError('list');

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
