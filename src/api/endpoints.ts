import Constants from "expo-constants";

const { API_BASE_URL, API_PORT } = Constants.expoConfig?.extra || {};

const BASE_URL = API_BASE_URL || "http://localhost";
const PORT = API_PORT || "3050";

const api = (path: string) => `${BASE_URL}:${PORT}${path}`;

/* ------------------- AUTH ------------------- */
const AuthEndpoints = {
  ADD_USER_TO_DATABASE: api("/core/create_user"),
};

/* ------------------- EDITIONS ------------------- */
const EditionEndpoints = {
  FETCH_EDITION_BY_ISBN: (isbn: string) => api(`/edition/editions/${isbn}`),
  FETCH_EDITION_BY_TITLE: (title: string) =>
    api(`/edition/search/titles/${title}?page=1&page_size=1000`),
  FETCH_MOST_POPULAR_EDITIONS: api("/core/most_popular_editions"),

  // Covers (OpenLibrary external service, no base URL needed)
  FETCH_COVER_OL: (key: string = "isbn", value: string, size: string = "M") =>
    `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
};

/* ------------------- PROFILE ------------------- */
const ProfileEndpoints = {
  FETCH_USER_DATA: (firebaseUID: string) => api(`/core/users/${firebaseUID}`),
  UPDATE_USER_DATA: api("/core/profile"),
  FETCH_USER_PHOTO_URL: (userId: string) => api(`/core/profile/${userId}/photo-url`),
  UPLOAD_USER_PHOTO: (userId: string) => api(`/core/user/${userId}/upload`),

  // Wishlist & Library
  ADD_BOOK_TO_WISHLIST: (userId: string) => api(`/core/user/${userId}/wished_editions`),
  ADD_BOOK_TO_LIBRARY: (userId: string) => api(`/core/user/${userId}/owned_editions`),
};

/* ------------------- TRADE ------------------- */
const TradeEndpoints = {
  FETCH_RECEIVED_OFFERS: (userId: string) => api(`/core/users/${userId}/received-offers`),
  FETCH_SENT_OFFERS: (userId: string) => api(`/core/users/${userId}/sent-offers`),
  FETCH_HISTORY: (userId: string) => api(`/core/users/${userId}/offer-history`),

  SEND_OFFER: api("/core/offer/send"),
  ACCEPT_OFFER: api("/core/offer/accept"),
  REJECT_OFFER: api("/core/offer/reject"),
  TAKE_BACK_OFFER: api("/core/offer/takeback"),
};

/* ------------------- FEEDBACK ------------------- */
const FeedbackEndpoints = {
  SUBMIT_FEEDBACK: (userId: string) => api(`/core/user/${userId}/feedback`),
};

export { AuthEndpoints, EditionEndpoints, ProfileEndpoints, TradeEndpoints, FeedbackEndpoints };
