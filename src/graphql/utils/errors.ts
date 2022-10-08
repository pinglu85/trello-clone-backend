import { ApolloError, UserInputError } from 'apollo-server-express';

const ERROR_EDIT_CONFLICT = new ApolloError(
  'Edit conflict',
  'ERROR_EDIT_CONFLICT'
);

function generateErrorNotFound(itemName: string): UserInputError {
  return new UserInputError(`${itemName} not found`);
}

function generateErrorUpdateOnClosedItem(itemName: string): UserInputError {
  return new UserInputError(
    `Cannot update a ${itemName} that is already archived`
  );
}

export {
  ERROR_EDIT_CONFLICT,
  generateErrorNotFound,
  generateErrorUpdateOnClosedItem,
};
