import { LIBRARY, WISHLIST } from "../constants";
import i18n from "../i18n";

export const getCoverUrl = (bookData) => {
  const isbn = bookData.isbn_13 || bookData.isbn_10;

  if (isbn && isbn > 0) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  } else {
    return null;
  }
};
export const createBookData = (books) => {
  if (Array.isArray(books)) {
    // If books is an array, map over it and apply createBookData for each item
    return books.reverse().map((book) => createBookData(book));
  }

  // If books is not an array, create an array with book data for a single item
  return {
    id: books.id,
    title: books.title,
    publisher: Array.isArray(books.publishers)
      ? books.publishers[0] || null
      : books.publisher || null,
    coverUrl: getCoverUrl(books),
    author:
      books.authors && books.authors.length > 0
        ? books.authors[0]?.name
        : books.author || null,
  };
};
export const structureOfferData = (offers, type) => {
  if (type === "history") {
    const receivedOffers = offers.received_offers.map((offer) =>
      structureOfferData(offer, "received")
    );
    const sentOffers = offers.sent_offers.map((offer) =>
      structureOfferData(offer, "sent")
    );
    // Combine received and sent offers into a single array

    return [...receivedOffers, ...sentOffers];
  }

  if (Array.isArray(offers)) {
    return offers.reverse().map((offer) => structureOfferData(offer, type));
  }

  return {
    id: offers.id,
    participantProfile: {
      id: type === "received" ? offers.sender_id : offers.receiver_id,
      name:
        type === "received"
          ? offers.sender_user_name
          : offers.receiver_user_name,
    },
    createdAt: timeAgo(offers.created_at),
    offeredBook: {
      title: offers.offered_editions[0].title,
      author: offers.offered_editions[0].author,
      coverUrl: getCoverUrl({
        isbn_13: offers.offered_editions[0].isbn_13,
        isbn_10: offers.offered_editions[0].isbn_10,
      }),
    },
    requestedBook: {
      title: offers.requested_editions[0].title,
      author: offers.requested_editions[0].author,
      coverUrl: getCoverUrl({
        isbn_13: offers.requested_editions[0].isbn_13,
        isbn_10: offers.requested_editions[0].isbn_10,
      }),
    },
  };
};
export const timeAgo = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) {
    return "Invalid date";
  }

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 1) {
    const formattedDate = `${
      targetDate.getMonth() + 1
    }/${targetDate.getDate()}/${targetDate.getFullYear()}`;
    return formattedDate;
  } else if (days > 0) {
    return i18n.t("days-ago", { count: days });
  } else if (hours > 0) {
    return i18n.t("hours-ago", { count: hours });
  } else if (minutes > 0) {
    return i18n.t("minutes-ago", { count: minutes });
  } else {
    return seconds > 0
      ? i18n.t("seconds-ago", { count: seconds })
      : i18n.t("just-now");
  }
};
export const formatText = (inputText) => {
  if (!inputText) {
    return ""; // Return an empty string or handle other falsy values as needed
  }
  const words = inputText.split(" ");

  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
  );

  const formattedText = formattedWords.join(" ");

  return formattedText;
};
export const formatLastMessageTime = (timestamp) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();

  // Check if the message was sent on the same day
  const isSameDay =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();

  // Format the time
  let formattedTime;
  if (isSameDay) {
    // If the message was sent on the same day, format as 'h:mm A' (e.g., 1:30 PM)
    formattedTime = messageDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  } else {
    // If the message was sent on a different day, format as 'MMM d, h:mm A' (e.g., Mar 10, 1:30 PM)
    formattedTime =
      messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) +
      ", " +
      messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
  }

  return formattedTime;
};
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};
export const generateActions = (handleAction, closeActionSheet) => [
  {
    type: WISHLIST,
    label: "add-my-wishlist",
    onPress: () => handleAction(WISHLIST),
  },
  {
    type: LIBRARY,
    label: "add-my-library",
    onPress: () => handleAction(LIBRARY),
  },
  { type: "cancel", label: "cancel", onPress: closeActionSheet },
  // Add more actions as needed
];

export const generateModalActions = (actions, handleAction, closeModal) => {
  return actions.map((action) => ({
      type: action.type,
      label: action.label,
      onPress: () => action.type === "cancel" ? closeModal() : handleAction(action.type),
    }));
  };
