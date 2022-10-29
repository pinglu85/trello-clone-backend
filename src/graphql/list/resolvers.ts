import { ListModel, CardModel, isErrorDuplicateRank } from '../../models';
import {
  EditConflictError,
  NoRecordError,
  UpdateOnClosedItemError,
} from '../utils/errors';
import type { ListModule } from './generatedTypes/moduleTypes';
import type { List } from '../../models';

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
  createList: async (_, { boardId, name, rank, sourceListId }) => {
    let list: List | null = null;

    try {
      list = await ListModel.insert(boardId, name, rank);
    } catch (error) {
      if (isErrorDuplicateRank(error)) throw error;

      list = await ListModel.resolveDuplicateRankOnInsert(boardId, name, rank);
    }

    if (!sourceListId) return list;

    const cards = await CardModel.duplicateAll(sourceListId, list.id);

    return {
      ...list,
      cards: cards,
    };
  },

  moveList: async (_, { id, newBoardId, newRank }) => {
    const list = await ListModel.get(id);
    if (!list) throw new NoRecordError('List');

    if (list.closed) throw new UpdateOnClosedItemError('list');

    const oldBoardId = list.boardId;
    list.boardId = newBoardId;
    list.rank = newRank;

    let updatedList: List | null = null;

    try {
      updatedList = await ListModel.update(list);
    } catch (error) {
      if (!isErrorDuplicateRank) throw error;

      updatedList = await ListModel.resolveDuplicateRankOnUpdate(list);
    }

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
