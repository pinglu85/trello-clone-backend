/* eslint-disable */
import * as Types from '../../generatedTypes/graphql';
import * as gm from 'graphql-modules';
export namespace ListModule {
  interface DefinedFields {
    List: 'id' | 'boardId' | 'cards' | 'closed' | 'name' | 'rank';
    Query: 'lists' | 'list';
    Mutation: 'createList' | 'deleteList' | 'moveList' | 'updateList';
  }

  interface DefinedInputFields {
    ListUpdates: 'closed' | 'name';
  }

  export type List = Pick<Types.List, DefinedFields['List']>;
  export type Card = Types.Card;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ListUpdates = Pick<
    Types.ListUpdates,
    DefinedInputFields['ListUpdates']
  >;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type ListResolvers = Pick<
    Types.ListResolvers,
    DefinedFields['List'] | '__isTypeOf'
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
    List?: ListResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    List?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      boardId?: gm.Middleware[];
      cards?: gm.Middleware[];
      closed?: gm.Middleware[];
      name?: gm.Middleware[];
      rank?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      lists?: gm.Middleware[];
      list?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createList?: gm.Middleware[];
      deleteList?: gm.Middleware[];
      moveList?: gm.Middleware[];
      updateList?: gm.Middleware[];
    };
  }
}
