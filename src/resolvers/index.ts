import * as path from 'path';
import { fileLoader } from 'merge-graphql-schemas';

export const resolvers = fileLoader(path.join(__dirname, './**/*'));
