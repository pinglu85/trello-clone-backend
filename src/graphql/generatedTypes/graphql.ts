/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Board = {
  __typename?: 'Board';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['String']>;
  closed: Scalars['Boolean'];
  id: Scalars['ID'];
  lists: Array<List>;
  name: Scalars['String'];
};

export type BoardUpdates = {
  background?: InputMaybe<Scalars['String']>;
  closed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Card = {
  __typename?: 'Card';
  boardId: Scalars['String'];
  closed: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  listId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
};

export type CardUpdates = {
  closed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type List = {
  __typename?: 'List';
  boardId: Scalars['String'];
  cards: Array<Card>;
  closed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  rank: Scalars['String'];
};

export type ListUpdates = {
  closed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveAllCards: Array<Card>;
  createBoard: Board;
  createCard: Card;
  createList: List;
  deleteBoard: Scalars['Boolean'];
  deleteCard: Scalars['Boolean'];
  deleteList: Scalars['Boolean'];
  moveAllCardsInList: Array<Card>;
  moveCard: Card;
  moveList: List;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
};


export type MutationArchiveAllCardsArgs = {
  listId: Scalars['String'];
};


export type MutationCreateBoardArgs = {
  background: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateCardArgs = {
  boardId: Scalars['String'];
  listId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
};


export type MutationCreateListArgs = {
  boardId: Scalars['String'];
  name: Scalars['String'];
  rank: Scalars['String'];
  sourceListId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID'];
};


export type MutationMoveAllCardsInListArgs = {
  destinationBoardId: Scalars['String'];
  destinationListId: Scalars['String'];
  sourceListId: Scalars['String'];
};


export type MutationMoveCardArgs = {
  destinationBoardId: Scalars['String'];
  destinationListId: Scalars['String'];
  id: Scalars['ID'];
  newRank: Scalars['String'];
  sourceListId: Scalars['String'];
};


export type MutationMoveListArgs = {
  destinationBoardId: Scalars['String'];
  id: Scalars['ID'];
  newRank: Scalars['String'];
  sourceBoardId: Scalars['String'];
};


export type MutationUpdateBoardArgs = {
  id: Scalars['ID'];
  updates: BoardUpdates;
};


export type MutationUpdateCardArgs = {
  id: Scalars['ID'];
  updates: CardUpdates;
};


export type MutationUpdateListArgs = {
  id: Scalars['ID'];
  updates: ListUpdates;
};

export type Query = {
  __typename?: 'Query';
  board: Board;
  boards: Array<Board>;
  card: Card;
  cards: Array<Card>;
  list: List;
  lists: Array<List>;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};


export type QueryBoardsArgs = {
  closed: Scalars['Boolean'];
};


export type QueryCardArgs = {
  id: Scalars['ID'];
};


export type QueryCardsArgs = {
  closed: Scalars['Boolean'];
  listId: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['ID'];
};


export type QueryListsArgs = {
  boardId: Scalars['String'];
  closed: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Board: ResolverTypeWrapper<Partial<Board>>;
  BoardUpdates: ResolverTypeWrapper<Partial<BoardUpdates>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Card: ResolverTypeWrapper<Partial<Card>>;
  CardUpdates: ResolverTypeWrapper<Partial<CardUpdates>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  List: ResolverTypeWrapper<Partial<List>>;
  ListUpdates: ResolverTypeWrapper<Partial<ListUpdates>>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Board: Partial<Board>;
  BoardUpdates: Partial<BoardUpdates>;
  Boolean: Partial<Scalars['Boolean']>;
  Card: Partial<Card>;
  CardUpdates: Partial<CardUpdates>;
  ID: Partial<Scalars['ID']>;
  List: Partial<List>;
  ListUpdates: Partial<ListUpdates>;
  Mutation: {};
  Query: {};
  String: Partial<Scalars['String']>;
}>;

export type BoardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = ResolversObject<{
  backgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backgroundImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  closed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = ResolversObject<{
  boardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  closed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = ResolversObject<{
  boardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  closed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  archiveAllCards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<MutationArchiveAllCardsArgs, 'listId'>>;
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'background' | 'name'>>;
  createCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationCreateCardArgs, 'boardId' | 'listId' | 'name' | 'rank'>>;
  createList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'boardId' | 'name' | 'rank'>>;
  deleteBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCardArgs, 'id'>>;
  deleteList?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'id'>>;
  moveAllCardsInList?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<MutationMoveAllCardsInListArgs, 'destinationBoardId' | 'destinationListId' | 'sourceListId'>>;
  moveCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationMoveCardArgs, 'destinationBoardId' | 'destinationListId' | 'id' | 'newRank' | 'sourceListId'>>;
  moveList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationMoveListArgs, 'destinationBoardId' | 'id' | 'newRank' | 'sourceBoardId'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'id' | 'updates'>>;
  updateCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationUpdateCardArgs, 'id' | 'updates'>>;
  updateList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'id' | 'updates'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<QueryBoardArgs, 'id'>>;
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardsArgs, 'closed'>>;
  card?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<QueryCardArgs, 'id'>>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardsArgs, 'closed' | 'listId'>>;
  list?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<QueryListArgs, 'id'>>;
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListsArgs, 'boardId' | 'closed'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Board?: BoardResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

