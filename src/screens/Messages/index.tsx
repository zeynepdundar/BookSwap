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
import { formatLastMessageTime, truncateText } from "../../utils/helper";

export default function MessagesScreen({ navigation }) {
  const { id, firebaseUserId } = useSelector((state: any) => state.auth.user);
  const [messages, setMessages] = useState([]);

  const handlePress = (friendId) => {
    navigation.navigate("ChatScreen", {
      userId: firebaseUserId,
      friendId: friendId,
    });
  };

  const { subscribeToMessages, isLoading } = useMessageSubscription(
    firebaseUserId,
    setMessages
  );

  useLayoutEffect(() => {
    const unsubscribe = subscribeToMessages();

    return () => unsubscribe();
  }, [firebaseUserId, setMessages]);

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
      {isLoading && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <LoadingOverlay />
        </Box>
      )}
      {messages.length > 0 && !isLoading && (
        <FlatList
          w="100%"
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                handlePress(item.userId)
              }
            >
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
                      {/* {item.fullName} */} Lalo Salamanco
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
          )}
          keyExtractor={(item) => item.conversationId}
        />
      )}
    </Screen>
  );
}
