import { ApolloError, UserInputError } from 'apollo-server-express';

export const ERROR_EDIT_CONFLICT = new ApolloError(
  'Edit conflict',
  'ERROR_EDIT_CONFLICT'
);

export const ERROR_NOT_FOUND = new UserInputError('Item not found');
