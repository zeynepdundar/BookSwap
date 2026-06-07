import { api } from "./config";

export const OfferEndpoints = {
  FETCH_RECEIVED: (userId: string) =>
    api(`/core/users/${userId}/received-offers`),

  FETCH_SENT: (userId: string) =>
    api(`/core/users/${userId}/sent-offers`),

  FETCH_HISTORY: (userId: string) =>
    api(`/core/users/${userId}/offer-history`),

  SEND: api("/core/offer/send"),
  ACCEPT: api("/core/offer/accept"),
  REJECT: api("/core/offer/reject"),
  TAKEBACK: api("/core/offer/takeback"),
};