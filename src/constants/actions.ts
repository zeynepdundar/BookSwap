import { LIBRARY } from ".";
import { WISHLIST } from ".";

export const REPORT_ACTIONS = {
  INAPPROPRIATE: {
    type: 'INAPPROPRIATE',
    label: 'inappropiate-message'
  },
  SPAM: {
    type: 'SPAM',
    label: 'spam-message'
  },
  OTHER: {
    type: 'OTHER',
    label: 'other'
  }
} as const; 

export const MODAL_ACTIONS = {
  ADD_TO_WISHLIST: { type: WISHLIST, label: "add-my-wishlist" },
  ADD_TO_LIBRARY: { type: LIBRARY, label: "add-my-library" },
  CANCEL: { type: "cancel", label: "cancel" }
} as const;
