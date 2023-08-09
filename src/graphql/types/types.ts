import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddTeeTimeInput = {
  courseName: Scalars['String']['input'];
  playersAvailable: Scalars['Int']['input'];
  priceDollars: Scalars['Float']['input'];
  reservationDate: Scalars['String']['input'];
  reservationDayOfWeek: DayOfWeek;
  reservationTime: Scalars['String']['input'];
};

export type Author = {
  __typename?: 'Author';
  name: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  title: Scalars['String']['output'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type Library = {
  __typename?: 'Library';
  books?: Maybe<Array<Book>>;
  branch: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTeeTimeChange?: Maybe<TeeTimeChangeResponse>;
  testMutation?: Maybe<TestMutationResponse>;
};


export type MutationAddTeeTimeChangeArgs = {
  input: AddTeeTimeInput;
};


export type MutationTestMutationArgs = {
  testInput?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  libraries?: Maybe<Array<Maybe<Library>>>;
  teeTimeChanges: TeeTimeChangesResponse;
  test: Scalars['String']['output'];
};


export type QueryTeeTimeChangesArgs = {
  input: TeeTimeChangesInput;
};

export type TeeTimeChange = {
  __typename?: 'TeeTimeChange';
  courseName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  playersAvailable: Scalars['Int']['output'];
  priceDollars: Scalars['Float']['output'];
  reservationDate: Scalars['String']['output'];
  reservationDayOfWeek: DayOfWeek;
  reservationTime: Scalars['String']['output'];
  updateDateTime: Scalars['String']['output'];
};

export type TeeTimeChangeResponse = {
  __typename?: 'TeeTimeChangeResponse';
  courseName: Scalars['String']['output'];
};

export type TeeTimeChangesInput = {
  maxReservationTime?: InputMaybe<Scalars['String']['input']>;
  minReservationTime?: InputMaybe<Scalars['String']['input']>;
};

export type TeeTimeChangesResponse = {
  __typename?: 'TeeTimeChangesResponse';
  teeTimeChanges: Array<Maybe<TeeTimeChange>>;
};

export type TestMutationResponse = {
  __typename?: 'TestMutationResponse';
  message: Scalars['String']['output'];
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
  AddTeeTimeInput: AddTeeTimeInput;
  Author: ResolverTypeWrapper<Author>;
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DayOfWeek: DayOfWeek;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Library: ResolverTypeWrapper<Library>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TeeTimeChange: ResolverTypeWrapper<TeeTimeChange>;
  TeeTimeChangeResponse: ResolverTypeWrapper<TeeTimeChangeResponse>;
  TeeTimeChangesInput: TeeTimeChangesInput;
  TeeTimeChangesResponse: ResolverTypeWrapper<TeeTimeChangesResponse>;
  TestMutationResponse: ResolverTypeWrapper<TestMutationResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddTeeTimeInput: AddTeeTimeInput;
  Author: Author;
  Book: Book;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Library: Library;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  TeeTimeChange: TeeTimeChange;
  TeeTimeChangeResponse: TeeTimeChangeResponse;
  TeeTimeChangesInput: TeeTimeChangesInput;
  TeeTimeChangesResponse: TeeTimeChangesResponse;
  TestMutationResponse: TestMutationResponse;
}>;

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LibraryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']> = ResolversObject<{
  books?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType>;
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addTeeTimeChange?: Resolver<Maybe<ResolversTypes['TeeTimeChangeResponse']>, ParentType, ContextType, RequireFields<MutationAddTeeTimeChangeArgs, 'input'>>;
  testMutation?: Resolver<Maybe<ResolversTypes['TestMutationResponse']>, ParentType, ContextType, Partial<MutationTestMutationArgs>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  libraries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Library']>>>, ParentType, ContextType>;
  teeTimeChanges?: Resolver<ResolversTypes['TeeTimeChangesResponse'], ParentType, ContextType, RequireFields<QueryTeeTimeChangesArgs, 'input'>>;
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type TeeTimeChangeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TeeTimeChange'] = ResolversParentTypes['TeeTimeChange']> = ResolversObject<{
  courseName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playersAvailable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  priceDollars?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reservationDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reservationDayOfWeek?: Resolver<ResolversTypes['DayOfWeek'], ParentType, ContextType>;
  reservationTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeeTimeChangeResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TeeTimeChangeResponse'] = ResolversParentTypes['TeeTimeChangeResponse']> = ResolversObject<{
  courseName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeeTimeChangesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TeeTimeChangesResponse'] = ResolversParentTypes['TeeTimeChangesResponse']> = ResolversObject<{
  teeTimeChanges?: Resolver<Array<Maybe<ResolversTypes['TeeTimeChange']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TestMutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestMutationResponse'] = ResolversParentTypes['TestMutationResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Library?: LibraryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TeeTimeChange?: TeeTimeChangeResolvers<ContextType>;
  TeeTimeChangeResponse?: TeeTimeChangeResponseResolvers<ContextType>;
  TeeTimeChangesResponse?: TeeTimeChangesResponseResolvers<ContextType>;
  TestMutationResponse?: TestMutationResponseResolvers<ContextType>;
}>;

