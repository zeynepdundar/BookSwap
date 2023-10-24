/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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
  wishingUsers?: ModelUserEditionsWishingConnection | null,
  owningUsers?: ModelUserEditionsOwningConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type Author = {
  __typename: "Author",
  name?: string | null,
  ol_key?: string | null,
};

export type ModelUserEditionsWishingConnection = {
  __typename: "ModelUserEditionsWishingConnection",
  items:  Array<UserEditionsWishing | null >,
  nextToken?: string | null,
};

export type UserEditionsWishing = {
  __typename: "UserEditionsWishing",
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
  wishingEditions?: ModelUserEditionsWishingConnection | null,
  owningEditions?: ModelUserEditionsOwningConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserEditionsOwningConnection = {
  __typename: "ModelUserEditionsOwningConnection",
  items:  Array<UserEditionsOwning | null >,
  nextToken?: string | null,
};

export type UserEditionsOwning = {
  __typename: "UserEditionsOwning",
  id: string,
  editionId: string,
  userId: string,
  edition: Edition,
  user: User,
  createdAt: string,
  updatedAt: string,
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

export type CreateUserEditionsWishingInput = {
  id?: string | null,
  editionId: string,
  userId: string,
};

export type ModelUserEditionsWishingConditionInput = {
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionsWishingConditionInput | null > | null,
  or?: Array< ModelUserEditionsWishingConditionInput | null > | null,
  not?: ModelUserEditionsWishingConditionInput | null,
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

export type UpdateUserEditionsWishingInput = {
  id: string,
  editionId?: string | null,
  userId?: string | null,
};

export type DeleteUserEditionsWishingInput = {
  id: string,
};

export type CreateUserEditionsOwningInput = {
  id?: string | null,
  editionId: string,
  userId: string,
};

export type ModelUserEditionsOwningConditionInput = {
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionsOwningConditionInput | null > | null,
  or?: Array< ModelUserEditionsOwningConditionInput | null > | null,
  not?: ModelUserEditionsOwningConditionInput | null,
};

export type UpdateUserEditionsOwningInput = {
  id: string,
  editionId?: string | null,
  userId?: string | null,
};

export type DeleteUserEditionsOwningInput = {
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

export type ModelEditionConnection = {
  __typename: "ModelEditionConnection",
  items:  Array<Edition | null >,
  nextToken?: string | null,
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

export type ModelUserEditionsWishingFilterInput = {
  id?: ModelIDInput | null,
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionsWishingFilterInput | null > | null,
  or?: Array< ModelUserEditionsWishingFilterInput | null > | null,
  not?: ModelUserEditionsWishingFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserEditionsOwningFilterInput = {
  id?: ModelIDInput | null,
  editionId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserEditionsOwningFilterInput | null > | null,
  or?: Array< ModelUserEditionsOwningFilterInput | null > | null,
  not?: ModelUserEditionsOwningFilterInput | null,
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

export type ModelSubscriptionUserEditionsWishingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  editionId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserEditionsWishingFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserEditionsWishingFilterInput | null > | null,
};

export type ModelSubscriptionUserEditionsOwningFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  editionId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserEditionsOwningFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserEditionsOwningFilterInput | null > | null,
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserEditionsWishingMutationVariables = {
  input: CreateUserEditionsWishingInput,
  condition?: ModelUserEditionsWishingConditionInput | null,
};

export type CreateUserEditionsWishingMutation = {
  createUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type UpdateUserEditionsWishingMutationVariables = {
  input: UpdateUserEditionsWishingInput,
  condition?: ModelUserEditionsWishingConditionInput | null,
};

export type UpdateUserEditionsWishingMutation = {
  updateUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type DeleteUserEditionsWishingMutationVariables = {
  input: DeleteUserEditionsWishingInput,
  condition?: ModelUserEditionsWishingConditionInput | null,
};

export type DeleteUserEditionsWishingMutation = {
  deleteUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type CreateUserEditionsOwningMutationVariables = {
  input: CreateUserEditionsOwningInput,
  condition?: ModelUserEditionsOwningConditionInput | null,
};

export type CreateUserEditionsOwningMutation = {
  createUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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

export type UpdateUserEditionsOwningMutationVariables = {
  input: UpdateUserEditionsOwningInput,
  condition?: ModelUserEditionsOwningConditionInput | null,
};

export type UpdateUserEditionsOwningMutation = {
  updateUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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

export type DeleteUserEditionsOwningMutationVariables = {
  input: DeleteUserEditionsOwningInput,
  condition?: ModelUserEditionsOwningConditionInput | null,
};

export type DeleteUserEditionsOwningMutation = {
  deleteUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
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

export type GetUserEditionsWishingQueryVariables = {
  id: string,
};

export type GetUserEditionsWishingQuery = {
  getUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type ListUserEditionsWishingsQueryVariables = {
  filter?: ModelUserEditionsWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEditionsWishingsQuery = {
  listUserEditionsWishings?:  {
    __typename: "ModelUserEditionsWishingConnection",
    items:  Array< {
      __typename: "UserEditionsWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionsWishingsByEditionIdQueryVariables = {
  editionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionsWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionsWishingsByEditionIdQuery = {
  userEditionsWishingsByEditionId?:  {
    __typename: "ModelUserEditionsWishingConnection",
    items:  Array< {
      __typename: "UserEditionsWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionsWishingsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionsWishingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionsWishingsByUserIdQuery = {
  userEditionsWishingsByUserId?:  {
    __typename: "ModelUserEditionsWishingConnection",
    items:  Array< {
      __typename: "UserEditionsWishing",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserEditionsOwningQueryVariables = {
  id: string,
};

export type GetUserEditionsOwningQuery = {
  getUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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

export type ListUserEditionsOwningsQueryVariables = {
  filter?: ModelUserEditionsOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEditionsOwningsQuery = {
  listUserEditionsOwnings?:  {
    __typename: "ModelUserEditionsOwningConnection",
    items:  Array< {
      __typename: "UserEditionsOwning",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionsOwningsByEditionIdQueryVariables = {
  editionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionsOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionsOwningsByEditionIdQuery = {
  userEditionsOwningsByEditionId?:  {
    __typename: "ModelUserEditionsOwningConnection",
    items:  Array< {
      __typename: "UserEditionsOwning",
      id: string,
      editionId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserEditionsOwningsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserEditionsOwningFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserEditionsOwningsByUserIdQuery = {
  userEditionsOwningsByUserId?:  {
    __typename: "ModelUserEditionsOwningConnection",
    items:  Array< {
      __typename: "UserEditionsOwning",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningUsers?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
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
    wishingEditions?:  {
      __typename: "ModelUserEditionsWishingConnection",
      nextToken?: string | null,
    } | null,
    owningEditions?:  {
      __typename: "ModelUserEditionsOwningConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserEditionsWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsWishingFilterInput | null,
};

export type OnCreateUserEditionsWishingSubscription = {
  onCreateUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type OnUpdateUserEditionsWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsWishingFilterInput | null,
};

export type OnUpdateUserEditionsWishingSubscription = {
  onUpdateUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type OnDeleteUserEditionsWishingSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsWishingFilterInput | null,
};

export type OnDeleteUserEditionsWishingSubscription = {
  onDeleteUserEditionsWishing?:  {
    __typename: "UserEditionsWishing",
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

export type OnCreateUserEditionsOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsOwningFilterInput | null,
};

export type OnCreateUserEditionsOwningSubscription = {
  onCreateUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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

export type OnUpdateUserEditionsOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsOwningFilterInput | null,
};

export type OnUpdateUserEditionsOwningSubscription = {
  onUpdateUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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

export type OnDeleteUserEditionsOwningSubscriptionVariables = {
  filter?: ModelSubscriptionUserEditionsOwningFilterInput | null,
};

export type OnDeleteUserEditionsOwningSubscription = {
  onDeleteUserEditionsOwning?:  {
    __typename: "UserEditionsOwning",
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
