/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Enum: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
};

export type ModelUnion = P_Dash_Block | P_Dash_Stage | P_Dash_StageId | Pixelaw_App | Pixelaw_AppName | Pixelaw_AppUser | Pixelaw_CoreActionsAddress | Pixelaw_Instruction | Pixelaw_Permissions | Pixelaw_Pixel | Pixelaw_QueueItem | Pixelaw_Snake | Pixelaw_SnakeSegment;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type World__Content = {
  __typename?: 'World__Content';
  coverUri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__EventMessage = {
  __typename?: 'World__EventMessage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EventMessageConnection = {
  __typename?: 'World__EventMessageConnection';
  edges?: Maybe<Array<Maybe<World__EventMessageEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventMessageEdge = {
  __typename?: 'World__EventMessageEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__EventMessage>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  iconImg?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  worldAddress: Scalars['String']['output'];
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  classHash?: Maybe<Scalars['felt252']['output']>;
  contractAddress?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__ModelOrder = {
  direction: OrderDirection;
  field: World__ModelOrderField;
};

export enum World__ModelOrderField {
  ClassHash = 'CLASS_HASH',
  Name = 'NAME'
}

export type World__PageInfo = {
  __typename?: 'World__PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type World__Query = {
  __typename?: 'World__Query';
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  eventMessage: World__EventMessage;
  eventMessages?: Maybe<World__EventMessageConnection>;
  events?: Maybe<World__EventConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  pDashBlockModels?: Maybe<P_Dash_BlockConnection>;
  pDashStageIdModels?: Maybe<P_Dash_StageIdConnection>;
  pDashStageModels?: Maybe<P_Dash_StageConnection>;
  pixelawAppModels?: Maybe<Pixelaw_AppConnection>;
  pixelawAppNameModels?: Maybe<Pixelaw_AppNameConnection>;
  pixelawAppUserModels?: Maybe<Pixelaw_AppUserConnection>;
  pixelawCoreActionsAddressModels?: Maybe<Pixelaw_CoreActionsAddressConnection>;
  pixelawInstructionModels?: Maybe<Pixelaw_InstructionConnection>;
  pixelawPermissionsModels?: Maybe<Pixelaw_PermissionsConnection>;
  pixelawPixelModels?: Maybe<Pixelaw_PixelConnection>;
  pixelawQueueItemModels?: Maybe<Pixelaw_QueueItemConnection>;
  pixelawSnakeModels?: Maybe<Pixelaw_SnakeConnection>;
  pixelawSnakeSegmentModels?: Maybe<Pixelaw_SnakeSegmentConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventMessageArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<World__ModelOrder>;
};


export type World__QueryPDashBlockModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<P_Dash_BlockOrder>;
  where?: InputMaybe<P_Dash_BlockWhereInput>;
};


export type World__QueryPDashStageIdModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<P_Dash_StageIdOrder>;
  where?: InputMaybe<P_Dash_StageIdWhereInput>;
};


export type World__QueryPDashStageModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<P_Dash_StageOrder>;
  where?: InputMaybe<P_Dash_StageWhereInput>;
};


export type World__QueryPixelawAppModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_AppOrder>;
  where?: InputMaybe<Pixelaw_AppWhereInput>;
};


export type World__QueryPixelawAppNameModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_AppNameOrder>;
  where?: InputMaybe<Pixelaw_AppNameWhereInput>;
};


export type World__QueryPixelawAppUserModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_AppUserOrder>;
  where?: InputMaybe<Pixelaw_AppUserWhereInput>;
};


export type World__QueryPixelawCoreActionsAddressModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_CoreActionsAddressOrder>;
  where?: InputMaybe<Pixelaw_CoreActionsAddressWhereInput>;
};


export type World__QueryPixelawInstructionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_InstructionOrder>;
  where?: InputMaybe<Pixelaw_InstructionWhereInput>;
};


export type World__QueryPixelawPermissionsModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_PermissionsOrder>;
  where?: InputMaybe<Pixelaw_PermissionsWhereInput>;
};


export type World__QueryPixelawPixelModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_PixelOrder>;
  where?: InputMaybe<Pixelaw_PixelWhereInput>;
};


export type World__QueryPixelawQueueItemModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_QueueItemOrder>;
  where?: InputMaybe<Pixelaw_QueueItemWhereInput>;
};


export type World__QueryPixelawSnakeModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_SnakeOrder>;
  where?: InputMaybe<Pixelaw_SnakeWhereInput>;
};


export type World__QueryPixelawSnakeSegmentModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Pixelaw_SnakeSegmentOrder>;
  where?: InputMaybe<Pixelaw_SnakeSegmentWhereInput>;
};


export type World__QueryTransactionArgs = {
  transactionHash: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  eventMessageUpdated: World__EventMessage;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionEventMessageUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxFee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  senderAddress?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};

export type P_Dash_Block = {
  __typename?: 'p_dash_Block';
  block?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<World__Entity>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type P_Dash_BlockConnection = {
  __typename?: 'p_dash_BlockConnection';
  edges?: Maybe<Array<Maybe<P_Dash_BlockEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type P_Dash_BlockEdge = {
  __typename?: 'p_dash_BlockEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<P_Dash_Block>;
};

export type P_Dash_BlockOrder = {
  direction: OrderDirection;
  field: P_Dash_BlockOrderField;
};

export enum P_Dash_BlockOrderField {
  Block = 'BLOCK',
  X = 'X',
  Y = 'Y'
}

export type P_Dash_BlockWhereInput = {
  block?: InputMaybe<Scalars['Enum']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type P_Dash_Stage = {
  __typename?: 'p_dash_Stage';
  entity?: Maybe<World__Entity>;
  h?: Maybe<Scalars['u32']['output']>;
  id?: Maybe<Scalars['u32']['output']>;
  w?: Maybe<Scalars['u32']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type P_Dash_StageConnection = {
  __typename?: 'p_dash_StageConnection';
  edges?: Maybe<Array<Maybe<P_Dash_StageEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type P_Dash_StageEdge = {
  __typename?: 'p_dash_StageEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<P_Dash_Stage>;
};

export type P_Dash_StageId = {
  __typename?: 'p_dash_StageId';
  entity?: Maybe<World__Entity>;
  value?: Maybe<Scalars['u32']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type P_Dash_StageIdConnection = {
  __typename?: 'p_dash_StageIdConnection';
  edges?: Maybe<Array<Maybe<P_Dash_StageIdEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type P_Dash_StageIdEdge = {
  __typename?: 'p_dash_StageIdEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<P_Dash_StageId>;
};

export type P_Dash_StageIdOrder = {
  direction: OrderDirection;
  field: P_Dash_StageIdOrderField;
};

export enum P_Dash_StageIdOrderField {
  Value = 'VALUE',
  X = 'X',
  Y = 'Y'
}

export type P_Dash_StageIdWhereInput = {
  value?: InputMaybe<Scalars['u32']['input']>;
  valueEQ?: InputMaybe<Scalars['u32']['input']>;
  valueGT?: InputMaybe<Scalars['u32']['input']>;
  valueGTE?: InputMaybe<Scalars['u32']['input']>;
  valueIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  valueLIKE?: InputMaybe<Scalars['u32']['input']>;
  valueLT?: InputMaybe<Scalars['u32']['input']>;
  valueLTE?: InputMaybe<Scalars['u32']['input']>;
  valueNEQ?: InputMaybe<Scalars['u32']['input']>;
  valueNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  valueNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type P_Dash_StageOrder = {
  direction: OrderDirection;
  field: P_Dash_StageOrderField;
};

export enum P_Dash_StageOrderField {
  H = 'H',
  Id = 'ID',
  W = 'W',
  X = 'X',
  Y = 'Y'
}

export type P_Dash_StageWhereInput = {
  h?: InputMaybe<Scalars['u32']['input']>;
  hEQ?: InputMaybe<Scalars['u32']['input']>;
  hGT?: InputMaybe<Scalars['u32']['input']>;
  hGTE?: InputMaybe<Scalars['u32']['input']>;
  hIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  hLIKE?: InputMaybe<Scalars['u32']['input']>;
  hLT?: InputMaybe<Scalars['u32']['input']>;
  hLTE?: InputMaybe<Scalars['u32']['input']>;
  hNEQ?: InputMaybe<Scalars['u32']['input']>;
  hNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  hNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  w?: InputMaybe<Scalars['u32']['input']>;
  wEQ?: InputMaybe<Scalars['u32']['input']>;
  wGT?: InputMaybe<Scalars['u32']['input']>;
  wGTE?: InputMaybe<Scalars['u32']['input']>;
  wIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  wLIKE?: InputMaybe<Scalars['u32']['input']>;
  wLT?: InputMaybe<Scalars['u32']['input']>;
  wLTE?: InputMaybe<Scalars['u32']['input']>;
  wNEQ?: InputMaybe<Scalars['u32']['input']>;
  wNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  wNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type Pixelaw_App = {
  __typename?: 'pixelaw_App';
  action?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  icon?: Maybe<Scalars['felt252']['output']>;
  manifest?: Maybe<Scalars['felt252']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  system?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Pixelaw_AppConnection = {
  __typename?: 'pixelaw_AppConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_AppEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_AppEdge = {
  __typename?: 'pixelaw_AppEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_App>;
};

export type Pixelaw_AppName = {
  __typename?: 'pixelaw_AppName';
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  system?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Pixelaw_AppNameConnection = {
  __typename?: 'pixelaw_AppNameConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_AppNameEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_AppNameEdge = {
  __typename?: 'pixelaw_AppNameEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_AppName>;
};

export type Pixelaw_AppNameOrder = {
  direction: OrderDirection;
  field: Pixelaw_AppNameOrderField;
};

export enum Pixelaw_AppNameOrderField {
  Name = 'NAME',
  System = 'SYSTEM'
}

export type Pixelaw_AppNameWhereInput = {
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  system?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_AppOrder = {
  direction: OrderDirection;
  field: Pixelaw_AppOrderField;
};

export enum Pixelaw_AppOrderField {
  Action = 'ACTION',
  Icon = 'ICON',
  Manifest = 'MANIFEST',
  Name = 'NAME',
  System = 'SYSTEM'
}

export type Pixelaw_AppUser = {
  __typename?: 'pixelaw_AppUser';
  action?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  system?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Pixelaw_AppUserConnection = {
  __typename?: 'pixelaw_AppUserConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_AppUserEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_AppUserEdge = {
  __typename?: 'pixelaw_AppUserEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_AppUser>;
};

export type Pixelaw_AppUserOrder = {
  direction: OrderDirection;
  field: Pixelaw_AppUserOrderField;
};

export enum Pixelaw_AppUserOrderField {
  Action = 'ACTION',
  Player = 'PLAYER',
  System = 'SYSTEM'
}

export type Pixelaw_AppUserWhereInput = {
  action?: InputMaybe<Scalars['felt252']['input']>;
  actionEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionGT?: InputMaybe<Scalars['felt252']['input']>;
  actionGTE?: InputMaybe<Scalars['felt252']['input']>;
  actionIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionLIKE?: InputMaybe<Scalars['felt252']['input']>;
  actionLT?: InputMaybe<Scalars['felt252']['input']>;
  actionLTE?: InputMaybe<Scalars['felt252']['input']>;
  actionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  system?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_AppWhereInput = {
  action?: InputMaybe<Scalars['felt252']['input']>;
  actionEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionGT?: InputMaybe<Scalars['felt252']['input']>;
  actionGTE?: InputMaybe<Scalars['felt252']['input']>;
  actionIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionLIKE?: InputMaybe<Scalars['felt252']['input']>;
  actionLT?: InputMaybe<Scalars['felt252']['input']>;
  actionLTE?: InputMaybe<Scalars['felt252']['input']>;
  actionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  icon?: InputMaybe<Scalars['felt252']['input']>;
  iconEQ?: InputMaybe<Scalars['felt252']['input']>;
  iconGT?: InputMaybe<Scalars['felt252']['input']>;
  iconGTE?: InputMaybe<Scalars['felt252']['input']>;
  iconIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  iconLIKE?: InputMaybe<Scalars['felt252']['input']>;
  iconLT?: InputMaybe<Scalars['felt252']['input']>;
  iconLTE?: InputMaybe<Scalars['felt252']['input']>;
  iconNEQ?: InputMaybe<Scalars['felt252']['input']>;
  iconNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  iconNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  manifest?: InputMaybe<Scalars['felt252']['input']>;
  manifestEQ?: InputMaybe<Scalars['felt252']['input']>;
  manifestGT?: InputMaybe<Scalars['felt252']['input']>;
  manifestGTE?: InputMaybe<Scalars['felt252']['input']>;
  manifestIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  manifestLIKE?: InputMaybe<Scalars['felt252']['input']>;
  manifestLT?: InputMaybe<Scalars['felt252']['input']>;
  manifestLTE?: InputMaybe<Scalars['felt252']['input']>;
  manifestNEQ?: InputMaybe<Scalars['felt252']['input']>;
  manifestNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  manifestNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  system?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_CoreActionsAddress = {
  __typename?: 'pixelaw_CoreActionsAddress';
  entity?: Maybe<World__Entity>;
  key?: Maybe<Scalars['felt252']['output']>;
  value?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Pixelaw_CoreActionsAddressConnection = {
  __typename?: 'pixelaw_CoreActionsAddressConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_CoreActionsAddressEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_CoreActionsAddressEdge = {
  __typename?: 'pixelaw_CoreActionsAddressEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_CoreActionsAddress>;
};

export type Pixelaw_CoreActionsAddressOrder = {
  direction: OrderDirection;
  field: Pixelaw_CoreActionsAddressOrderField;
};

export enum Pixelaw_CoreActionsAddressOrderField {
  Key = 'KEY',
  Value = 'VALUE'
}

export type Pixelaw_CoreActionsAddressWhereInput = {
  key?: InputMaybe<Scalars['felt252']['input']>;
  keyEQ?: InputMaybe<Scalars['felt252']['input']>;
  keyGT?: InputMaybe<Scalars['felt252']['input']>;
  keyGTE?: InputMaybe<Scalars['felt252']['input']>;
  keyIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  keyLIKE?: InputMaybe<Scalars['felt252']['input']>;
  keyLT?: InputMaybe<Scalars['felt252']['input']>;
  keyLTE?: InputMaybe<Scalars['felt252']['input']>;
  keyNEQ?: InputMaybe<Scalars['felt252']['input']>;
  keyNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  keyNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  value?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  valueLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  valueNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  valueNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_Instruction = {
  __typename?: 'pixelaw_Instruction';
  entity?: Maybe<World__Entity>;
  instruction?: Maybe<Scalars['felt252']['output']>;
  selector?: Maybe<Scalars['felt252']['output']>;
  system?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Pixelaw_InstructionConnection = {
  __typename?: 'pixelaw_InstructionConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_InstructionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_InstructionEdge = {
  __typename?: 'pixelaw_InstructionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_Instruction>;
};

export type Pixelaw_InstructionOrder = {
  direction: OrderDirection;
  field: Pixelaw_InstructionOrderField;
};

export enum Pixelaw_InstructionOrderField {
  Instruction = 'INSTRUCTION',
  Selector = 'SELECTOR',
  System = 'SYSTEM'
}

export type Pixelaw_InstructionWhereInput = {
  instruction?: InputMaybe<Scalars['felt252']['input']>;
  instructionEQ?: InputMaybe<Scalars['felt252']['input']>;
  instructionGT?: InputMaybe<Scalars['felt252']['input']>;
  instructionGTE?: InputMaybe<Scalars['felt252']['input']>;
  instructionIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  instructionLIKE?: InputMaybe<Scalars['felt252']['input']>;
  instructionLT?: InputMaybe<Scalars['felt252']['input']>;
  instructionLTE?: InputMaybe<Scalars['felt252']['input']>;
  instructionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  instructionNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  instructionNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  selector?: InputMaybe<Scalars['felt252']['input']>;
  selectorEQ?: InputMaybe<Scalars['felt252']['input']>;
  selectorGT?: InputMaybe<Scalars['felt252']['input']>;
  selectorGTE?: InputMaybe<Scalars['felt252']['input']>;
  selectorIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  selectorLIKE?: InputMaybe<Scalars['felt252']['input']>;
  selectorLT?: InputMaybe<Scalars['felt252']['input']>;
  selectorLTE?: InputMaybe<Scalars['felt252']['input']>;
  selectorNEQ?: InputMaybe<Scalars['felt252']['input']>;
  selectorNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  selectorNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  system?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  systemNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  systemNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_Permissions = {
  __typename?: 'pixelaw_Permissions';
  allowed_app?: Maybe<Scalars['ContractAddress']['output']>;
  allowing_app?: Maybe<Scalars['ContractAddress']['output']>;
  entity?: Maybe<World__Entity>;
  permission?: Maybe<Pixelaw_Permissions_Permission>;
};

export type Pixelaw_PermissionsConnection = {
  __typename?: 'pixelaw_PermissionsConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_PermissionsEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_PermissionsEdge = {
  __typename?: 'pixelaw_PermissionsEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_Permissions>;
};

export type Pixelaw_PermissionsOrder = {
  direction: OrderDirection;
  field: Pixelaw_PermissionsOrderField;
};

export enum Pixelaw_PermissionsOrderField {
  AllowedApp = 'ALLOWED_APP',
  AllowingApp = 'ALLOWING_APP',
  Permission = 'PERMISSION'
}

export type Pixelaw_PermissionsWhereInput = {
  allowed_app?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  allowed_appLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowed_appNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  allowed_appNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_app?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  allowing_appLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  allowing_appNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  allowing_appNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Pixelaw_Permissions_Permission = {
  __typename?: 'pixelaw_Permissions_Permission';
  action?: Maybe<Scalars['bool']['output']>;
  app?: Maybe<Scalars['bool']['output']>;
  color?: Maybe<Scalars['bool']['output']>;
  owner?: Maybe<Scalars['bool']['output']>;
  text?: Maybe<Scalars['bool']['output']>;
  timestamp?: Maybe<Scalars['bool']['output']>;
};

export type Pixelaw_Pixel = {
  __typename?: 'pixelaw_Pixel';
  action?: Maybe<Scalars['felt252']['output']>;
  app?: Maybe<Scalars['ContractAddress']['output']>;
  color?: Maybe<Scalars['u32']['output']>;
  created_at?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  text?: Maybe<Scalars['felt252']['output']>;
  timestamp?: Maybe<Scalars['u64']['output']>;
  updated_at?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type Pixelaw_PixelConnection = {
  __typename?: 'pixelaw_PixelConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_PixelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_PixelEdge = {
  __typename?: 'pixelaw_PixelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_Pixel>;
};

export type Pixelaw_PixelOrder = {
  direction: OrderDirection;
  field: Pixelaw_PixelOrderField;
};

export enum Pixelaw_PixelOrderField {
  Action = 'ACTION',
  App = 'APP',
  Color = 'COLOR',
  CreatedAt = 'CREATED_AT',
  Owner = 'OWNER',
  Text = 'TEXT',
  Timestamp = 'TIMESTAMP',
  UpdatedAt = 'UPDATED_AT',
  X = 'X',
  Y = 'Y'
}

export type Pixelaw_PixelWhereInput = {
  action?: InputMaybe<Scalars['felt252']['input']>;
  actionEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionGT?: InputMaybe<Scalars['felt252']['input']>;
  actionGTE?: InputMaybe<Scalars['felt252']['input']>;
  actionIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionLIKE?: InputMaybe<Scalars['felt252']['input']>;
  actionLT?: InputMaybe<Scalars['felt252']['input']>;
  actionLTE?: InputMaybe<Scalars['felt252']['input']>;
  actionNEQ?: InputMaybe<Scalars['felt252']['input']>;
  actionNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  actionNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  app?: InputMaybe<Scalars['ContractAddress']['input']>;
  appEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  appGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  appGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  appIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  appLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  appLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  appLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  appNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  appNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  appNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  color?: InputMaybe<Scalars['u32']['input']>;
  colorEQ?: InputMaybe<Scalars['u32']['input']>;
  colorGT?: InputMaybe<Scalars['u32']['input']>;
  colorGTE?: InputMaybe<Scalars['u32']['input']>;
  colorIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  colorLIKE?: InputMaybe<Scalars['u32']['input']>;
  colorLT?: InputMaybe<Scalars['u32']['input']>;
  colorLTE?: InputMaybe<Scalars['u32']['input']>;
  colorNEQ?: InputMaybe<Scalars['u32']['input']>;
  colorNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  colorNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  created_at?: InputMaybe<Scalars['u64']['input']>;
  created_atEQ?: InputMaybe<Scalars['u64']['input']>;
  created_atGT?: InputMaybe<Scalars['u64']['input']>;
  created_atGTE?: InputMaybe<Scalars['u64']['input']>;
  created_atIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  created_atLIKE?: InputMaybe<Scalars['u64']['input']>;
  created_atLT?: InputMaybe<Scalars['u64']['input']>;
  created_atLTE?: InputMaybe<Scalars['u64']['input']>;
  created_atNEQ?: InputMaybe<Scalars['u64']['input']>;
  created_atNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  created_atNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  text?: InputMaybe<Scalars['felt252']['input']>;
  textEQ?: InputMaybe<Scalars['felt252']['input']>;
  textGT?: InputMaybe<Scalars['felt252']['input']>;
  textGTE?: InputMaybe<Scalars['felt252']['input']>;
  textIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  textLIKE?: InputMaybe<Scalars['felt252']['input']>;
  textLT?: InputMaybe<Scalars['felt252']['input']>;
  textLTE?: InputMaybe<Scalars['felt252']['input']>;
  textNEQ?: InputMaybe<Scalars['felt252']['input']>;
  textNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  textNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  timestamp?: InputMaybe<Scalars['u64']['input']>;
  timestampEQ?: InputMaybe<Scalars['u64']['input']>;
  timestampGT?: InputMaybe<Scalars['u64']['input']>;
  timestampGTE?: InputMaybe<Scalars['u64']['input']>;
  timestampIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestampLIKE?: InputMaybe<Scalars['u64']['input']>;
  timestampLT?: InputMaybe<Scalars['u64']['input']>;
  timestampLTE?: InputMaybe<Scalars['u64']['input']>;
  timestampNEQ?: InputMaybe<Scalars['u64']['input']>;
  timestampNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  timestampNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  updated_at?: InputMaybe<Scalars['u64']['input']>;
  updated_atEQ?: InputMaybe<Scalars['u64']['input']>;
  updated_atGT?: InputMaybe<Scalars['u64']['input']>;
  updated_atGTE?: InputMaybe<Scalars['u64']['input']>;
  updated_atIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  updated_atLIKE?: InputMaybe<Scalars['u64']['input']>;
  updated_atLT?: InputMaybe<Scalars['u64']['input']>;
  updated_atLTE?: InputMaybe<Scalars['u64']['input']>;
  updated_atNEQ?: InputMaybe<Scalars['u64']['input']>;
  updated_atNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  updated_atNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type Pixelaw_QueueItem = {
  __typename?: 'pixelaw_QueueItem';
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['felt252']['output']>;
  valid?: Maybe<Scalars['bool']['output']>;
};

export type Pixelaw_QueueItemConnection = {
  __typename?: 'pixelaw_QueueItemConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_QueueItemEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_QueueItemEdge = {
  __typename?: 'pixelaw_QueueItemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_QueueItem>;
};

export type Pixelaw_QueueItemOrder = {
  direction: OrderDirection;
  field: Pixelaw_QueueItemOrderField;
};

export enum Pixelaw_QueueItemOrderField {
  Id = 'ID',
  Valid = 'VALID'
}

export type Pixelaw_QueueItemWhereInput = {
  id?: InputMaybe<Scalars['felt252']['input']>;
  idEQ?: InputMaybe<Scalars['felt252']['input']>;
  idGT?: InputMaybe<Scalars['felt252']['input']>;
  idGTE?: InputMaybe<Scalars['felt252']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  idLIKE?: InputMaybe<Scalars['felt252']['input']>;
  idLT?: InputMaybe<Scalars['felt252']['input']>;
  idLTE?: InputMaybe<Scalars['felt252']['input']>;
  idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  valid?: InputMaybe<Scalars['bool']['input']>;
};

export type Pixelaw_Snake = {
  __typename?: 'pixelaw_Snake';
  color?: Maybe<Scalars['u32']['output']>;
  direction?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<World__Entity>;
  first_segment_id?: Maybe<Scalars['u32']['output']>;
  is_dying?: Maybe<Scalars['bool']['output']>;
  last_segment_id?: Maybe<Scalars['u32']['output']>;
  length?: Maybe<Scalars['u8']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  text?: Maybe<Scalars['felt252']['output']>;
};

export type Pixelaw_SnakeConnection = {
  __typename?: 'pixelaw_SnakeConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_SnakeEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_SnakeEdge = {
  __typename?: 'pixelaw_SnakeEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_Snake>;
};

export type Pixelaw_SnakeOrder = {
  direction: OrderDirection;
  field: Pixelaw_SnakeOrderField;
};

export enum Pixelaw_SnakeOrderField {
  Color = 'COLOR',
  Direction = 'DIRECTION',
  FirstSegmentId = 'FIRST_SEGMENT_ID',
  IsDying = 'IS_DYING',
  LastSegmentId = 'LAST_SEGMENT_ID',
  Length = 'LENGTH',
  Owner = 'OWNER',
  Text = 'TEXT'
}

export type Pixelaw_SnakeSegment = {
  __typename?: 'pixelaw_SnakeSegment';
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u32']['output']>;
  next_id?: Maybe<Scalars['u32']['output']>;
  pixel_original_app?: Maybe<Scalars['ContractAddress']['output']>;
  pixel_original_color?: Maybe<Scalars['u32']['output']>;
  pixel_original_text?: Maybe<Scalars['felt252']['output']>;
  previous_id?: Maybe<Scalars['u32']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type Pixelaw_SnakeSegmentConnection = {
  __typename?: 'pixelaw_SnakeSegmentConnection';
  edges?: Maybe<Array<Maybe<Pixelaw_SnakeSegmentEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Pixelaw_SnakeSegmentEdge = {
  __typename?: 'pixelaw_SnakeSegmentEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Pixelaw_SnakeSegment>;
};

export type Pixelaw_SnakeSegmentOrder = {
  direction: OrderDirection;
  field: Pixelaw_SnakeSegmentOrderField;
};

export enum Pixelaw_SnakeSegmentOrderField {
  Id = 'ID',
  NextId = 'NEXT_ID',
  PixelOriginalApp = 'PIXEL_ORIGINAL_APP',
  PixelOriginalColor = 'PIXEL_ORIGINAL_COLOR',
  PixelOriginalText = 'PIXEL_ORIGINAL_TEXT',
  PreviousId = 'PREVIOUS_ID',
  X = 'X',
  Y = 'Y'
}

export type Pixelaw_SnakeSegmentWhereInput = {
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  next_id?: InputMaybe<Scalars['u32']['input']>;
  next_idEQ?: InputMaybe<Scalars['u32']['input']>;
  next_idGT?: InputMaybe<Scalars['u32']['input']>;
  next_idGTE?: InputMaybe<Scalars['u32']['input']>;
  next_idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  next_idLIKE?: InputMaybe<Scalars['u32']['input']>;
  next_idLT?: InputMaybe<Scalars['u32']['input']>;
  next_idLTE?: InputMaybe<Scalars['u32']['input']>;
  next_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  next_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  next_idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_app?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  pixel_original_appLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_appNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  pixel_original_appNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  pixel_original_color?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorEQ?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorGT?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorGTE?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  pixel_original_colorLIKE?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorLT?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorLTE?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorNEQ?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_colorNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  pixel_original_colorNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  pixel_original_text?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textEQ?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textGT?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textGTE?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  pixel_original_textLIKE?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textLT?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textLTE?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textNEQ?: InputMaybe<Scalars['felt252']['input']>;
  pixel_original_textNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  pixel_original_textNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  previous_id?: InputMaybe<Scalars['u32']['input']>;
  previous_idEQ?: InputMaybe<Scalars['u32']['input']>;
  previous_idGT?: InputMaybe<Scalars['u32']['input']>;
  previous_idGTE?: InputMaybe<Scalars['u32']['input']>;
  previous_idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  previous_idLIKE?: InputMaybe<Scalars['u32']['input']>;
  previous_idLT?: InputMaybe<Scalars['u32']['input']>;
  previous_idLTE?: InputMaybe<Scalars['u32']['input']>;
  previous_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  previous_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  previous_idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type Pixelaw_SnakeWhereInput = {
  color?: InputMaybe<Scalars['u32']['input']>;
  colorEQ?: InputMaybe<Scalars['u32']['input']>;
  colorGT?: InputMaybe<Scalars['u32']['input']>;
  colorGTE?: InputMaybe<Scalars['u32']['input']>;
  colorIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  colorLIKE?: InputMaybe<Scalars['u32']['input']>;
  colorLT?: InputMaybe<Scalars['u32']['input']>;
  colorLTE?: InputMaybe<Scalars['u32']['input']>;
  colorNEQ?: InputMaybe<Scalars['u32']['input']>;
  colorNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  colorNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  direction?: InputMaybe<Scalars['Enum']['input']>;
  first_segment_id?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idEQ?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idGT?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idGTE?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  first_segment_idLIKE?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idLT?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idLTE?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  first_segment_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  first_segment_idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  is_dying?: InputMaybe<Scalars['bool']['input']>;
  last_segment_id?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idEQ?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idGT?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idGTE?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  last_segment_idLIKE?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idLT?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idLTE?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idNEQ?: InputMaybe<Scalars['u32']['input']>;
  last_segment_idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  last_segment_idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  length?: InputMaybe<Scalars['u8']['input']>;
  lengthEQ?: InputMaybe<Scalars['u8']['input']>;
  lengthGT?: InputMaybe<Scalars['u8']['input']>;
  lengthGTE?: InputMaybe<Scalars['u8']['input']>;
  lengthIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lengthLIKE?: InputMaybe<Scalars['u8']['input']>;
  lengthLT?: InputMaybe<Scalars['u8']['input']>;
  lengthLTE?: InputMaybe<Scalars['u8']['input']>;
  lengthNEQ?: InputMaybe<Scalars['u8']['input']>;
  lengthNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  lengthNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  ownerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  text?: InputMaybe<Scalars['felt252']['input']>;
  textEQ?: InputMaybe<Scalars['felt252']['input']>;
  textGT?: InputMaybe<Scalars['felt252']['input']>;
  textGTE?: InputMaybe<Scalars['felt252']['input']>;
  textIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  textLIKE?: InputMaybe<Scalars['felt252']['input']>;
  textLT?: InputMaybe<Scalars['felt252']['input']>;
  textLTE?: InputMaybe<Scalars['felt252']['input']>;
  textNEQ?: InputMaybe<Scalars['felt252']['input']>;
  textNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  textNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
};

export type GetAllAppsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAppsQuery = { __typename?: 'World__Query', pixelawAppModels?: { __typename?: 'pixelaw_AppConnection', totalCount: number, edges?: Array<{ __typename?: 'pixelaw_AppEdge', node?: { __typename?: 'pixelaw_App', system?: any | null, name?: any | null, manifest?: any | null, icon?: any | null, action?: any | null, entity?: { __typename?: 'World__Entity', id?: string | null } | null } | null } | null> | null, pageInfo: { __typename?: 'World__PageInfo', hasNextPage?: boolean | null, endCursor?: any | null } } | null };

export type GetPixelsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Pixelaw_PixelWhereInput>;
}>;


export type GetPixelsQuery = { __typename?: 'World__Query', pixelawPixelModels?: { __typename?: 'pixelaw_PixelConnection', totalCount: number, edges?: Array<{ __typename?: 'pixelaw_PixelEdge', node?: { __typename?: 'pixelaw_Pixel', x?: any | null, y?: any | null, color?: any | null, owner?: any | null, text?: any | null, timestamp?: any | null, action?: any | null } | null } | null> | null } | null };


export const GetAllAppsDocument = gql`
    query GetAllApps {
  pixelawAppModels(first: 1000) {
    totalCount
    edges {
      node {
        system
        name
        manifest
        icon
        action
        entity {
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;
export const GetPixelsDocument = gql`
    query GetPixels($first: Int, $where: pixelaw_PixelWhereInput) {
  pixelawPixelModels(first: $first, where: $where) {
    edges {
      node {
        x
        y
        color
        owner
        text
        timestamp
        action
      }
    }
    totalCount
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const GetAllAppsDocumentString = print(GetAllAppsDocument);
const GetPixelsDocumentString = print(GetPixelsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetAllApps(variables?: GetAllAppsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllAppsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllAppsQuery>(GetAllAppsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllApps', 'query', variables);
    },
    GetPixels(variables?: GetPixelsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetPixelsQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetPixelsQuery>(GetPixelsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPixels', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;