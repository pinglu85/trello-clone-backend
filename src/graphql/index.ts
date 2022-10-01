import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typeDefsArray = loadFilesSync(path.join(__dirname, '.'), {
  extensions: ['graphql'],
  recursive: true,
});
const typeDefs = mergeTypeDefs(typeDefsArray);

export { typeDefs };
