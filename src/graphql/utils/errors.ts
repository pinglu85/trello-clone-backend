import { GraphQLError } from 'graphql';

class UserInputError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
}

class EditConflictError extends GraphQLError {
  constructor(itemName: string) {
    super(
      `Unable to update the ${itemName.toLowerCase()} due to an edit conflict.`,
      {
        extensions: {
          code: 'ERROR_EDIT_CONFLICT',
        },
      }
    );
  }
}

function generateErrorNotFound(itemName: string): UserInputError {
  return new UserInputError(`${itemName} not found`);
}

function generateErrorUpdateOnClosedItem(itemName: string): UserInputError {
  return new UserInputError(
    `Cannot update a ${itemName} that is already archived`
  );
}

export {
  UserInputError,
  EditConflictError,
  generateErrorNotFound,
  generateErrorUpdateOnClosedItem,
};
