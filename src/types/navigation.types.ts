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
  BookSearchOnCreation: undefined;
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
  Swaps: NavigatorScreenParams<SwapsTabsParamList>;
  Messages: undefined;
  // Notification: undefined; // Commented out but available for future use
};

export type SwapsTabsParamList = {
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
  
  // Main App Flow (for existing users)
  HomeTabs: NavigatorScreenParams<HomeTabsParamList>;
  SwapsTabs: NavigatorScreenParams<SwapsTabsParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  UserList: undefined;
  OtherUserProfile: undefined;
  BarcodeScanner: undefined;
  BookSearchFromList: undefined;
  BookSearch: undefined;
  SwapOfferProposal: undefined;
  SwapOfferAcceptedScreen: undefined;
  OtherLibrary: undefined;
  ChatScreen: undefined;
};

// Navigation Prop Types (for component props)
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
export type ProfileCreationStackNavigationProp = NativeStackNavigationProp<ProfileCreationStackParamList>;
export type SwapsTabsNavigationProp = NativeStackNavigationProp<SwapsTabsParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
