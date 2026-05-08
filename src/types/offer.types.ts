import { Book } from "./book.types";
import { PublicProfile } from "./user.types";

export interface Offer {
  id: string;
  fromUserId: string;
  toUserId: string;
  bookId: string;
  status: "pending" | "accepted" | "rejected";
}

export interface HistoryItem {
  id: number;
  createdAt: string;
  offeredBook: Book;
  requestedBook: Book;
  participantProfile: PublicProfile;
}