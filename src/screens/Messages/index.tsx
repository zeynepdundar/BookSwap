import React, { useEffect, useLayoutEffect, useState } from "react";

import Screen from "../../components/Screen";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Spacer,
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
  truncateText,
} from "../../utils/helper";
import { fetchUserProfileData } from "../../api/service";
import { resetUnseenCount } from "../../store/messages-actions";

export default function MessagesScreen({ navigation }) {
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const { messages, loading: isMessagesLoading } =
    useMessageSubscription(firebaseUserId);

  const fetchUserProfiles = async () => {
    try {
      const userIds = messages.map((message) => message.userId);
      const userProfilesPromises = userIds.map((userId) =>
        fetchUserProfileData(userId).then((userProfile) => ({
          ...userProfile,
          userId: userId,
        }))
      );
      const fetchedUserProfiles = await Promise.all(userProfilesPromises);

      const newUserProfiles = fetchedUserProfiles.reduce((acc, userProfile) => {
        const { userId, name, imageData } = userProfile;
        acc[userId] = { userId, name, imageData };
        return acc;
      }, {});

      setUserProfiles(newUserProfiles);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    } finally {
      setIsFetchingUserData(false);
    }
  };

  useEffect(() => {
    if (!isMessagesLoading) {
      fetchUserProfiles();
    }
  }, [messages, isMessagesLoading]);

  if (isFetchingUserData || isMessagesLoading) {
    return <LoadingOverlay />;
  }

  const handleStartChat = (friend) => {
    const conversationId = generateConversationId(
      friend.userId,
      firebaseUserId
    );
    handleResetUnseenCount(friend.userId, firebaseUserId);

    navigation.navigate("ChatScreen", {
      conversationId: conversationId,
      friend: friend,
      currentUserId: firebaseUserId,
    });
  };

  const handleResetUnseenCount = (friendUserId, firebaseUserId) => {
    resetUnseenCount({ friendUserId, firebaseUserId });
  };

  const profilePhoto = require("../../assets/images/lalo-salamanca.png");

  return (
    <Screen>
      <Center w="100%" h="40px">
        <Heading>{i18n.t("messages")}</Heading>
      </Center>
      {messages?.length > 0 && (
        <FlatList
          w="100%"
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const friendProfile = userProfiles[item.userId];
            return (
              // renderItem={({ item }) => (
              <Pressable onPress={() => handleStartChat(friendProfile)}>
                <Box pl="4" pr="5" py="2">
                  <HStack alignItems="center" space={3}>
                    {/* <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  /> */}
                    <Avatar source={profilePhoto} size="48px" />

                    <VStack>
                      <Text color="coolGray.800" fontSize="md">
                        {/* {item.fullName} */}
                        {friendProfile?.name || "Unknown User"}
                      </Text>
                      <Text color="coolGray.500" fontSize="sm">
                        {truncateText(item.lastMessageText, 26)}
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                      <Text
                        fontSize="xs"
                        color="coolGray.500"
                        alignSelf="flex-start"
                      >
                        {formatLastMessageTime(item.lastMessageTime)}
                      </Text>
                      {item.unseenCount > 0 && (
                        <Badge
                          bg="primary.50"
                          rounded="5"
                          zIndex={1}
                          variant="solid"
                          alignSelf="flex-end"
                          _text={{
                            fontSize: 12,
                          }}
                        >
                          {item.unseenCount}
                        </Badge>
                      )}
                    </VStack>
                  </HStack>
                  <Divider my="2"></Divider>
                </Box>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.conversationId}
        />
      )}
    </Screen>
  );
}
