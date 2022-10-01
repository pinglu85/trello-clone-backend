import type { GraphQLFieldResolver } from 'graphql/type';

const snakeCaseFieldResolver: GraphQLFieldResolver<
  Record<string, unknown>,
  unknown
> = (source, args, contextValue, info) => {
  const fieldName = camelCaseToSnakeCase(info.fieldName);
  return source[fieldName];
};

function camelCaseToSnakeCase(str: string): string {
  return str.replace(/(?!^)([A-Z])/g, (_, p1) => {
    return '_' + p1.toLowerCase();
  });
}

export default snakeCaseFieldResolver;
