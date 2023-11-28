import React, {
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import Screen from "../components/Screen";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  const uid = route.params.userId;
  const friendId = route.params.friendId;

  // this value will come from the Messages screen
  const conversationId = "nMllpV37qtjaJFjEyrzS";
  const userId = uid;
  const friendUserId = friendId;

  useLayoutEffect(() => {
    console.log("userId: ", userId);
    console.log("friendId: ", friendId);

    const subscriber = firestore()
      .collection("Conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        console.log("querySnapshot: ", querySnapshot.docs[0].data().createdAt);
        setMessages(
          querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: {
              _id: doc.data().senderId,
            },
          }))
        );
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    firestore()
      .collection("Conversations")
      .doc(conversationId)
      .collection("messages")
      .add({
        createdAt: firestore.Timestamp.now(),
        text: messages[0].text,
        senderId: userId,
      })
      .then(() => {
        console.log("Message sent!");
      });
  }, []);

  return (
    <Screen>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </Screen>
  );
}
