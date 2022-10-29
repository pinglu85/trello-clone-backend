class NoRecordError extends Error {
  constructor(itemName: string, columnName: string, columnValue: unknown) {
    super(`There is no ${itemName} with ${columnName}: ${columnValue}`);
  }
}

export default NoRecordError;
