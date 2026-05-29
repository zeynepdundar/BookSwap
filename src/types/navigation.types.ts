import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Welcome: undefined;
  PhoneInput: undefined;
  CodeVerification: undefined;
};

export type ProfileCreationStackParamList = {
  NameInput: undefined;
  BirthdateInput: undefined;
  GenderInput: undefined;
  PhotoInput: undefined;
  BookSearch: undefined;
  LibraryInput: undefined;
  WishlistInput: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Wishlist: undefined;
  Library: undefined;
  Feedback: undefined;
};

export type HomeTabsParamList = {
  Home: undefined;
  Trading: NavigatorScreenParams<TradingTabsParamList>;
  Messages: undefined;
  // Notification: undefined; // Commented out but available for future use
};

export type TradingTabsParamList = {
  History: undefined;
  Received: undefined;
  Sent: undefined;
};


export type RootStackParamList = {
  // Auth Flow
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  
  // Profile Creation Flow (for new users)
  ProfileCreation: NavigatorScreenParams<ProfileCreationStackParamList>;
  BarcodeScannerOnProfileCreation: undefined;
  BookSearchOnCreation: undefined;
  
  // Main App Flow (for existing users)
  HomeTabs: NavigatorScreenParams<HomeTabsParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  UserList: undefined;
  OtherUserProfile: undefined;
  BarcodeScanner: undefined;
  BookSearchFromList: undefined;
  BookSearch: undefined;
  TradeProposal: undefined;
  TradeOfferAcceptedScreen: undefined;
  OtherLibrary: undefined;
  ChatScreen: undefined;
};

// Navigation Prop Types (for component props)
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
export type ProfileCreationStackNavigationProp = NativeStackNavigationProp<ProfileCreationStackParamList>;
export type TradingTabsNavigationProp = NativeStackNavigationProp<TradingTabsParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
