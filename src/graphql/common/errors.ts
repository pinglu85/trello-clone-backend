import { ApolloError, UserInputError } from 'apollo-server-express';

export const ErrorEditConflict = new ApolloError('Edit conflict');

export const ErrorNotFound = new ApolloError('Item not found');

export const generateErrorUpdateOnClosedItem = (
  itemName: string
): UserInputError => {
  return new UserInputError(
    `Cannot update a ${itemName} that is already archived`
  );
};
