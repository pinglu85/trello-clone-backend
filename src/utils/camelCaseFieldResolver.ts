import type { GraphQLFieldResolver } from 'graphql/type';

const camelCaseFieldResolver: GraphQLFieldResolver<
  Record<string, unknown>,
  unknown
> = (source, args, contextValue, info) => {
  const fieldName = snakeCaseToCamelCase(info.fieldName);
  return source[fieldName];
};

function snakeCaseToCamelCase(str: string): string {
  const words = str.split('_');

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    words[i] = word[0].toUpperCase() + word.slice(1);
  }

  return words.join('');
}

export default camelCaseFieldResolver;
