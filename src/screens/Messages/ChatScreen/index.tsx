import { useState, useCallback, useLayoutEffect } from "react";
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
  Heading,
  Icon,
  Box,
  Image,
  Flex,
  Divider,
  Pressable,
  HStack,
  Text,
} from "native-base";
import Screen from "@/components/ui/Screen";
import { generateModalActions, getImageSource } from "@/utils/helper";
import { IMAGE_FALLBACKS } from "@/constants/image";
import i18n from "@/i18n";
import BlockUserModal from "@/components/Modal/BlockUserModal";
import { useSelector } from "react-redux";
import { initializeConversation, markMessagesAsSeen, updateLastMessage } from "@/store/messages/messages-actions";

// Palette aligned with the app theme (see src/theme): primary purple + the
// neutral "black" scale, so the chat matches the rest of the screens.
const COLORS = {
  primary: "#7F3DFF", // primary.500
  bubbleLeft: "#F2F2F7", // incoming message surface
  inputBg: "#F5F5F7", // composer pill
  border: "#EEEEEE",
  textDark: "#161719", // black.100
  textMuted: "#91919F", // black.200
};

// The accept flow seeds the conversation with a plain-text message in the form
// "Book A <---> Book B". We don't render it as a chat bubble from the accepter;
// instead we detect it and pin a swap card to the top of the chat.
const SWAP_SEPARATOR = "<--->";

const parseSwapMessage = (text?: string) => {
  if (!text || !text.includes(SWAP_SEPARATOR)) return null;
  const [first, second] = text.split(SWAP_SEPARATOR);
  const firstTitle = first?.trim();
  const secondTitle = second?.trim();
  if (!firstTitle || !secondTitle) return null;
  return { firstTitle, secondTitle };
};

// Pinned banner showing the agreed exchange (two book titles), styled to echo
// the swap card on the Received offers screen.
const SwapBanner = ({ firstTitle, secondTitle }) => (
  <Box
    bg="primary.50"
    borderWidth={1}
    borderColor="primary.100"
    rounded="xl"
    px={4}
    py={3}
    mt={3}
    mb={1}
  >
    <HStack alignItems="center" justifyContent="center" space={1.5} mb={2}>
      <Icon as={<MaterialIcons name="swap-horiz" />} size="4" color="primary.500" />
      <Text
        fontSize="xs"
        fontWeight="600"
        color="primary.500"
        letterSpacing={0.5}
        textTransform="uppercase"
      >
        {i18n.t("agreed-swap")}
      </Text>
    </HStack>
    <HStack alignItems="center" space={2}>
      <Text
        flex={1}
        textAlign="center"
        fontSize="sm"
        fontWeight="500"
        color="black.100"
        numberOfLines={2}
      >
        {firstTitle}
      </Text>
      <Icon as={<MaterialIcons name="swap-horiz" />} size="5" color="primary.500" />
      <Text
        flex={1}
        textAlign="center"
        fontSize="sm"
        fontWeight="500"
        color="black.100"
        numberOfLines={2}
      >
        {secondTitle}
      </Text>
    </HStack>
  </Box>
);

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [swapInfo, setSwapInfo] = useState(null);
  const [actions, setActions] = useState([]);
  const { firebaseUserId: currentUserId } = useSelector(
    (state: any) => state.auth.user
  );
  const currentUserName = useSelector(
    (state: any) => state.profile.profile?.name
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
    initializeConversation(currentUserId, friend.userId, friend, currentUserName);

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

        // Pull the seeded "Book A <---> Book B" message out of the bubble list
        // and surface it as a pinned swap card instead.
        const swapMessage = messages.find((message) =>
          parseSwapMessage(message.text)
        );
        setSwapInfo(swapMessage ? parseSwapMessage(swapMessage.text) : null);

        setMessages(
          swapMessage
            ? messages.filter((message) => message._id !== swapMessage._id)
            : messages
        );

        // The current user is viewing this chat, so mark incoming messages as
        // seen. This clears their unseen badge in the list and bottom tab.
        markMessagesAsSeen(conversationId, currentUserId);

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
      // The recipient hasn't seen it yet; this powers their unseen badge.
      seen: false,
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
        color: COLORS.textDark,
        backgroundColor: COLORS.inputBg,
        borderRadius: 22,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
        marginLeft: 12,
        marginRight: 8,
        marginBottom: 4,
        fontSize: 15,
        lineHeight: 20,
        fontFamily: "poppins-regular",
      }}
    />
  );
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#fff",
          paddingVertical: 6,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
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
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginBottom: 4,
      }}
    >
      <Box
        size={9}
        rounded="full"
        bg={props.text ? "primary.500" : "primary.100"}
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          size="20px"
          color={props.text ? "#fff" : "primary.500"}
          as={<MaterialIcons name="send" />}
        />
      </Box>
    </Send>
  );
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: COLORS.bubbleLeft,
          borderRadius: 18,
          borderBottomLeftRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
          marginVertical: 1,
        },
        right: {
          backgroundColor: COLORS.primary,
          borderRadius: 18,
          borderBottomRightRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
          marginVertical: 1,
        },
      }}
      textStyle={{
        left: {
          color: COLORS.textDark,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "poppins-regular",
        },
        right: {
          color: "#FFFFFF",
          fontSize: 14,
          lineHeight: 20,
          fontFamily: "poppins-regular",
        },
      }}
      timeTextStyle={{
        left: { color: COLORS.textMuted, fontSize: 11 },
        right: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
      }}
    />
  );

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      containerStyle={{ backgroundColor: "transparent", marginVertical: 8 }}
      wrapperStyle={{ borderWidth: 0 }}
      textStyle={{
        color: COLORS.textMuted,
        fontSize: 12,
        fontFamily: "poppins-regular",
      }}
    />
  );

  const renderMessage = (props) => <Message {...props} />;

  const [isBlockUserModalOpen, setIsBlockUserModalOpen] =
    useState<boolean>(false);

  const ChatHeaderBar = ({ title, avatarUri, onBackPress, onOptionsPress }) => {
    return (
      <>
        <Flex
          direction="row"
          w="100%"
          alignItems="center"
          py={2}
        >
          <Pressable onPress={onBackPress} p={1} _pressed={{ opacity: 0.5 }}>
            <ChevronLeftIcon size="6" color="black.100" />
          </Pressable>
          <Box
            size={10}
            rounded="full"
            backgroundColor="black.900"
            overflow="hidden"
            ml={1}
          >
            <Image
              source={getImageSource(avatarUri, IMAGE_FALLBACKS.USER_AVATAR)}
              alt="Profile Image"
              size={10}
              rounded="full"
            />
          </Box>
          <Heading size="lg" flex={1} numberOfLines={1} ml={3}>
            {title}
          </Heading>
          <Pressable onPress={onOptionsPress} p={2} _pressed={{ opacity: 0.5 }}>
            <Icon
              as={<MaterialIcons name="more-vert" />}
              size="6"
              color="black.100"
            />
          </Pressable>
        </Flex>
        <Divider mx={-4} bg={COLORS.border} />
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
      {swapInfo && (
        <SwapBanner
          firstTitle={swapInfo.firstTitle}
          secondTitle={swapInfo.secondTitle}
        />
      )}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderBubble={renderBubble}
        renderAvatar={null}
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
          left: { color: COLORS.textMuted },
          right: { color: "rgba(255,255,255,0.7)" },
        }}
      />
      <BlockUserModal
        isOpen={isBlockUserModalOpen}
        onClose={closeBlockUserModal}
      />
    </Screen>
  );
}
