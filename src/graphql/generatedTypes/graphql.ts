/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  JSONObject: { [key: string]: any };
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

export type MoveAllCardsInListResult = {
  __typename?: 'MoveAllCardsInListResult';
  cards: Array<Card>;
  oldListId: Scalars['String'];
};

export type MoveCardResult = {
  __typename?: 'MoveCardResult';
  card: Card;
  oldListId: Scalars['String'];
};

export type MoveListResult = {
  __typename?: 'MoveListResult';
  boardId: Scalars['String'];
  id: Scalars['ID'];
  oldBoardId: Scalars['String'];
  rank: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  copyList: List;
  createBoard: Board;
  createCard: Card;
  createList: List;
  deleteBoard: Scalars['Boolean'];
  moveAllCardsInList: MoveAllCardsInListResult;
  moveCard: MoveCardResult;
  moveList: MoveListResult;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
};


export type MutationCopyListArgs = {
  newListRank: Scalars['String'];
  targetId: Scalars['ID'];
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
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};


export type MutationMoveAllCardsInListArgs = {
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRankMap: Scalars['JSONObject'];
  oldListId: Scalars['String'];
};


export type MutationMoveCardArgs = {
  id: Scalars['ID'];
  newBoardId: Scalars['String'];
  newListId: Scalars['String'];
  newRank: Scalars['String'];
};


export type MutationMoveListArgs = {
  id: Scalars['ID'];
  newBoardId: Scalars['String'];
  newRank: Scalars['String'];
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
  listId: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['ID'];
};


export type QueryListsArgs = {
  boardId: Scalars['String'];
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
  JSONObject: ResolverTypeWrapper<Partial<Scalars['JSONObject']>>;
  List: ResolverTypeWrapper<Partial<List>>;
  ListUpdates: ResolverTypeWrapper<Partial<ListUpdates>>;
  MoveAllCardsInListResult: ResolverTypeWrapper<Partial<MoveAllCardsInListResult>>;
  MoveCardResult: ResolverTypeWrapper<Partial<MoveCardResult>>;
  MoveListResult: ResolverTypeWrapper<Partial<MoveListResult>>;
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
  JSONObject: Partial<Scalars['JSONObject']>;
  List: Partial<List>;
  ListUpdates: Partial<ListUpdates>;
  MoveAllCardsInListResult: Partial<MoveAllCardsInListResult>;
  MoveCardResult: Partial<MoveCardResult>;
  MoveListResult: Partial<MoveListResult>;
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

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = ResolversObject<{
  boardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  closed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveAllCardsInListResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveAllCardsInListResult'] = ResolversParentTypes['MoveAllCardsInListResult']> = ResolversObject<{
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  oldListId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveCardResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveCardResult'] = ResolversParentTypes['MoveCardResult']> = ResolversObject<{
  card?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  oldListId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoveListResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveListResult'] = ResolversParentTypes['MoveListResult']> = ResolversObject<{
  boardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  oldBoardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  copyList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCopyListArgs, 'newListRank' | 'targetId'>>;
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'background' | 'name'>>;
  createCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationCreateCardArgs, 'boardId' | 'listId' | 'name' | 'rank'>>;
  createList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'boardId' | 'name' | 'rank'>>;
  deleteBoard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  moveAllCardsInList?: Resolver<ResolversTypes['MoveAllCardsInListResult'], ParentType, ContextType, RequireFields<MutationMoveAllCardsInListArgs, 'newBoardId' | 'newListId' | 'newRankMap' | 'oldListId'>>;
  moveCard?: Resolver<ResolversTypes['MoveCardResult'], ParentType, ContextType, RequireFields<MutationMoveCardArgs, 'id' | 'newBoardId' | 'newListId' | 'newRank'>>;
  moveList?: Resolver<ResolversTypes['MoveListResult'], ParentType, ContextType, RequireFields<MutationMoveListArgs, 'id' | 'newBoardId' | 'newRank'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'id' | 'updates'>>;
  updateCard?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<MutationUpdateCardArgs, 'id' | 'updates'>>;
  updateList?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'id' | 'updates'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<QueryBoardArgs, 'id'>>;
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardsArgs, 'closed'>>;
  card?: Resolver<ResolversTypes['Card'], ParentType, ContextType, RequireFields<QueryCardArgs, 'id'>>;
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType, RequireFields<QueryCardsArgs, 'listId'>>;
  list?: Resolver<ResolversTypes['List'], ParentType, ContextType, RequireFields<QueryListArgs, 'id'>>;
  lists?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListsArgs, 'boardId'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Board?: BoardResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  List?: ListResolvers<ContextType>;
  MoveAllCardsInListResult?: MoveAllCardsInListResultResolvers<ContextType>;
  MoveCardResult?: MoveCardResultResolvers<ContextType>;
  MoveListResult?: MoveListResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


export type JsonObject = Scalars["JSONObject"];