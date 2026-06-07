import { api } from "./config";

export const FeedbackEndpoints = {
  SUBMIT_FEEDBACK: (userId: string) =>
    api(`/core/user/${userId}/feedback`),
};