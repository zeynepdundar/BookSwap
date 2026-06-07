import { OfferEndpoints } from "@/api/offers.endpoints";
import { structureOfferData } from "@/utils/helper";

export const sendOffer = async (userId, proposal) => {
  const offeredEditionIds = Array.isArray(proposal.offeredBook)
    ? proposal.offeredBook.map((book) => book.id)
    : [proposal.offeredBook.id];
  const requestedEditionIds = Array.isArray(proposal.requestedBook)
    ? proposal.requestedBook.map((book) => book.id)
    : [proposal.requestedBook.id];

  const response = await fetch(OfferEndpoints.SEND, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify({
      user_id: userId,
      receiver_id: proposal.receiverId,
      offered_editions: offeredEditionIds,
      requested_editions: requestedEditionIds,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to sent offer [sendOffer]");
  }
  return;
};

export const fetchReceivedOffer = async (userId) => {
  try {
    const response = await fetch(
      OfferEndpoints.FETCH_RECEIVED(userId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch received offers [fetchReceivedOffer]");
    }

    const result = await response.json();
    return structureOfferData(result, "received");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchSentOffer = async (userId) => {
  try {
    const response = await fetch(OfferEndpoints.FETCH_SENT(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sent offers");
    }

    const result = await response.json();
    return structureOfferData(result, "sent");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchHistory = async (userId) => {
  try {
    const response = await fetch(OfferEndpoints.FETCH_HISTORY(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    const result = await response.json();
    return structureOfferData(result, "history");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};