import { useState } from "react";
import { Button, Center } from "native-base";
import Screen from "../../components/Screen";
import { BookListVertical } from "../../components/shared/BookListVertical";


export default function OtherUserWishlistScreen({
  navigation,
  profile,
  wishedBook,
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [wishedBooks, setWishedBook] = useState(wishedBook);



  return (
    <Screen>
        <BookListVertical data={wishedBooks} ></BookListVertical>
    </Screen>
  );
}
