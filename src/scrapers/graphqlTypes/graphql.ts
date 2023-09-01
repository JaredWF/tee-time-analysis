/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  /** YYYY-MM-DD format */
  reservationDate: Scalars['String']['input'];
  reservationDayOfWeek: DayOfWeek;
  /** HH:MM:SS format  */
  reservationTime: Scalars['String']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  addTeeTimeChanges?: Maybe<Array<Maybe<TeeTimeChange>>>;
  testMutation?: Maybe<TestMutationResponse>;
};


export type MutationAddTeeTimeChangesArgs = {
  teeTimes: Array<AddTeeTimeInput>;
};


export type MutationTestMutationArgs = {
  testInput?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
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

export type TeeTimeChangesInput = {
  courseName?: InputMaybe<Scalars['String']['input']>;
  /** Expects date in YYYY-MM-DD format */
  maxReservationDate?: InputMaybe<Scalars['String']['input']>;
  maxReservationTime?: InputMaybe<Scalars['String']['input']>;
  /** Expects date in YYYY-MM-DD format */
  minReservationDate?: InputMaybe<Scalars['String']['input']>;
  minReservationTime?: InputMaybe<Scalars['String']['input']>;
  reservationDayOfWeek?: InputMaybe<DayOfWeek>;
};

export type TeeTimeChangesResponse = {
  __typename?: 'TeeTimeChangesResponse';
  teeTimeChanges: Array<TeeTimeChange>;
};

export type TestMutationResponse = {
  __typename?: 'TestMutationResponse';
  message: Scalars['String']['output'];
};

export type TeeTimeChangesByDateQueryVariables = Exact<{
  input: TeeTimeChangesInput;
}>;


export type TeeTimeChangesByDateQuery = { __typename?: 'Query', teeTimeChanges: { __typename?: 'TeeTimeChangesResponse', teeTimeChanges: Array<{ __typename?: 'TeeTimeChange', priceDollars: number, playersAvailable: number, reservationTime: string, courseName: string, reservationDate: string, reservationDayOfWeek: DayOfWeek, updateDateTime: string }> } };

export type AddTeeTimeChangesMutationVariables = Exact<{
  teeTimes: Array<AddTeeTimeInput> | AddTeeTimeInput;
}>;


export type AddTeeTimeChangesMutation = { __typename?: 'Mutation', addTeeTimeChanges?: Array<{ __typename?: 'TeeTimeChange', id: number } | null> | null };


export const TeeTimeChangesByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"teeTimeChangesByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeeTimeChangesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teeTimeChanges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teeTimeChanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceDollars"}},{"kind":"Field","name":{"kind":"Name","value":"playersAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"reservationTime"}},{"kind":"Field","name":{"kind":"Name","value":"courseName"}},{"kind":"Field","name":{"kind":"Name","value":"reservationDate"}},{"kind":"Field","name":{"kind":"Name","value":"reservationDayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"updateDateTime"}}]}}]}}]}}]} as unknown as DocumentNode<TeeTimeChangesByDateQuery, TeeTimeChangesByDateQueryVariables>;
export const AddTeeTimeChangesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTeeTimeChanges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teeTimes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTeeTimeInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTeeTimeChanges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teeTimes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teeTimes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTeeTimeChangesMutation, AddTeeTimeChangesMutationVariables>;