export interface UserProfile {
  id: string;
  name: string;
  birthdate: string;
  imageData: string | null;
  gender: string;
  languagePreference: string;
  wishlistBook: any[];
  libraryBook: any[];

  //TODO: CreatE separate slices for receivedOffer, sentOffer, and historyList, good approach to manage their state independently
  receivedOffer?;
  sentOffer?;
  historyList?;
}
export interface ProfileState {
  loading: boolean;
  error: null | Error;
  profile?: UserProfile;
}
export const ListTypes = {
  WISHLIST: "WISHLIST",
  LIBRARY: "LIBRARY",
};

export const WISHLIST = ListTypes.WISHLIST;
export const LIBRARY = ListTypes.LIBRARY;

export type MyStackParamList = {
  Home: undefined;
  Profile: undefined;
  Library: undefined;
  Wishlist: undefined;
};
