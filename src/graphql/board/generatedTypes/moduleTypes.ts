/* eslint-disable */
import * as Types from '../../generatedTypes/graphql';
import * as gm from 'graphql-modules';
export namespace BoardModule {
  interface DefinedFields {
    Board:
      | 'id'
      | 'backgroundColor'
      | 'backgroundImage'
      | 'closed'
      | 'lists'
      | 'name';
    Query: 'boards' | 'board';
    Mutation: 'createBoard' | 'deleteBoard' | 'updateBoard';
  }

  interface DefinedInputFields {
    BoardUpdates: 'background' | 'closed' | 'name';
  }

  export type Board = Pick<Types.Board, DefinedFields['Board']>;
  export type List = Types.List;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type BoardUpdates = Pick<
    Types.BoardUpdates,
    DefinedInputFields['BoardUpdates']
  >;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type BoardResolvers = Pick<
    Types.BoardResolvers,
    DefinedFields['Board'] | '__isTypeOf'
  >;
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields['Query']
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;

  export interface Resolvers {
    Board?: BoardResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Board?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      backgroundColor?: gm.Middleware[];
      backgroundImage?: gm.Middleware[];
      closed?: gm.Middleware[];
      lists?: gm.Middleware[];
      name?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      boards?: gm.Middleware[];
      board?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createBoard?: gm.Middleware[];
      deleteBoard?: gm.Middleware[];
      updateBoard?: gm.Middleware[];
    };
  }
}
