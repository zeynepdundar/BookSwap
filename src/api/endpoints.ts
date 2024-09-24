// const BASE_URL = "http://18.195.95.136";
const BASE_URL = "https://be76-46-2-235-34.ngrok-free.app";
const BASE_URL_EDITION = "http://18.195.95.136";
//"http://localhost"; // Change this based on your environment
// const PORT = 3050;
const EDITION_PORT = 3050;
const CORE_PORT = 5001;

const AuthEndpoints = {
  ADD_USER_TO_DATABASE: `${BASE_URL}/create_user`,
};

const EditionEndpoints = {
  FETCH_EDITION_BY_ISBN: (isbn: string) =>
    `${BASE_URL_EDITION}:${EDITION_PORT}/editions/${isbn}`,
  FETCH_EDITION_BY_TITLE: (title: string) =>
    `${BASE_URL_EDITION}:${EDITION_PORT}/search/titles/${title}?page=1&page_size=1000`,
  FETCH_MOST_POPULAR_EDITIONS: `${BASE_URL}/most_popular_editions`,

  FETCH_COVER_OL: (key: string = "isbn", value: string, size: string = "M") =>
    `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
};

const ProfileEndpoints = {
  FETCH_USER_DATA: (firebaseUID: string) =>
    `${BASE_URL}/users/${firebaseUID}`,
  UPDATE_USER_DATA: `${BASE_URL}/profile`,
  FETCH_USER_PHOTO: (userId: string) =>
    `${BASE_URL}/profile/${userId}/photo`,
  FETCH_USER_PHOTO_URL: (userId: string) =>
    `${BASE_URL}/profile/${userId}/photo-url`,
  UPLOAD_USER_PHOTO: (userId: string) =>
    `${BASE_URL}/user/${userId}/upload`,

  //Wishlist - Library
  ADD_BOOK_TO_WISLIST: (userId: string) =>
    `${BASE_URL}/user/${userId}/wished_editions`,
  //Wishlist - Library
  ADD_BOOK_TO_LIBRARY: (userId: string) =>
    `${BASE_URL}/user/${userId}/owned_editions`,

  //Trade
  FETCH_RECEIVED_OFFER: (userId: string) =>
    `${BASE_URL}/users/${userId}/received-offers`,
  FETCH_SENT_OFFER: (userId: string) =>
    `${BASE_URL}/users/${userId}/sent-offers`,
  FETCH_HISTORY: (userId: string) =>
    `${BASE_URL}/users/${userId}/offer-history`,
  SENT_OFFER: `${BASE_URL}/offer/send`,
  ACCEPT_OFFER: `${BASE_URL}/offer/accept`,
  REJECT_OFFER: `${BASE_URL}/offer/reject`,
  TAKE_BACK_OFFER: `${BASE_URL}/offer/takeback`,
};

export { AuthEndpoints, EditionEndpoints, ProfileEndpoints };
