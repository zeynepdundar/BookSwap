import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import {
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import {
  ArrowBackIcon,
  Avatar,
  Button,
  Heading,
  Icon,
  Text,
  View,
  Box,
  HStack,
  Image,
  Center,
} from "native-base";
import Screen from "../../components/Screen";
import { ActionSheet } from "../../components/ActionSheet";
import {
  generateModalActions,
  reverseConversationId,
} from "../../utils/helper";
import { AlertDialogBox } from "../../components/Modal/AlertDialogBox";
import i18n from "../../i18n";
import BlockUserModal from "../../components/Modal/BlockUserModal";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [actions, setActions] = useState([]);

  const { conversationId, user } = route.params;
  const { userId, friendId } = reverseConversationId(conversationId);

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
      placeholder={i18n.t("text-message")}
      textInputStyle={{
        color: "#222B45",
        backgroundColor: "#EDF1F7",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#E4E9F2",
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginHorizontal: 8,
      }}
    />
  );
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#fff',
        paddingTop: 6,
        borderTopColor: "transparent",

      }}
      primaryStyle={{ alignItems: 'center' }}
    />
    );
  };
  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Icon
        size="32px"
        color="primary.50"
        as={<MaterialIcons name="arrow-circle-up" />}
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
        left: { borderWidth: 0, backgroundColor: "transparent" },
        right: { borderWidth: 0, backgroundColor: "transparent" },
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
        right: {
          backgroundColor: "#7F31FF",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 12,
        },
        left: {
          backgroundColor: "#EDEDED",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 3,
        },
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
  const avatarImage = require("../../assets/images/avatar.png");
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] =
    useState<boolean>(false);

  const ChatHeaderBar = ({ title, avatarUri, onBackPress, onOptionsPress }) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        space={3}
        h={16}
        bg="#fff"
        borderBottomColor="#E8E8E8"
        borderBottomWidth="1"
      >
        <Button
          backgroundColor="transparent"
          variant="ghost"
          leftIcon={<ArrowBackIcon size="6" color="#212325" />}
          _pressed={{ bg: "transparent" }}
          onPress={onBackPress}
        />
        {/* <Avatar borderRadius="full" source={avatarImage}  w="20"/> */}
        <Image
          source={user.imageData ? { uri: user.imageData } : avatarImage}
          alt="Profile Image"
          size={10}
          rounded="full"
        />
        <Heading fontSize="18px" w="206">
          {title}
        </Heading>
        <Button
          backgroundColor="transparent"
          variant="ghost"
          leftIcon={<MaterialIcons name="remove-circle-outline" size={30} />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={onOptionsPress}
        />
      </HStack>
    );
  };
  const handleBackPress = () => {
    // if (navigation.canGoBack()) {
    //   navigation.goBack();
    // } else
    navigation.navigate("Messages");
  };

  const handleAction = async (actionType) => {
    // const response = await dispatch(
    //   addBookToListAsync({ ...edition, type: actionType })
    // );
    // const payload = response.payload;
    // if (payload?.status === "error") {
    //   if (payload.existingEditionIds?.length > 0) {
    //     setError(i18n.t("already-have-book"));
    //   } else {
    //     setError(payload.message);
    //   }
    //   setTimeout(() => {
    //     setError(null);
    //   }, 8000);
    // }
    // closeActionSheet();
  };
  const handleOptionsPress = () => {
    setIsBlockUserModalOpen(true);
    let actions = [
      { type: "WISHLIST", label: "inappropiate-message" },
      { type: "LIBRARY", label: "spam-message" },
      { type: "other", label: "other" },
    ];
    setActions(
      generateModalActions(actions, handleAction, closeBlockUserModal)
    );
  };
  const closeBlockUserModal = () => {
    setIsBlockUserModalOpen(false);
  };

  return (
    <Screen >
      <ChatHeaderBar
        title={user.name}
        avatarUri="https://example.com/avatar.jpg" // Replace with your avatar URL
        onBackPress={handleBackPress}
        onOptionsPress={handleOptionsPress}
      />
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
        infiniteScroll
        timeTextStyle={{
          left: { color: "#505066" },
          right: { color: "#505066" },
        }}
      />
      <BlockUserModal
        isOpen={isBlockUserModalOpen}
        onClose={closeBlockUserModal}
      />
    </Screen>
  );
}
