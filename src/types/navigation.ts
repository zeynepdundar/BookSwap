import { Book } from "../models/Book";
import { UserProfile } from "../models/Message";
import { UserData } from "../models/User";


export enum SceneName {
  Welcome = "Welcome",
  AuthVerification = "AuthVerification",
  Home = "Home",
  Trading = "Trading",
  Messages = "Messages",
  ProfileCreation = "ProfileCreation",
  BarcodeScannerOnProfileCreation = "BarcodeScannerOnProfileCreation",
  BookSearchOnCreation = "BookSearchOnCreation",
  UserList = "UserList",
  OtherUserProfile = "OtherUserProfile",
  BarcodeScanner = "BarcodeScanner",
  BookSearchFromList = "BookSearchFromList",
  BookSearch = "BookSearch",
  TradeProposal = "TradeProposal",
  TradeOfferAcceptedScreen = "TradeOfferAcceptedScreen",
  OtherLibrary = "OtherLibrary",
  ChatScreen = "ChatScreen",
  MyLibrary = "MyLibrary",
  MyWishlist = "MyWishlist",
  Wishlist = "Wishlist",
  Library = "Library",
}

export interface RouteParams {
  user?: UserData;
  book?: Book;
}

// Define route params for each screen
export type RootStackParamList = {
  [SceneName.Welcome]: undefined;
  [SceneName.AuthVerification]: undefined;
  [SceneName.Home]: undefined;
  [SceneName.Trading]: undefined;
  [SceneName.Messages]: undefined;
  [SceneName.ProfileCreation]: undefined;
  [SceneName.BarcodeScannerOnProfileCreation]: undefined;
  [SceneName.BookSearchOnCreation]: undefined;
  [SceneName.UserList]: undefined;
  [SceneName.OtherUserProfile]: { user: UserProfile };
  [SceneName.BarcodeScanner]: undefined;
  [SceneName.BookSearchFromList]: undefined;
  [SceneName.BookSearch]: undefined;
  [SceneName.TradeProposal]: RouteParams;
  [SceneName.TradeOfferAcceptedScreen]: undefined;
  [SceneName.OtherLibrary]: { user: UserProfile };
  [SceneName.ChatScreen]: { user: UserProfile };
};
