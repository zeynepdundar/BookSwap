const BASE_URL_LOCAL = "http://localhost"; // Change this based on your environment
const BASE_URL_EC2 = "http://3.76.204.31";

const PORT_AUTH = 5001;
const PORT_EDITION = 4000;

const AuthEndpoints = {
  ADD_USER_TO_DATABASE: `${BASE_URL_LOCAL}:${PORT_AUTH}/create_user`,
};

const EditionEndpoints = {
  FETCH_EDITION_BY_ISBN: (isbn: string) =>
    `${BASE_URL_LOCAL}:${PORT_EDITION}/editions/${isbn}`,
  FETCH_EDITION_BY_TITLE: (title: string) =>
    `${BASE_URL_LOCAL}:${PORT_EDITION}/search/titles/${title}?page=1&page_size=1000`,

  FETCH_COVER: (key: string = "isbn", value: string, size: string = "M") =>
    `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
};

const ProfileEndpoints = {
  FETCH_USER_DATA: (firebaseUID: string) =>
    `${BASE_URL_LOCAL}:${PORT_AUTH}/users/${firebaseUID}`,
  FETCH_USER_PROFILE: `${BASE_URL_LOCAL}:${PORT_AUTH}/profile`,
  UPLOAD_USER_PHOTO: (userId: string) =>
    `${BASE_URL_LOCAL}:${PORT_AUTH}/user/${userId}/upload`,
  FETCH_USER_PHOTO: (userId: string) =>
    `${BASE_URL_LOCAL}:${PORT_AUTH}/profile/${userId}/photo`,

  //Wishlist - Library

  //Trade
  FETCH_RECEIVED_OFFER: (userId: string) =>
    `${BASE_URL_LOCAL}:${PORT_AUTH}/users/${userId}/received-offers`,
};

export { AuthEndpoints, EditionEndpoints, ProfileEndpoints };
