/* eslint-disable */
import * as Types from '../../generatedTypes/graphql';
import * as gm from 'graphql-modules';
export namespace ListModule {
  interface DefinedFields {
    List:
      | 'id'
      | 'boardId'
      | 'cards'
      | 'closed'
      | 'createdAt'
      | 'name'
      | 'rank'
      | 'updatedAt'
      | 'version';
    Query: 'lists' | 'list';
    Mutation: 'createList' | 'updateList';
  }

  interface DefinedInputFields {
    ListUpdateInput: 'boardId' | 'closed' | 'name' | 'rank';
  }

  export type List = Pick<Types.List, DefinedFields['List']>;
  export type Card = Types.Card;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type ListUpdateInput = Pick<
    Types.ListUpdateInput,
    DefinedInputFields['ListUpdateInput']
  >;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;

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
    Date?: Types.Resolvers['Date'];
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
      createdAt?: gm.Middleware[];
      name?: gm.Middleware[];
      rank?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
      version?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      lists?: gm.Middleware[];
      list?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createList?: gm.Middleware[];
      updateList?: gm.Middleware[];
    };
  }
}
