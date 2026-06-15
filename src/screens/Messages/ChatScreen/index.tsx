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

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "@react-native-firebase/firestore";
import {
  ChevronLeftIcon,
  Avatar,
  Button,
  Heading,
  Icon,
  Text,
  View,
  Box,
  HStack,
  Image,
  Flex,
  Divider,
} from "native-base";
import Screen from "@/components/ui/Screen";
import { ActionSheet } from "@/components/ui/ActionSheet";
import { generateModalActions } from "@/utils/helper";
import i18n from "@/i18n";
import BlockUserModal from "@/components/Modal/BlockUserModal";
import { useSelector } from "react-redux";
import { initializeConversation, updateLastMessage } from "@/store/messages/messages-actions";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [actions, setActions] = useState([]);
  const { firebaseUserId: currentUserId } = useSelector(
    (state: any) => state.auth.user
  );

  const { conversationId, friend } = route.params;

  const handleUpdateLastMessage = (messageData) => {
    console.log("💬 Updating last message for friend:", friend.userId);
    updateLastMessage({
      friendUserId: friend.userId,
      currentUserId,
      messageData,
    });
  };

  useLayoutEffect(() => {
    // Initialize conversation if it doesn't exist
    initializeConversation(currentUserId, friend.userId, friend);

    const subscriber = onSnapshot(
      query(
        collection(getFirestore(), "Conversations", conversationId, "messages"),
        orderBy("createdAt", "desc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().senderId,
          },
        }));

        setMessages(messages);

        // Get the latest message (first in the ordered list)
        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[0];
          const latestMessage = {
            text: latestDoc.data().text,
            createdAt: latestDoc.data().createdAt.toDate(),
            senderId: latestDoc.data().senderId,
          };

          // Update the latest message in the Users collection
          handleUpdateLastMessage(latestMessage);
        }
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    if (messages.length === 0) return;

    const newMessage = messages[0];
    const messageData = {
      createdAt: Timestamp.now(),
      text: newMessage.text,
      senderId: currentUserId,
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    addDoc(
      collection(getFirestore(), "Conversations", conversationId, "messages"),
      messageData
    )
      .then(() => {
        // Update last message in the conversation only if Firestore operation is successful
        handleUpdateLastMessage(messageData);
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
          backgroundColor: "#fff",
          paddingTop: 6,
          borderTopColor: "transparent",
        }}
        primaryStyle={{ alignItems: "center" }}
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
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
    >
      <Icon
        size="32px"
        color="primary.500"
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
      <View {...props} style={{ bg: "amber.100" }}>
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
      containerStyle={{
        left: {
          borderColor: "teal",
          borderWidth: 0,
          marginLeft: -40,
          alignItems: "flex-start",
        },
        right: {
          borderColor: "teal",
          borderWidth: 0,
          marginRight: 0,

          alignItems: "flex-end",
        },
      }}
      wrapperStyle={{
        left: {
          borderWidth: 0,
          backgroundColor: "#EDEDED",
        },
        right: {
          borderWidth: 0,
          backgroundColor: "#7F3DFF",
        },
      }}
      bottomContainerStyle={{
        left: {
          borderWidth: 0,
          backgroundColor: "white",
        },
        right: {
          borderWidth: 0,
          backgroundColor: "white",
        },
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
          padding: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 12,
          marginBottom: 2,
        },
        left: {
          backgroundColor: "#EDEDED",
          padding: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 3,
          marginBottom: 2,
        },
      }}
      textStyle={{
        left: {
          color: "#505066",
          fontSize: 14,
        },
        right: {
          color: "#FFFFFF",
          fontSize: 14,
        },
      }}
      customTextStyle={{
        fontSize: 14,
        lineHeight: 24,
      }}
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
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] =
    useState<boolean>(false);

  const ChatHeaderBar = ({ title, avatarUri, onBackPress, onOptionsPress }) => {
    return (
      <>
        <Flex
          direction="row"
          justifyContent="space-between"
          w="100%"
          alignSelf="center"
          alignItems="center"
          py={1}
        >
          <Button
            backgroundColor="transparent"
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="#212325" />}
            _pressed={{ bg: "transparent" }}
            onPress={onBackPress}
          />
          <Box
            size={12}
            rounded="full"
            backgroundColor="#e0e0e0"
            overflow="hidden"
          >
            {avatarUri && (
              <Image
                source={{ uri: avatarUri }}
                alt="Profile Image"
                size={12}
                rounded="full"
              />
            )}
          </Box>
          <Heading pl="3" width="56%">
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
            py={1}
            px={4}
          />
        </Flex>
        <Divider ml="-15" width="110%" bg="#EEEEEE" />
      </>
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
    //   addBookToCollectionsAsync({ ...edition, type: actionType })
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
    <Screen>
      <ChatHeaderBar
        title={friend.name}
        avatarUri={friend.imageData}
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
        listViewProps={{ showsVerticalScrollIndicator: false }}
        user={{
          _id: currentUserId,
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
