import { ApolloError, UserInputError } from 'apollo-server-express';

export const ErrEditConflict = new ApolloError('Edit conflict');

export const ErrNotFound = new ApolloError('Item not found');

export const generateErrUpdateOnClosedItem = (
  itemName: string
): UserInputError => {
  return new UserInputError(
    `Cannot update a ${itemName} that is already archived`
  );
};
