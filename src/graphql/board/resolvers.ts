import BoardModel from '../../models/BoardModel';
import getBoardBackground from './utils/gerBoardBackground';
import { EditConflictError, generateErrorNotFound } from '../utils/errors';
import ListModel from '../../models/ListModel';
import type { BoardModule } from './generatedTypes/moduleTypes';

const Query: BoardModule.QueryResolvers = {
  boards: (_, { closed }) => {
    return BoardModel.getAll(closed);
  },

  board: async (_, { id }) => {
    const board = await BoardModel.get(id);
    if (!board) throw generateErrorNotFound('Board');

    return board;
  },
};

const Mutation: BoardModule.MutationResolvers = {
  createBoard: (_, { background, name }) => {
    const { backgroundColor, backgroundImage } = getBoardBackground(background);

    return BoardModel.insert(backgroundColor, backgroundImage, name);
  },

  deleteBoard: (_, { id }) => {
    return BoardModel.delete(id);
  },

  updateBoard: async (_, { id, updates: { background, closed, name } }) => {
    const board = await BoardModel.get(id);
    if (!board) throw generateErrorNotFound('Board');

    if (background) {
      const { backgroundColor, backgroundImage } =
        getBoardBackground(background);
      board.backgroundColor = backgroundColor;
      board.backgroundImage = backgroundImage;
    }

    if (typeof closed === 'boolean') board.closed = closed;

    if (name) board.name = name;

    const updatedBoard = await BoardModel.update(board);
    if (!updatedBoard) throw new EditConflictError('board');

    return updatedBoard;
  },
};

const Board: BoardModule.BoardResolvers = {
  lists: (board) => {
    if (!board.id) return [];

    return ListModel.getAll(board.id);
  },
};

// Cannot define the resolvers like below, because we will get an error
// of 'Index signature for type 'string' is missing in type 'Resolvers'.'
// when trying to merge resolvers.
// const resolvers: BoardModule.Resolvers = {...};
export default {
  Query,
  Mutation,
  Board,
};
