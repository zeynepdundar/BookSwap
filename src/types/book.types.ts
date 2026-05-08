/**
 * Book data structure for library and wishlist
 */
export interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    type: BookCollection;
    coverImage?: string;
    isbn?: string;
    description?: string;
    publishedYear?: number;
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
 * Payload for adding books to a list
 */
export interface AddBookPayload {
    book: Book | Book[];
    listType: BookCollection;
}

/**
 * Payload for removing books from a list
 */
export interface RemoveBookPayload {
    id: string;
    listType: BookCollection;
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
    coverImage?: string;
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
