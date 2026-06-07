/**
 * Book data structure for library and wishlist
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    coverUrl?: string;
}

/**
 * Type of list the book belongs to
 */
export const BookCollections = {
  WISHLIST: "wishlist",
  LIBRARY: "library",
} as const;

export type BookCollection =
  (typeof BookCollections)[keyof typeof BookCollections];

/**
 * Payload for adding or removing books
 */
export interface AddBooksPayload {
  books: Book[];
  collection: BookCollection;
}

export interface RemoveBooksPayload {
  bookIds: string[];
  collection: BookCollection;
}

/**
 * Book search result
 */
export interface BookSearchResult {
    id: string;
    title: string;
    author: string;
    publisher?: string;
    isbn?: string;
    coverUrl?: string;
}

/**
 * Book list response from API
 */
export interface BookListResponse {
    id: string;
    title: string;
    author: string;
    publisher: string;
}
