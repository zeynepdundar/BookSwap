const BASE_URL = "http://3.124.218.218";
//"http://localhost"; // Change this based on your environment
const PORT = 3050;

const AuthEndpoints = {
  ADD_USER_TO_DATABASE: `${BASE_URL}:${PORT}/core/create_user`,
};

const EditionEndpoints = {
  FETCH_EDITION_BY_ISBN: (isbn: string) =>
    `${BASE_URL}:${PORT}/edition/editions/${isbn}`,
  FETCH_EDITION_BY_TITLE: (title: string) =>
    `${BASE_URL}:${PORT}/edition/search/titles/${title}?page=1&page_size=1000`,
  FETCH_MOST_POPULAR_EDITIONS: `${BASE_URL}:${PORT}/core/most_popular_editions`,

  FETCH_COVER_OL: (key: string = "isbn", value: string, size: string = "M") =>
    `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
};

const ProfileEndpoints = {
  FETCH_USER_DATA: (firebaseUID: string) =>
    `${BASE_URL}:${PORT}/core/users/${firebaseUID}`,
  UPDATE_USER_DATA: `${BASE_URL}:${PORT}/core/profile`,
  FETCH_USER_PHOTO_URL: (userId: string) =>
    `${BASE_URL}:${PORT}/core/profile/${userId}/photo-url`,
  UPLOAD_USER_PHOTO: (userId: string) =>
    `${BASE_URL}:${PORT}/core/user/${userId}/upload`,

  //Wishlist - Library
  ADD_BOOK_TO_WISLIST: (userId: string) =>
    `${BASE_URL}:${PORT}/core/user/${userId}/wished_editions`,
  //Wishlist - Library
  ADD_BOOK_TO_LIBRARY: (userId: string) =>
    `${BASE_URL}:${PORT}/core/user/${userId}/owned_editions`,

  //Trade
  FETCH_RECEIVED_OFFER: (userId: string) =>
    `${BASE_URL}:${PORT}/core/users/${userId}/received-offers`,
  FETCH_SENT_OFFER: (userId: string) =>
    `${BASE_URL}:${PORT}/core/users/${userId}/sent-offers`,
  FETCH_HISTORY: (userId: string) =>
    `${BASE_URL}:${PORT}/core/users/${userId}/offer-history`,
  SENT_OFFER: `${BASE_URL}:${PORT}/core/offer/send`,
  ACCEPT_OFFER: `${BASE_URL}:${PORT}/core/offer/accept`,
  REJECT_OFFER: `${BASE_URL}:${PORT}/core/offer/reject`,
  TAKE_BACK_OFFER: `${BASE_URL}:${PORT}/core/offer/takeback`,

  // Feedback
  SUBMIT_FEEDBACK: (userId: string) =>
    `${BASE_URL}:${PORT}/core/user/${userId}/feedback`,
};

export { AuthEndpoints, EditionEndpoints, ProfileEndpoints };
