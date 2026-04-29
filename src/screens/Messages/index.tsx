import React, { useEffect, useLayoutEffect, useState } from "react";

import Screen from "../../components/Screen";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  FlatList,
  Flex,
  Heading,
  HStack,
  Image,
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
  getImageSource,
  truncateText,
} from "../../utils/helper";
import { fetchUserProfileData } from "../../api/service";
import { resetUnseenCount } from "../../store/messages-actions";
import { RootState } from "../../store/types";

export default function MessagesScreen({ navigation }) {
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const { loading: isMessagesLoading, messages } =
    useMessageSubscription(firebaseUserId);

  const profileData = useSelector((state: RootState) => state.profile.profile);

  const { languagePreference } = profileData;


  // Safety check for firebaseUserId
  if (!firebaseUserId) {
    return <LoadingOverlay />;
  }

  const unseenMessagesCount =
    messages?.reduce((total, item) => total + item.unseenCount, 0) || 0;

  const fetchUserProfiles = async () => {
    try {
      if (!messages || messages.length === 0) {
        setIsFetchingUserData(false);
        return;
      }

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

  // Return early if data is still loading
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
    });
  };

  const handleResetUnseenCount = (friendUserId, firebaseUserId) => {
    resetUnseenCount({ friendUserId, firebaseUserId });
  };

  const avatar = require("../../assets/images/avatar.png");

  return (
    <Screen>
      <Center w="100%" h="50px">
        <Heading>{i18n.t("messages")}</Heading>
      </Center>
      {!messages ||
        (messages.length === 0 && (
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
        ))}
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
                {/* <Box pl="4" pr="5" py="2" > */}
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
                      source={getImageSource(friendProfile.imageData, avatar)}
                      alt="Profile Image"
                      size={12}
                      rounded="full"
                    />
                  </Box>
                  <VStack width="62%" px="0">
                    <Text color="coolGray.800" fontSize="md">
                      {/* {item.fullName} */}
                      {friendProfile?.name || "Unknown User"}
                    </Text>
                    <Text color="coolGray.500" fontSize="sm">
                      {truncateText(item.lastMessageText, 26)}
                    </Text>
                  </VStack>
                  <VStack alignItems="flex-end">
                    <Text
                      fontSize="xs"
                      color="coolGray.500"
                      alignSelf="flex-end"
                    >
                      {formatLastMessageTime(
                        item.lastMessageTime,
                        languagePreference
                      )}
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
                </Flex>
                <Divider my="2"></Divider>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.conversationId}
        />
      )}
    </Screen>
  );
}
