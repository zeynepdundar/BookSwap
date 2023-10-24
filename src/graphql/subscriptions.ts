/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEdition = /* GraphQL */ `subscription OnCreateEdition($filter: ModelSubscriptionEditionFilterInput) {
  onCreateEdition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEditionSubscriptionVariables,
  APITypes.OnCreateEditionSubscription
>;
export const onUpdateEdition = /* GraphQL */ `subscription OnUpdateEdition($filter: ModelSubscriptionEditionFilterInput) {
  onUpdateEdition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEditionSubscriptionVariables,
  APITypes.OnUpdateEditionSubscription
>;
export const onDeleteEdition = /* GraphQL */ `subscription OnDeleteEdition($filter: ModelSubscriptionEditionFilterInput) {
  onDeleteEdition(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEditionSubscriptionVariables,
  APITypes.OnDeleteEditionSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateUserEditionsWishing = /* GraphQL */ `subscription OnCreateUserEditionsWishing(
  $filter: ModelSubscriptionUserEditionsWishingFilterInput
) {
  onCreateUserEditionsWishing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserEditionsWishingSubscriptionVariables,
  APITypes.OnCreateUserEditionsWishingSubscription
>;
export const onUpdateUserEditionsWishing = /* GraphQL */ `subscription OnUpdateUserEditionsWishing(
  $filter: ModelSubscriptionUserEditionsWishingFilterInput
) {
  onUpdateUserEditionsWishing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserEditionsWishingSubscriptionVariables,
  APITypes.OnUpdateUserEditionsWishingSubscription
>;
export const onDeleteUserEditionsWishing = /* GraphQL */ `subscription OnDeleteUserEditionsWishing(
  $filter: ModelSubscriptionUserEditionsWishingFilterInput
) {
  onDeleteUserEditionsWishing(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserEditionsWishingSubscriptionVariables,
  APITypes.OnDeleteUserEditionsWishingSubscription
>;
export const onCreateUserEditionsOwning = /* GraphQL */ `subscription OnCreateUserEditionsOwning(
  $filter: ModelSubscriptionUserEditionsOwningFilterInput
) {
  onCreateUserEditionsOwning(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserEditionsOwningSubscriptionVariables,
  APITypes.OnCreateUserEditionsOwningSubscription
>;
export const onUpdateUserEditionsOwning = /* GraphQL */ `subscription OnUpdateUserEditionsOwning(
  $filter: ModelSubscriptionUserEditionsOwningFilterInput
) {
  onUpdateUserEditionsOwning(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserEditionsOwningSubscriptionVariables,
  APITypes.OnUpdateUserEditionsOwningSubscription
>;
export const onDeleteUserEditionsOwning = /* GraphQL */ `subscription OnDeleteUserEditionsOwning(
  $filter: ModelSubscriptionUserEditionsOwningFilterInput
) {
  onDeleteUserEditionsOwning(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserEditionsOwningSubscriptionVariables,
  APITypes.OnDeleteUserEditionsOwningSubscription
>;
