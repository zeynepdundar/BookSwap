import { BookEndpoints } from "@/api/books.endpoints";
import { ProfileEndpoints } from "@/api/profile.endpoints";
import { AddBooksPayload, BookCollections, RemoveBooksPayload } from "@/types/book.types";
import { mapBooksData } from "@/utils/helper";
import i18n from "@/i18n";

const endpointMap = {
  [BookCollections.WISHLIST]: ProfileEndpoints.WISHLIST,
  [BookCollections.LIBRARY]: ProfileEndpoints.LIBRARY,
};

export const addBookToCollections = async (
  userId: number,
  payload: AddBooksPayload,
  token?: string
) => {
  const { books, collection } = payload;
  const editionIds = books.map((book) => book.id);

  const url = endpointMap[collection](userId.toString());

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ edition_ids: editionIds }),
  });

  const data = await response.json().catch(() => null);

  const existingIds: number[] = data?.existing_edition_ids ?? [];

  if (!response.ok || data?.status === "error") {
    if (existingIds.length > 0) {
      const existingIdSet = new Set(existingIds.map(String));
      const existingTitles = books
        .filter((book) => existingIdSet.has(String(book.id)))
        .map((book) => book.title)
        .filter(Boolean);

      const titlesText =
        existingTitles.length > 0
          ? existingTitles.join(", ")
          : i18n.t("this-book");

      const count = existingTitles.length || 1;
      const key =
        collection === BookCollections.LIBRARY
          ? "book-already-in-library"
          : "book-already-in-wishlist";

      throw new Error(i18n.t(key, { titles: titlesText, count }));
    }

    throw new Error(data?.message || "Failed to add books to collection");
  }

  return {
    bookIds: payload,
  };
};

export const removeBookFromCollection = async (userId: number,
  payload: RemoveBooksPayload) => {
  const { bookIds, collection } = payload;
  const url = endpointMap[collection](userId.toString());

  const response = await fetch(`${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify({ edition_ids: bookIds }),
  });

  if (!response.ok) {

    console.log("Failed to remove book from collection", await response.text());
    throw new Error("Failed to remove book from list [removeBookFromCollection]");
  }
};

export const fetchMostPopularBooks = async () => {
  const response = await fetch(BookEndpoints.FETCH_MOST_POPULAR, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch most popular books from db [fetchMostPopularBooks]"
    );
  }

  const result = await response.json();

  // TODO: Include publisher field in API response and display it in BookDetail page
  const transformedData = result.map((item) => ({
    id: item.id,
    title: item.title,
    isbn_13: item.isbn_13 || item.isbn_10,
    coverUrl:
      item.isbn_13 && item.isbn_13 > 0
        ? BookEndpoints.COVER_OL(undefined, item.isbn_13)
        : null,
    author: item.author ? item.author : "",
  }));
  return transformedData;
};

export const fetchBooksByTitle = async (bookTitle: string) => {
  const response = await fetch(
    BookEndpoints.SEARCH_BY_TITLE(bookTitle),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.editions || !Array.isArray(data.editions)) {
    throw new Error("Invalid or missing data structure from the server.");
  }


  return mapBooksData(data.editions);

};

export const fetchBooksByISBN = async (isbn: string) => {
  const response = await fetch(BookEndpoints.FETCH_BY_ISBN(isbn), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.editions || !Array.isArray(data.editions)) {
    throw new Error("Invalid or missing data structure from the server.");
  }
  return mapBooksData(data.editions);;
};