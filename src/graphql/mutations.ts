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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createUserEditionWishing = /* GraphQL */ `mutation CreateUserEditionWishing(
  $input: CreateUserEditionWishingInput!
  $condition: ModelUserEditionWishingConditionInput
) {
  createUserEditionWishing(input: $input, condition: $condition) {
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
  APITypes.CreateUserEditionWishingMutationVariables,
  APITypes.CreateUserEditionWishingMutation
>;
export const updateUserEditionWishing = /* GraphQL */ `mutation UpdateUserEditionWishing(
  $input: UpdateUserEditionWishingInput!
  $condition: ModelUserEditionWishingConditionInput
) {
  updateUserEditionWishing(input: $input, condition: $condition) {
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
  APITypes.UpdateUserEditionWishingMutationVariables,
  APITypes.UpdateUserEditionWishingMutation
>;
export const deleteUserEditionWishing = /* GraphQL */ `mutation DeleteUserEditionWishing(
  $input: DeleteUserEditionWishingInput!
  $condition: ModelUserEditionWishingConditionInput
) {
  deleteUserEditionWishing(input: $input, condition: $condition) {
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
  APITypes.DeleteUserEditionWishingMutationVariables,
  APITypes.DeleteUserEditionWishingMutation
>;
export const createUserEditionOwning = /* GraphQL */ `mutation CreateUserEditionOwning(
  $input: CreateUserEditionOwningInput!
  $condition: ModelUserEditionOwningConditionInput
) {
  createUserEditionOwning(input: $input, condition: $condition) {
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
  APITypes.CreateUserEditionOwningMutationVariables,
  APITypes.CreateUserEditionOwningMutation
>;
export const updateUserEditionOwning = /* GraphQL */ `mutation UpdateUserEditionOwning(
  $input: UpdateUserEditionOwningInput!
  $condition: ModelUserEditionOwningConditionInput
) {
  updateUserEditionOwning(input: $input, condition: $condition) {
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
  APITypes.UpdateUserEditionOwningMutationVariables,
  APITypes.UpdateUserEditionOwningMutation
>;
export const deleteUserEditionOwning = /* GraphQL */ `mutation DeleteUserEditionOwning(
  $input: DeleteUserEditionOwningInput!
  $condition: ModelUserEditionOwningConditionInput
) {
  deleteUserEditionOwning(input: $input, condition: $condition) {
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
  APITypes.DeleteUserEditionOwningMutationVariables,
  APITypes.DeleteUserEditionOwningMutation
>;
