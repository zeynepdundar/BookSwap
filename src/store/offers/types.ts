import { Book } from "@/types/book.types";
import { PublicProfile } from "@/types/user.types";

export interface HistoryItem {
  id: number;
  createdAt: string;
  offeredBook: Book; 
  requestedBook: Book;
  participantProfile: PublicProfile; 
}

export interface OfferParticipant {
  id: string;
  name: string;
  firebase_uid: string; 
  photo_file_name?: string | null;
}

export interface OfferBook {
  title: string;
  author: string;
  coverUrl: string | null;
}

export interface Offer {
  id: string;
  createdAt: string;
  offeredBook: OfferBook;
  requestedBook: OfferBook;
  participantProfile: OfferParticipant;
}

export interface OffersState {
  received: Offer[];
  sent: Offer[];
  history: HistoryItem[]; 

  loading: boolean;
  error: string | null;
}

export interface SwapProposalForm {
  receiverId: string;
  offeredBook: Book | null; 
  requestedBook: Book | null;  
}