/* eslint-disable */
import * as Types from '../../generatedTypes/graphql';
import * as gm from 'graphql-modules';
export namespace CardModule {
  interface DefinedFields {
    Card:
      | 'id'
      | 'boardId'
      | 'closed'
      | 'createdAt'
      | 'description'
      | 'listId'
      | 'name'
      | 'rank'
      | 'updatedAt'
      | 'version';
    Query: 'cards' | 'card';
    Mutation: 'createCard' | 'updateCard';
  }

  interface DefinedInputFields {
    CardUpdateInput:
      | 'boardId'
      | 'closed'
      | 'description'
      | 'listId'
      | 'name'
      | 'rank';
  }

  export type Card = Pick<Types.Card, DefinedFields['Card']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type CardUpdateInput = Pick<
    Types.CardUpdateInput,
    DefinedInputFields['CardUpdateInput']
  >;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;

  export type CardResolvers = Pick<
    Types.CardResolvers,
    DefinedFields['Card'] | '__isTypeOf'
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
    Card?: CardResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Date?: Types.Resolvers['Date'];
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Card?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      boardId?: gm.Middleware[];
      closed?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      description?: gm.Middleware[];
      listId?: gm.Middleware[];
      name?: gm.Middleware[];
      rank?: gm.Middleware[];
      updatedAt?: gm.Middleware[];
      version?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      cards?: gm.Middleware[];
      card?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createCard?: gm.Middleware[];
      updateCard?: gm.Middleware[];
    };
  }
}
