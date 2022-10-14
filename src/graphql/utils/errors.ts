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

class NoRecordError extends GraphQLError {
  constructor(itemName: string) {
    const formattedItemName = capitalizeFirstLetter(itemName);
    super(`${formattedItemName} not found.`, {
      extensions: {
        code: 'ERROR_NO_RECORD',
      },
    });
  }
}

class UpdateOnClosedItemError extends UserInputError {
  constructor(itemName: string) {
    super(
      `Cannot update the ${itemName.toLowerCase()} that has/have been already archived.`
    );
  }
}

function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export {
  UserInputError,
  EditConflictError,
  NoRecordError,
  UpdateOnClosedItemError,
};
