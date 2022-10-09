import { UserInputError } from 'apollo-server-core';

function convertIdToNumber(id: string | number): number {
  const converted = Number(id);
  if (isNaN(converted)) throw new UserInputError('Invalid ID');

  return converted;
}

export default convertIdToNumber;
