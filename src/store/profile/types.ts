import { Book } from "@/types/book.types";
import { HistoryItem, Offer } from "@/types/offer.types";

export interface UserProfile {
  id: number;
  name: string;
  birthdate: string;
  imageData: string | null;
  gender: string;
  languagePreference: string;
  wishlistBook: Book[];
  libraryBook: Book[];
  receivedOffer: Offer[];
  sentOffer: Offer[];
  historyList: HistoryItem[];
}
export interface ProfileState {
  loading: boolean;
  error: null | Error;
  profile: UserProfile | null;
}