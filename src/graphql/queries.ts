/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEdition = /* GraphQL */ `query GetEdition($id: ID!) {
  getEdition(id: $id) {
    id
    title
    subtitle
    authors {
      name
      ol_key
      __typename
    }
    publish_year
    languages
    number_of_pages
    subjects
    iccn
    oclc_numbers
    isbn_10
    isbn_13
    ol_key
    contributions
    publish_country
    publishers
    translation_of
    work
    wishingUsers {
      nextToken
      __typename
    }
    owningUsers {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEditionQueryVariables,
  APITypes.GetEditionQuery
>;
export const listEditions = /* GraphQL */ `query ListEditions(
  $filter: ModelEditionFilterInput
  $limit: Int
  $nextToken: String
) {
  listEditions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      subtitle
      publish_year
      languages
      number_of_pages
      subjects
      iccn
      oclc_numbers
      isbn_10
      isbn_13
      ol_key
      contributions
      publish_country
      publishers
      translation_of
      work
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEditionsQueryVariables,
  APITypes.ListEditionsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    birthdate
    gender
    profile_photo
    language_preference
    wishingEditions {
      nextToken
      __typename
    }
    owningEditions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      birthdate
      gender
      profile_photo
      language_preference
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getUserEditionsWishing = /* GraphQL */ `query GetUserEditionsWishing($id: ID!) {
  getUserEditionsWishing(id: $id) {
    id
    editionId
    userId
    edition {
      id
      title
      subtitle
      publish_year
      languages
      number_of_pages
      subjects
      iccn
      oclc_numbers
      isbn_10
      isbn_13
      ol_key
      contributions
      publish_country
      publishers
      translation_of
      work
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      name
      birthdate
      gender
      profile_photo
      language_preference
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserEditionsWishingQueryVariables,
  APITypes.GetUserEditionsWishingQuery
>;
export const listUserEditionsWishings = /* GraphQL */ `query ListUserEditionsWishings(
  $filter: ModelUserEditionsWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserEditionsWishings(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserEditionsWishingsQueryVariables,
  APITypes.ListUserEditionsWishingsQuery
>;
export const userEditionsWishingsByEditionId = /* GraphQL */ `query UserEditionsWishingsByEditionId(
  $editionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionsWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionsWishingsByEditionId(
    editionId: $editionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserEditionsWishingsByEditionIdQueryVariables,
  APITypes.UserEditionsWishingsByEditionIdQuery
>;
export const userEditionsWishingsByUserId = /* GraphQL */ `query UserEditionsWishingsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionsWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionsWishingsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserEditionsWishingsByUserIdQueryVariables,
  APITypes.UserEditionsWishingsByUserIdQuery
>;
export const getUserEditionsOwning = /* GraphQL */ `query GetUserEditionsOwning($id: ID!) {
  getUserEditionsOwning(id: $id) {
    id
    editionId
    userId
    edition {
      id
      title
      subtitle
      publish_year
      languages
      number_of_pages
      subjects
      iccn
      oclc_numbers
      isbn_10
      isbn_13
      ol_key
      contributions
      publish_country
      publishers
      translation_of
      work
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      name
      birthdate
      gender
      profile_photo
      language_preference
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserEditionsOwningQueryVariables,
  APITypes.GetUserEditionsOwningQuery
>;
export const listUserEditionsOwnings = /* GraphQL */ `query ListUserEditionsOwnings(
  $filter: ModelUserEditionsOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserEditionsOwnings(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserEditionsOwningsQueryVariables,
  APITypes.ListUserEditionsOwningsQuery
>;
export const userEditionsOwningsByEditionId = /* GraphQL */ `query UserEditionsOwningsByEditionId(
  $editionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionsOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionsOwningsByEditionId(
    editionId: $editionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserEditionsOwningsByEditionIdQueryVariables,
  APITypes.UserEditionsOwningsByEditionIdQuery
>;
export const userEditionsOwningsByUserId = /* GraphQL */ `query UserEditionsOwningsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionsOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionsOwningsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      editionId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserEditionsOwningsByUserIdQueryVariables,
  APITypes.UserEditionsOwningsByUserIdQuery
>;
