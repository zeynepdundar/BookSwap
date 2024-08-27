import { Button, Center } from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { BookListVertical } from "../../components/shared/BookListVertical";
import { useEffect, useState } from "react";

export default function OtherUserWishlistScreen({
  navigation,
  profile,
  libraryBook,
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [libraryBooks, setLibraryBooks] = useState(libraryBook);

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  const sendOfferHandler = async (selectedItem: any) => {
    navigation.navigate("TradeProposal", {data: {
      user: userProfile,
      book: {
        author: selectedItem.item.author,
        coverUrl: selectedItem.item.coverUrl,
        id: selectedItem.item.id,
        publisher: selectedItem.item.publisher,
        title: selectedItem.item.title,
      },
    }});
  };

  return (
    <Screen>
        <BookListVertical
          data={libraryBooks}
          // onSecondaryAction={addBookToListHandler}
          onSendOffer={sendOfferHandler}
        ></BookListVertical>
    
    </Screen>
  );
}
