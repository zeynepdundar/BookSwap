import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddBooksMode } from "@/hooks/api/useAddBooks";

export type BookSearchParams = {
  sourceScreen?: string;
  mode?: AddBooksMode;
};

// BarcodeScanner shares the same flow params as the search screen.
export type BarcodeScannerParams = BookSearchParams;

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
  BookSearch: BookSearchParams | undefined;
  BarcodeScanner: BarcodeScannerParams | undefined;
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

  // Main App Flow (for existing users)
  HomeTabs: NavigatorScreenParams<HomeTabsParamList>;
  SwapsTabs: NavigatorScreenParams<SwapsTabsParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  UserList: undefined;
  OtherUserProfile: undefined;
  BarcodeScanner: BarcodeScannerParams | undefined;
  BookSearch: BookSearchParams | undefined;
  BookDetail: undefined;
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
