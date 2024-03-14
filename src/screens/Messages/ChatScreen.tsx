import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import { Icon, Image, Text, View } from "native-base";
import Screen from "../../components/Screen";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  const { userId, friendId } = route.params;
  const conversationId =`${friendId}_${userId}`

  useLayoutEffect(() => {
    const subscriber = firestore()
      .collection("Conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
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
        },
        (error) => {
          console.error("Error getting documents: ", error);
        }
      );
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    firestore()
      .collection("Conversations")
      .doc(conversationId)
      .collection("messages")
      .add({
        createdAt: firestore.Timestamp.now(),
        text: messages[0].text,
        senderId: userId,
      })
      .catch((err) => console.log("Failed to send message", err));
  }, []);
  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        color: "#222B45",
        backgroundColor: "transparent",
        paddingTop: 8.5,
        marginTop: 0,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  );
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          padding: 8,
        }}
      />
    );
  };
  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        backgroundColor: "transparent",
        justifyContent: "center",
      }}
    >
      <Icon
        m="2"
        ml="3"
        size="6"
        color="gray.400"
        as={<MaterialIcons name="send" />}
      />
    </Send>
  );
  // const renderSend = useCallback((props: SendProps<IMessage>) => {
  //   return (
  //     <Send {...props} containerStyle={{ justifyContent: 'center' }}>
  //       <MaterialIcons size={30} color={'tomato'} name={'send'} />
  //     </Send>
  //   )
  // }, [])
  const customSystemMessage = (props) => {
    return (
      <View bg="amber.200" {...props} style={{ bg: "amber.100" }}>
        <Icon name="lock" color="#9d9d9d" size={16} />
        <Text>
          Your chat is secured. Remember to be cautious about what you share
          with others.
        </Text>
      </View>
    );
  };
  const renderBubble = (props) => (
    <Bubble
      {...props}
      // renderTime={() => <Text>Time</Text>}
      // renderTicks={() => <Text>Ticks</Text>}
      containerStyle={{
        left: { borderColor: "teal", borderWidth: 0, marginLeft: -50 },
        right: { borderColor: "teal", borderWidth: 0 },
      }}
      wrapperStyle={{
        left: { borderWidth: 0 },
        right: { borderWidth: 0 },
      }}
      bottomContainerStyle={{
        left: { borderWidth: 0, backgroundColor: "white" },
        right: { borderWidth: 0, backgroundColor: "white" },
      }}
      containerToNextStyle={{
        right: { backgroundColor: "#7F3DFF" },
        left: { backgroundColor: "#EDEDED" },
      }}
      containerToPreviousStyle={{
        left: { borderColor: "transparent", borderWidth: 4 },
        right: { borderColor: "#7F3DFF", borderWidth: 4 },
      }}
    />
  );

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      containerStyle={{ backgroundColor: "green" }}
      wrapperStyle={{ borderWidth: 10, borderColor: "white" }}
      textStyle={{ color: "crimson", fontWeight: "900" }}
    />
  );

  const renderMessage = (props) => (
    <Message
      {...props}
      // renderDay={() => <Text>Date</Text>}
    />
  );

  const renderMessageText = (props) => (
    <MessageText
      {...props}
      containerStyle={{
        right: { backgroundColor: "#7F3DFF", borderRadius: 0 },
        left: { backgroundColor: "#EDEDED" },
      }}
      textStyle={{
        left: { color: "#505066" },
        right: { color: "#FFFFFF" },
      }}
      // linkStyle={{
      //   left: { color: "orange" },
      //   right: { color: "orange" },
      // }}
      customTextStyle={{ fontSize: 14, lineHeight: 24 }}
    />
  );

  const renderCustomView = ({ user }) => (
    <View style={{ minHeight: 20, alignItems: "center" }}>
      <Text>
        Current user:
        {user.name}
      </Text>
      <Text>From CustomView</Text>
    </View>
  );
  return (
    <Screen>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        messagesContainerStyle={{ backgroundColor: "#FFFFFF" }}
        renderComposer={renderComposer}
        renderSend={renderSend}
        bottomOffset={0}
        scrollToBottom
        user={{
          _id: userId,
        }}
        renderAvatarOnTop
        infiniteScroll
        timeTextStyle={{
          left: { color: "#505066" },
          right: { color: "#505066" },
        }}
      />
    </Screen>
  );
}
