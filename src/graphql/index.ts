import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import boardResolvers from './board/resolvers';
import listResolvers from './list/resolvers';
import cardResolvers from './card/resolvers';

const typeDefsArray = loadFilesSync(path.join(__dirname, '.'), {
  extensions: ['graphql'],
  recursive: true,
});
const typeDefs = mergeTypeDefs(typeDefsArray);

const resolverArray = [boardResolvers, listResolvers, cardResolvers];
const resolvers = mergeResolvers(resolverArray);

export { typeDefs, resolvers };
