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
    return books.map((book) => createBookData(book));
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

export const createOffer = (offers, type) => {
  if (Array.isArray(offers)) {
    return offers.map((offers) => createOffer(offers, type));
  }

  return {
    id: offers.id,
    participantProfile: {
      id: type === "received" ? offers.sender_id : offers.receiver_id,
      name: type === "received"? offers.sender_user_name: offers.receiver_user_name,
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

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};

export const formatText = (inputText) => {
  const words = inputText.split(" ");

  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
  );

  const formattedText = formattedWords.join(" ");

  return formattedText;
};