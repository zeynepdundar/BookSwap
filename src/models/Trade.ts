export interface Offer {
    created_at: string;
    id: number;
    offered_editions: Edition[];
    receiver_firebase_uid: string;
    receiver_id: number;
    receiver_user_name: string;
    requested_editions: Edition[];
    sender_firebase_uid: string;
    sender_id: number;
    sender_user_name: string;
  }

  export interface Edition {
    author: string;
    cover_id: string | null;
    isbn_10: string[];
    isbn_13: string | null;
    title: string;
  }