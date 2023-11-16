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
export const searchEditions = /* GraphQL */ `query SearchEditions(
  $filter: SearchableEditionFilterInput
  $sort: [SearchableEditionSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableEditionAggregationInput]
) {
  searchEditions(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
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
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchEditionsQueryVariables,
  APITypes.SearchEditionsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    birthdate
    gender
    profile_photo
    language_preference
    wishedEditions {
      nextToken
      __typename
    }
    ownedEditions {
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
export const getUserEditionWishing = /* GraphQL */ `query GetUserEditionWishing($id: ID!) {
  getUserEditionWishing(id: $id) {
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
  APITypes.GetUserEditionWishingQueryVariables,
  APITypes.GetUserEditionWishingQuery
>;
export const listUserEditionWishings = /* GraphQL */ `query ListUserEditionWishings(
  $filter: ModelUserEditionWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserEditionWishings(
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
  APITypes.ListUserEditionWishingsQueryVariables,
  APITypes.ListUserEditionWishingsQuery
>;
export const userEditionWishingsByEditionId = /* GraphQL */ `query UserEditionWishingsByEditionId(
  $editionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionWishingsByEditionId(
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
  APITypes.UserEditionWishingsByEditionIdQueryVariables,
  APITypes.UserEditionWishingsByEditionIdQuery
>;
export const userEditionWishingsByUserId = /* GraphQL */ `query UserEditionWishingsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionWishingFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionWishingsByUserId(
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
  APITypes.UserEditionWishingsByUserIdQueryVariables,
  APITypes.UserEditionWishingsByUserIdQuery
>;
export const getUserEditionOwning = /* GraphQL */ `query GetUserEditionOwning($id: ID!) {
  getUserEditionOwning(id: $id) {
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
  APITypes.GetUserEditionOwningQueryVariables,
  APITypes.GetUserEditionOwningQuery
>;
export const listUserEditionOwnings = /* GraphQL */ `query ListUserEditionOwnings(
  $filter: ModelUserEditionOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserEditionOwnings(
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
  APITypes.ListUserEditionOwningsQueryVariables,
  APITypes.ListUserEditionOwningsQuery
>;
export const userEditionOwningsByEditionId = /* GraphQL */ `query UserEditionOwningsByEditionId(
  $editionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionOwningsByEditionId(
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
  APITypes.UserEditionOwningsByEditionIdQueryVariables,
  APITypes.UserEditionOwningsByEditionIdQuery
>;
export const userEditionOwningsByUserId = /* GraphQL */ `query UserEditionOwningsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserEditionOwningFilterInput
  $limit: Int
  $nextToken: String
) {
  userEditionOwningsByUserId(
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
  APITypes.UserEditionOwningsByUserIdQueryVariables,
  APITypes.UserEditionOwningsByUserIdQuery
>;
