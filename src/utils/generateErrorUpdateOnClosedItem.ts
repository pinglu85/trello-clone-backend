import { UserInputError } from 'apollo-server-express';

function generateErrorUpdateOnClosedItem(itemName: string): UserInputError {
  return new UserInputError(
    `Cannot update a ${itemName} that is already archived`
  );
}

export default generateErrorUpdateOnClosedItem;
