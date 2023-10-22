/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEdition = /* GraphQL */ `mutation CreateEdition(
  $input: CreateEditionInput!
  $condition: ModelEditionConditionInput
) {
  createEdition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEditionMutationVariables,
  APITypes.CreateEditionMutation
>;
export const updateEdition = /* GraphQL */ `mutation UpdateEdition(
  $input: UpdateEditionInput!
  $condition: ModelEditionConditionInput
) {
  updateEdition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEditionMutationVariables,
  APITypes.UpdateEditionMutation
>;
export const deleteEdition = /* GraphQL */ `mutation DeleteEdition(
  $input: DeleteEditionInput!
  $condition: ModelEditionConditionInput
) {
  deleteEdition(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEditionMutationVariables,
  APITypes.DeleteEditionMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createUserEditionsWishing = /* GraphQL */ `mutation CreateUserEditionsWishing(
  $input: CreateUserEditionsWishingInput!
  $condition: ModelUserEditionsWishingConditionInput
) {
  createUserEditionsWishing(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserEditionsWishingMutationVariables,
  APITypes.CreateUserEditionsWishingMutation
>;
export const updateUserEditionsWishing = /* GraphQL */ `mutation UpdateUserEditionsWishing(
  $input: UpdateUserEditionsWishingInput!
  $condition: ModelUserEditionsWishingConditionInput
) {
  updateUserEditionsWishing(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserEditionsWishingMutationVariables,
  APITypes.UpdateUserEditionsWishingMutation
>;
export const deleteUserEditionsWishing = /* GraphQL */ `mutation DeleteUserEditionsWishing(
  $input: DeleteUserEditionsWishingInput!
  $condition: ModelUserEditionsWishingConditionInput
) {
  deleteUserEditionsWishing(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserEditionsWishingMutationVariables,
  APITypes.DeleteUserEditionsWishingMutation
>;
export const createUserEditionsOwning = /* GraphQL */ `mutation CreateUserEditionsOwning(
  $input: CreateUserEditionsOwningInput!
  $condition: ModelUserEditionsOwningConditionInput
) {
  createUserEditionsOwning(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserEditionsOwningMutationVariables,
  APITypes.CreateUserEditionsOwningMutation
>;
export const updateUserEditionsOwning = /* GraphQL */ `mutation UpdateUserEditionsOwning(
  $input: UpdateUserEditionsOwningInput!
  $condition: ModelUserEditionsOwningConditionInput
) {
  updateUserEditionsOwning(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserEditionsOwningMutationVariables,
  APITypes.UpdateUserEditionsOwningMutation
>;
export const deleteUserEditionsOwning = /* GraphQL */ `mutation DeleteUserEditionsOwning(
  $input: DeleteUserEditionsOwningInput!
  $condition: ModelUserEditionsOwningConditionInput
) {
  deleteUserEditionsOwning(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserEditionsOwningMutationVariables,
  APITypes.DeleteUserEditionsOwningMutation
>;
