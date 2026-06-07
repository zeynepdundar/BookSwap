import { api } from "./config";

export const ProfileEndpoints = {
  FETCH_USER_DATA: (firebaseUID: string) =>
    api(`/core/users/${firebaseUID}`),

  UPDATE_USER_DATA: api("/core/profile"),

  FETCH_USER_PHOTO_URL: (userId: string) =>
    api(`/core/profile/${userId}/photo-url`),

  UPLOAD_USER_PHOTO: (userId: string) =>
    api(`/core/user/${userId}/upload`),

  WISHLIST: (userId: string) =>
    api(`/core/user/${userId}/wished_editions`),

  LIBRARY: (userId: string) =>
    api(`/core/user/${userId}/owned_editions`),
};