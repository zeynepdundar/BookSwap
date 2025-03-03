import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import {
  Badge,
  Box,
  Center,
  Divider,
  FlatList,
  Flex,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import i18n from "../../i18n";
import { useSelector } from "react-redux";
import { useMessageSubscription } from "../../hooks/use-message-subscription";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import {
  formatLastMessageTime,
  generateConversationId,
  getImageSource,
  truncateText,
} from "../../utils/helper";
import { resetUnseenCount } from "../../store/messages-actions";
import { RootState } from "../../store/types";
import { fetchUserProfileData } from "../../api/service";
import { Message, UserProfile } from "../../models/Message";

interface MessageListItemProps {
  item: Message;
  userProfile: UserProfile;
  onPress: () => void;
}
const MessageListItem: React.FC<MessageListItemProps> = ({
  item,
  userProfile,
  onPress,
}) => {
  const avatar = require("../../assets/images/avatar.png");
  const { languagePreference } = useSelector(
    (state: RootState) => state.profile.profile
  );

  return (
    <Pressable onPress={onPress}>
      <Flex
        direction="row"
        justifyContent="space-between"
        w="95%"
        alignSelf="center"
        p={1}
      >
        <Box
          size={12}
          rounded="full"
          backgroundColor="#e0e0e0"
          overflow="hidden"
        >
          <Image
            source={getImageSource(userProfile?.profilePicture, avatar)}
            alt={`${userProfile?.username || "User"}'s Profile Image`}
            accessibilityLabel={`${userProfile?.username || "User"}'s Profile Image`}
            size={12}
            rounded="full"
            fallbackSource={avatar}
          />
        </Box>
        <VStack width="62%" px="0">
          <Text color="coolGray.800" fontSize="md">
            {userProfile?.username || "Unknown User"}
          </Text>
          <Text color="coolGray.500" fontSize="sm">
            {truncateText(item.lastMessageText, 26)}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
          <Text fontSize="xs" color="coolGray.500" alignSelf="flex-end">
            {formatLastMessageTime(item.lastMessageTime, languagePreference)}
          </Text>
          {item.unseenCount > 0 && (
            <Badge
              bg="primary.50"
              rounded="5"
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{ fontSize: 12 }}
            >
              {item.unseenCount}
            </Badge>
          )}
        </VStack>
      </Flex>
      <Divider my="2" />
    </Pressable>
  );
};

export default function MessagesScreen({ navigation }) {
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const { loading: isMessagesLoading, messages } =
    useMessageSubscription(firebaseUserId);

  const profileData = useSelector((state: RootState) => state.profile.profile);

  const { languagePreference } = profileData;

  const unseenMessagesCount =
    messages?.reduce((total, item) => total + item.unseenCount, 0) || 0;

  const fetchUserProfiles = async () => {
    try {
      if (!messages?.length) {
        setIsFetchingUserData(false);
        return;
      }

      const userIds = messages.map((message) => message.userId);
      const fetchedUserProfiles = await Promise.all(
        userIds.map(async (userId) => {
          const userProfile = await fetchUserProfileData(userId);
          return { ...userProfile, userId };
        })
      );

      setUserProfiles(
        fetchedUserProfiles.reduce((acc, profile) => {
          const { userId, username, profilePicture }: UserProfile = profile;
          acc[userId] = { userId, username, profilePicture };
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    } finally {
      setIsFetchingUserData(false);
    }
  };

  useEffect(() => {
    if (!isMessagesLoading && messages?.length > 0) {
      fetchUserProfiles();
    } else {
      setIsFetchingUserData(false);
    }
  }, [isMessagesLoading, messages]);

  const handleStartChat = (friend) => {
    const conversationId = generateConversationId(
      friend.userId,
      firebaseUserId
    );
    handleResetUnseenCount(friend.userId, firebaseUserId);

    navigation.navigate("ChatScreen", {
      conversationId: conversationId,
      friend: friend,
    });
  };

  const handleResetUnseenCount = (friendUserId, firebaseUserId) => {
    resetUnseenCount({ friendUserId, firebaseUserId });
  };

  return (
    <Screen>
      <Center w="100%" h="50px">
        <Heading>{i18n.t("messages")}</Heading>
      </Center>
      {isMessagesLoading || isFetchingUserData ? (
        <LoadingOverlay />
      ) : (
        <>
          {(!messages || messages.length === 0) && <EmptyMessageState />}

          {messages?.length > 0 && (
            <FlatList
              w="100%"
              data={messages.sort(
                (a, b) => b.lastMessageTime - a.lastMessageTime
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <MessageListItem
                  item={item}
                  userProfile={userProfiles[item.userId]}
                  onPress={() => handleStartChat(userProfiles[item.userId])}
                />
              )}
              keyExtractor={(item) => item.conversationId}
            />
          )}
        </>
      )}
    </Screen>
  );
}

const EmptyMessageState = () => (
  <VStack width="100%" height="100%" pt="100">
    <Center mt="48px">
      <Text fontSize="md" textAlign="center">
        {i18n.t("check-offers-and-begin-chatting")}
      </Text>
    </Center>
    <Center w="100%">
      <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
      <Text textAlign="center" mx="30" fontWeight="200">
        {i18n.t("you-have-not-receive-any-message")}
      </Text>
    </Center>
  </VStack>
);
