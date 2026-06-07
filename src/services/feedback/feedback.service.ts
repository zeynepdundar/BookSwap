import { FeedbackEndpoints } from "@/api/feedback.endpoints";

export const submitFeedback = async (userId, feedbackText) => {
  try {
    const response = await fetch(FeedbackEndpoints.SUBMIT_FEEDBACK(userId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: feedbackText }),
    });

    const data = await response.text();
    const parsed = data ? JSON.parse(data) : null;

    if (!response.ok) {
      throw new Error(parsed?.message || "Failed to submit feedback.");
    }

    return parsed;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};