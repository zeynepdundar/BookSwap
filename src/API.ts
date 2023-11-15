/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelEditionConnection = {
  __typename: "ModelEditionConnection",
  items:  Array<Edition | null >,
  nextToken?: string | null,
};

export type Edition = {
  __typename: "Edition",
  id: string,
  title: string,
  subtitle?: string | null,
  authors?:  Array<Author > | null,
  publish_year?: number | null,
  languages?: Array< string | null > | null,
  number_of_pages?: number | null,
  subjects?: Array< string | null > | null,
  iccn?: Array< string | null > | null,
  oclc_numbers?: Array< string | null > | null,
  isbn_10?: Array< string | null > | null,
  isbn_13?: Array< string | null > | null,
  ol_key?: string | null,
  contributions?: Array< string | null > | null,
  publish_country?: string | null,
  publishers?: Array< string | null > | null,
  translation_of?: string | null,
  work?: string | null,
  wishingUsers?: ModelUserEditionWishingConnection | null,
  owningUsers?: ModelUserEditionOwningConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type Author = {
  __typename: "Author",
  name?: string | null,
  ol_key?: string | null,
};

export type ModelUserEditionWishingConnection = {
  __typename: "ModelUserEditionWishingConnection",
  items:  Array<UserEditionWishing | null >,
  nextToken?: string | null,
};

export type UserEditionWishing = {
  __typename: "UserEditionWishing",
  id: string,
  editionId: string,
  userId: string,
  edition: Edition,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  birthdate?: string | null,
  gender?: string | null,
  profile_photo?: string | null,
  language_preference?: string | null,
  wishedEditions?: ModelUserEditionWishingConnection | null,
  ownedEditions?: ModelUserEditionOwningConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserEditionOwningConnection = {
  __typename: "ModelUserEditionOwningConnection",
  items:  Array<UserEditionOwning | null >,
  nextToken?: string | null,
};

export type UserEditionOwning = {
  __typename: "UserEditionOwning",
  id: string,
  editionId: string,
  userId: string,
  edition: Edition,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type CreateEditionInput = {
  id?: string | null,
  title: string,
  subtitle?: string | null,
  authors?: Array< AuthorInput > | null,
  publish_year?: number | null,
  languages?: Array< string | null > | null,
  number_of_pages?: number | null,
  subjects?: Array< string | null > | null,
  iccn?: Array< string | null > | null,
  oclc_numbers?: Array< string | null > | null,
  isbn_10?: Array< string | null > | null,
  isbn_13?: Array< string | null > | null,
  ol_key?: string | null,
  contributions?: Array< string | null > | null,
  publish_country?: string | null,
  publishers?: Array< string | null > | null,
  translation_of?: string | null,
  work?: string | null,
};

export type AuthorInput = {
  name?: string | null,
  ol_key?: string | null,
};

export type ModelEditionConditionInput = {
  title?: ModelStringInput | null,
  subtitle?: ModelStringInput | null,
  publish_year?: ModelIntInput | null,
  languages?: ModelStringInput | null,
  number_of_pages?: ModelIntInput | null,
  subjects?: ModelStringInput | null,
  iccn?: ModelStringInput | null,
  oclc_numbers?: ModelStringInput | null,
  isbn_10?: ModelStringInput | null,
  isbn_13?: ModelStringInput | null,
  ol_key?: ModelStringInput | null,
  contributions?: ModelStringInput | null,
  publish_country?: ModelStringInput | null,
  publishers?: ModelStringInput | null,
  translation_of?: ModelStringInput | null,
  work?: ModelStringInput | null,
  and?: Array< ModelEditionConditionInput | null > | null,
  or?: Array< ModelEditionConditionInput | null > | null,
  not?: ModelEditionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateEditionInput = {
  id: string,
  title?: string | null,
  subtitle?: string | null,
  authors?: Array< AuthorInput > | null,
  publish_year?: number | null,
  languages?: Array< string | null > | null,
  number_of_pages?: number | null,
  subjects?: Array< string | null > | null,
  iccn?: Array< string | null > | null,
  oclc_numbers?: Array< string | null > | null,
  isbn_10?: Array< string | null > | null,
  isbn_13?: Array< string | null > | null,
  ol_key?: string | null,
  contributions?: Array< string | null > | null,
  publish_country?: string | null,
  publishers?: Array< string | null > | null,
  translation_of?: string | null,
  work?: string | null,
};

export type DeleteEditionInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  birthdate?: string | null,
  gender?: string | null,
  profile_photo?: string | null,
  language_preference?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  profile_photo?: ModelStringInput | null,
  language_preference?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  birthdate?: string | null,
  gender?: string | null,
  profile_photo?: string | null,
  language_preference?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateUserEditionWishingInput = {
  id?: string | null,
  editionId: string,
  userId: string,
};

export type ModelUserEditionWishingConditionInput = {
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionWishingConditionInput | null > | null,
  or?: Array< ModelUserEditionWishingConditionInput | null > | null,
  not?: ModelUserEditionWishingConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserEditionWishingInput = {
  id: string,
  editionId?: string | null,
  userId?: string | null,
};

export type DeleteUserEditionWishingInput = {
  id: string,
};

export type CreateUserEditionOwningInput = {
  id?: string | null,
  editionId: string,
  userId: string,
};

export type ModelUserEditionOwningConditionInput = {
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionOwningConditionInput | null > | null,
  or?: Array< ModelUserEditionOwningConditionInput | null > | null,
  not?: ModelUserEditionOwningConditionInput | null,
};

export type UpdateUserEditionOwningInput = {
  id: string,
  editionId?: string | null,
  userId?: string | null,
};

export type DeleteUserEditionOwningInput = {
  id: string,
};

export type ModelEditionFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  subtitle?: ModelStringInput | null,
  publish_year?: ModelIntInput | null,
  languages?: ModelStringInput | null,
  number_of_pages?: ModelIntInput | null,
  subjects?: ModelStringInput | null,
  iccn?: ModelStringInput | null,
  oclc_numbers?: ModelStringInput | null,
  isbn_10?: ModelStringInput | null,
  isbn_13?: ModelStringInput | null,
  ol_key?: ModelStringInput | null,
  contributions?: ModelStringInput | null,
  publish_country?: ModelStringInput | null,
  publishers?: ModelStringInput | null,
  translation_of?: ModelStringInput | null,
  work?: ModelStringInput | null,
  and?: Array< ModelEditionFilterInput | null > | null,
  or?: Array< ModelEditionFilterInput | null > | null,
  not?: ModelEditionFilterInput | null,
};

export type SearchableEditionFilterInput = {
  id?: SearchableIDFilterInput | null,
  title?: SearchableStringFilterInput | null,
  subtitle?: SearchableStringFilterInput | null,
  publish_year?: SearchableIntFilterInput | null,
  languages?: SearchableStringFilterInput | null,
  number_of_pages?: SearchableIntFilterInput | null,
  subjects?: SearchableStringFilterInput | null,
  iccn?: SearchableStringFilterInput | null,
  oclc_numbers?: SearchableStringFilterInput | null,
  isbn_10?: SearchableStringFilterInput | null,
  isbn_13?: SearchableStringFilterInput | null,
  ol_key?: SearchableStringFilterInput | null,
  contributions?: SearchableStringFilterInput | null,
  publish_country?: SearchableStringFilterInput | null,
  publishers?: SearchableStringFilterInput | null,
  translation_of?: SearchableStringFilterInput | null,
  work?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableEditionFilterInput | null > | null,
  or?: Array< SearchableEditionFilterInput | null > | null,
  not?: SearchableEditionFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableEditionSortInput = {
  field?: SearchableEditionSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableEditionSortableFields {
  id = "id",
  title = "title",
  subtitle = "subtitle",
  publish_year = "publish_year",
  languages = "languages",
  number_of_pages = "number_of_pages",
  subjects = "subjects",
  iccn = "iccn",
  oclc_numbers = "oclc_numbers",
  isbn_10 = "isbn_10",
  isbn_13 = "isbn_13",
  ol_key = "ol_key",
  contributions = "contributions",
  publish_country = "publish_country",
  publishers = "publishers",
  translation_of = "translation_of",
  work = "work",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableEditionAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableEditionAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableEditionAggregateField {
  id = "id",
  title = "title",
  subtitle = "subtitle",
  publish_year = "publish_year",
  languages = "languages",
  number_of_pages = "number_of_pages",
  subjects = "subjects",
  iccn = "iccn",
  oclc_numbers = "oclc_numbers",
  isbn_10 = "isbn_10",
  isbn_13 = "isbn_13",
  ol_key = "ol_key",
  contributions = "contributions",
  publish_country = "publish_country",
  publishers = "publishers",
  translation_of = "translation_of",
  work = "work",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableEditionConnection = {
  __typename: "SearchableEditionConnection",
  items:  Array<Edition | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  profile_photo?: ModelStringInput | null,
  language_preference?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelUserEditionWishingFilterInput = {
  id?: ModelIDInput | null,
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionWishingFilterInput | null > | null,
  or?: Array< ModelUserEditionWishingFilterInput | null > | null,
  not?: ModelUserEditionWishingFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserEditionOwningFilterInput = {
  id?: ModelIDInput | null,
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionOwningFilterInput | null > | null,
  or?: Array< ModelUserEditionOwningFilterInput | null > | null,
  not?: ModelUserEditionOwningFilterInput | null,
};

export type ModelSubscriptionEditionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  subtitle?: ModelSubscriptionStringInput | null,
  publish_year?: ModelSubscriptionIntInput | null,
  languages?: ModelSubscriptionStringInput | null,
  number_of_pages?: ModelSubscriptionIntInput | null,
  subjects?: ModelSubscriptionStringInput | null,
  iccn?: ModelSubscriptionStringInput | null,
  oclc_numbers?: ModelSubscriptionStringInput | null,
  isbn_10?: ModelSubscriptionStringInput | null,
  isbn_13?: ModelSubscriptionStringInput | null,
  ol_key?: ModelSubscriptionStringInput | null,
  contributions?: ModelSubscriptionStringInput | null,
  publish_country?: ModelSubscriptionStringInput | null,
  publishers?: ModelSubscriptionStringInput | null,
  translation_of?: ModelSubscriptionStringInput | null,
  work?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEditionFilterInput | null > | null,
  or?: Array< ModelSubscriptionEditionFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  birthdate?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  profile_photo?: ModelSubscriptionStringInput | null,
  language_preference?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionUserEditionWishingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  editionId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserEditionWishingFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserEditionWishingFilterInput | null > | null,
};

export type ModelSubscriptionUserEditionOwningFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  editionId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserEditionOwningFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserEditionOwningFilterInput | null > | null,
};

export type ListEditionsIncludeOwningUsersQuery = {
  listEditions?:  {
    __typename: "ModelEditionConnection",
    items:  Array< {
      __typename: "Edition",
      id: string,
      title: string,
      authors?:  Array< {
        __typename: "Author",
        name?: string | null,
      } > | null,
      owningUsers?:  {
        __typename: "ModelUserEditionOwningConnection",
        items:  Array< {
          __typename: "UserEditionOwning",
          user:  {
            __typename: "User",
            name: string,
          },
        } | null >,
      } | null,
      publishers?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
    } | null >,
  } | null,
};

export type SearchEditionsByISBN13QueryVariables = {
  isbn_13: string,
};

export type SearchEditionsByISBN13Query = {
  listEditions?:  {
    __typename: "ModelEditionConnection",
    items:  Array< {
      __typename: "Edition",
      id: string,
      authors?:  Array< {
        __typename: "Author",
        name?: string | null,
      } > | null,
      title: string,
    } | null >,
  } | null,
};

export type CreateEditionMutationVariables = {
  input: CreateEditionInput,
  condition?: ModelEditionConditionInput | null,
};

export type CreateEditionMutation = {
  createEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEditionMutationVariables = {
  input: UpdateEditionInput,
  condition?: ModelEditionConditionInput | null,
};

export type UpdateEditionMutation = {
  updateEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEditionMutationVariables = {
  input: DeleteEditionInput,
  condition?: ModelEditionConditionInput | null,
};

export type DeleteEditionMutation = {
  deleteEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserEditionWishingMutationVariables = {
  input: CreateUserEditionWishingInput,
  condition?: ModelUserEditionWishingConditionInput | null,
};

export type CreateUserEditionWishingMutation = {
  createUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserEditionWishingMutationVariables = {
  input: UpdateUserEditionWishingInput,
  condition?: ModelUserEditionWishingConditionInput | null,
};

export type UpdateUserEditionWishingMutation = {
  updateUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserEditionWishingMutationVariables = {
  input: DeleteUserEditionWishingInput,
  condition?: ModelUserEditionWishingConditionInput | null,
};

export type DeleteUserEditionWishingMutation = {
  deleteUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserEditionOwningMutationVariables = {
  input: CreateUserEditionOwningInput,
  condition?: ModelUserEditionOwningConditionInput | null,
};

export type CreateUserEditionOwningMutation = {
  createUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserEditionOwningMutationVariables = {
  input: UpdateUserEditionOwningInput,
  condition?: ModelUserEditionOwningConditionInput | null,
};

export type UpdateUserEditionOwningMutation = {
  updateUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserEditionOwningMutationVariables = {
  input: DeleteUserEditionOwningInput,
  condition?: ModelUserEditionOwningConditionInput | null,
};

export type DeleteUserEditionOwningMutation = {
  deleteUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEditionQueryVariables = {
  id: string,
};

export type GetEditionQuery = {
  getEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEditionsQueryVariables = {
  filter?: ModelEditionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEditionsQuery = {
  listEditions?:  {
    __typename: "ModelEditionConnection",
    items:  Array< {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchEditionsQueryVariables = {
  filter?: SearchableEditionFilterInput | null,
  sort?: Array< SearchableEditionSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableEditionAggregationInput | null > | null,
};

export type SearchEditionsQuery = {
  searchEditions?:  {
    __typename: "SearchableEditionConnection",
    items:  Array< {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserEditionWishingQueryVariables = {
  id: string,
};

export type GetUserEditionWishingQuery = {
  getUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserEditionWishingsQueryVariables = {
  filter?: ModelUserEditionWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEditionWishingsQuery = {
  listUserEditionWishings?:  {
    __typename: "ModelUserEditionWishingConnection",
    items:  Array< {
      __typename: "UserEditionWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionWishingsByEditionIdQueryVariables = {
  editionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionWishingsByEditionIdQuery = {
  userEditionWishingsByEditionId?:  {
    __typename: "ModelUserEditionWishingConnection",
    items:  Array< {
      __typename: "UserEditionWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionWishingsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionWishingsByUserIdQuery = {
  userEditionWishingsByUserId?:  {
    __typename: "ModelUserEditionWishingConnection",
    items:  Array< {
      __typename: "UserEditionWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserEditionOwningQueryVariables = {
  id: string,
};

export type GetUserEditionOwningQuery = {
  getUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserEditionOwningsQueryVariables = {
  filter?: ModelUserEditionOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEditionOwningsQuery = {
  listUserEditionOwnings?:  {
    __typename: "ModelUserEditionOwningConnection",
    items:  Array< {
      __typename: "UserEditionOwning",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionOwningsByEditionIdQueryVariables = {
  editionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionOwningsByEditionIdQuery = {
  userEditionOwningsByEditionId?:  {
    __typename: "ModelUserEditionOwningConnection",
    items:  Array< {
      __typename: "UserEditionOwning",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionOwningsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionOwningsByUserIdQuery = {
  userEditionOwningsByUserId?:  {
    __typename: "ModelUserEditionOwningConnection",
    items:  Array< {
      __typename: "UserEditionOwning",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEditionSubscriptionVariables = {
  filter?: ModelSubscriptionEditionFilterInput | null,
};

export type OnCreateEditionSubscription = {
  onCreateEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEditionSubscriptionVariables = {
  filter?: ModelSubscriptionEditionFilterInput | null,
};

export type OnUpdateEditionSubscription = {
  onUpdateEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEditionSubscriptionVariables = {
  filter?: ModelSubscriptionEditionFilterInput | null,
};

export type OnDeleteEditionSubscription = {
  onDeleteEdition?:  {
    __typename: "Edition",
    id: string,
    title: string,
    subtitle?: string | null,
    authors?:  Array< {
      __typename: "Author",
      name?: string | null,
      ol_key?: string | null,
    } > | null,
    publish_year?: number | null,
    languages?: Array< string | null > | null,
    number_of_pages?: number | null,
    subjects?: Array< string | null > | null,
    iccn?: Array< string | null > | null,
    oclc_numbers?: Array< string | null > | null,
    isbn_10?: Array< string | null > | null,
    isbn_13?: Array< string | null > | null,
    ol_key?: string | null,
    contributions?: Array< string | null > | null,
    publish_country?: string | null,
    publishers?: Array< string | null > | null,
    translation_of?: string | null,
    work?: string | null,
    wishingUsers?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    birthdate?: string | null,
    gender?: string | null,
    profile_photo?: string | null,
    language_preference?: string | null,
    wishedEditions?:  {
      __typename: "ModelUserEditionWishingConnection",
      nextToken?: string | null,
    } | null,
    ownedEditions?:  {
      __typename: "ModelUserEditionOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserEditionWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionWishingFilterInput | null,
};

export type OnCreateUserEditionWishingSubscription = {
  onCreateUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserEditionWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionWishingFilterInput | null,
};

export type OnUpdateUserEditionWishingSubscription = {
  onUpdateUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserEditionWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionWishingFilterInput | null,
};

export type OnDeleteUserEditionWishingSubscription = {
  onDeleteUserEditionWishing?:  {
    __typename: "UserEditionWishing",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserEditionOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionOwningFilterInput | null,
};

export type OnCreateUserEditionOwningSubscription = {
  onCreateUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserEditionOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionOwningFilterInput | null,
};

export type OnUpdateUserEditionOwningSubscription = {
  onUpdateUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserEditionOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionOwningFilterInput | null,
};

export type OnDeleteUserEditionOwningSubscription = {
  onDeleteUserEditionOwning?:  {
    __typename: "UserEditionOwning",
    id: string,
    editionId: string,
    userId: string,
    edition:  {
      __typename: "Edition",
      id: string,
      title: string,
      subtitle?: string | null,
      publish_year?: number | null,
      languages?: Array< string | null > | null,
      number_of_pages?: number | null,
      subjects?: Array< string | null > | null,
      iccn?: Array< string | null > | null,
      oclc_numbers?: Array< string | null > | null,
      isbn_10?: Array< string | null > | null,
      isbn_13?: Array< string | null > | null,
      ol_key?: string | null,
      contributions?: Array< string | null > | null,
      publish_country?: string | null,
      publishers?: Array< string | null > | null,
      translation_of?: string | null,
      work?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      birthdate?: string | null,
      gender?: string | null,
      profile_photo?: string | null,
      language_preference?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
