import React, { useEffect, useLayoutEffect, useState } from "react";

import Screen from "../../components/Screen";
import {
  Avatar,
  Badge,
  Box,
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
  createConversationId,
  formatLastMessageTime,
  truncateText,
} from "../../utils/helper";
import { fetchUserProfileData } from "../../api/service";

export default function MessagesScreen({ navigation }) {
  const { id, firebaseUserId } = useSelector((state: any) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true); // Track overall loading state

  const [userData, setUserData] = useState({}); // To store fetched user details
  const { messages, loading: messagesLoading } =
    useMessageSubscription(firebaseUserId);
  // Fetch user details for all messages at once
  const fetchUserData = async () => {
    if (!messages || messages.length === 0) {
      setIsLoading(false); // No messages, so no need to load user data
      return;
    }

    try {
      const userIds = messages.map((message) => message.userId);
      console.log("Loading",messages)
      const userDetailsPromises = userIds.map((userId) =>
        fetchUserProfileData(userId).then((userProfile) => ({
          ...userProfile,
          userId: userId,
        }))
      );
      const userDetailsArray = await Promise.all(userDetailsPromises);

      const newUserData = userDetailsArray.reduce((acc, userProfile) => {
        const { userId, name, imageData } = userProfile;
        acc[userId] = { userId, name, imageData };
        return acc;
      }, {});

      setUserData(newUserData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    // Fetch user data when messages are loaded and not loading
    if (!messagesLoading) {
      fetchUserData();
    }
  }, [messages, messagesLoading]); // Run effect when messages or messagesLoading change

  if (isLoading || messagesLoading) {
    return <LoadingOverlay />; // Show the spinner while loading either messages or user data
  }
  const handlePress = (friendData) => {
    const conversationId = createConversationId(friendData.userId, firebaseUserId);

    navigation.navigate("ChatScreen", {
      conversationId: conversationId,
      user: friendData,
    });
  };
//   if (!messagesLoading) {
//     fetchAllUserData();
//   }
// }, [messages, messagesLoading]); // Run effect when messages or messagesLoading change

// if (isLoading || messagesLoading) {
//   return <LoadingSpinner />; // Show the spinner while loading either messages or user data
// }


  const profilePhoto = require("../../assets/images/lalo-salamanca.png");

  return (
    <Screen>
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="center"
        w="100%"
        h={16}
      >
        <Heading>{i18n.t("messages")}</Heading>
      </HStack>
      {/* {messagesLoading && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <LoadingOverlay />
        </Box>
      )} */}
      {messages?.length > 0 && !messagesLoading && (
        <FlatList
          w="100%"
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const user = userData[item.userId];
            console.log("user",item, user)
            return (
              // renderItem={({ item }) => (
              <Pressable onPress={() => handlePress(user)}>
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
                        {/* {item.fullName} */} {user?.name || "Unknown User"}
                      </Text>
                      <Text color="coolGray.500" fontSize="sm">
                        {truncateText(item.lastMessageText, 20)}
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
