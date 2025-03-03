import { Book } from "./Book";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export interface UserData {
  id: string;
  username: string;
  birthdate: string;
  profilePicture?: string;
  gender: string;
  languagePreference: string;
  wishedBooks: Book[];
  ownedBooks: Book[];
  receivedOffers: OfferId[];
  sentOffers: OfferId[];
  tradeHistory: string[];
  //createdAt: Date;
  //updatedAt: Date;
}

export interface BasicUserData {
  firebase_uid: string;
  id: number;
  name: string;
  profilePicture?: string; // Optional field
}

type BookId = string;
type OfferId = string;

export interface ProfileState {
  loading: boolean;
  error: { name: string; message: string } | null;
  profile: UserData;
}