import { useEffect, useState } from "react";

import Screen from "@/components/ui/Screen";
import ScreenHeader from "@/components/ui/ScreenHeader";
import {
  Badge,
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import i18n from "@/i18n";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { useMessageSubscription } from "@/hooks/useMessageSubscription";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import {
  formatLastMessageTime,
  generateConversationId,
  getImageSource,
  truncateText,
} from "@/utils/helper";
import { RootState } from "@/store/types";
import { resetUnseenCount } from "@/store/messages/messages-actions";
import { fetchUserProfileData } from "@/services/profile/profile.service";
import { IMAGE_FALLBACKS } from "@/constants/image";

export default function MessagesScreen({ navigation }) {
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});

  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const { loading: isMessagesLoading, messages } =
    useMessageSubscription(firebaseUserId);

  const profileData = useSelector((state: RootState) => state.profile.profile);
  const { languagePreference } = profileData;

  const fetchUserProfiles = async () => {
    try {
      if (!messages?.length) {
        setIsFetchingUserData(false);
        return;
      }

      const userIds = messages.map((m) => m.userId);

      const results = await Promise.all(
        userIds.map((userId) =>
          fetchUserProfileData(userId).then((profile) => ({
            ...profile,
            userId,
          }))
        )
      );

      const map = results.reduce((acc, user) => {
        acc[user.userId] = user;
        return acc;
      }, {});

      setUserProfiles(map);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingUserData(false);
    }
  };

  useEffect(() => {
    if (!isMessagesLoading) {
      fetchUserProfiles();
    }
  }, [messages, isMessagesLoading]);

  if (!firebaseUserId || isFetchingUserData || isMessagesLoading) {
    return <LoadingOverlay />;
  }

  const handleResetUnseenCount = (friendUserId, firebaseUserId) => {
    resetUnseenCount({ friendUserId, firebaseUserId });
  };

  const handleStartChat = (friend) => {
    const conversationId = generateConversationId(
      friend.userId,
      firebaseUserId
    );

    handleResetUnseenCount(friend.userId, firebaseUserId);

    navigation.navigate("ChatScreen", {
      conversationId,
      friend,
    });
  };

  return (
    <Screen full>
      <ScreenHeader title={i18n.t("messages")} />

      {!messages?.length ? (
        <VStack flex={1} px={6} justifyContent="center" alignItems="center" space={4}>
          <Box
            w="64px"
            h="64px"
            rounded="full"
            bg="primary.50"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={MaterialIcons}
              name="chat-bubble-outline"
              size="lg"
              color="primary.500"
            />
          </Box>

          <Text
            fontSize="lg"
            color="gray.900"
            textAlign="center"
            fontFamily="poppins-medium"
          >
            {i18n.t("no-messages-yet")}
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
            textAlign="center"
            px={8}
          >
            {i18n.t("check-book-offers-to-get-started")}
          </Text>

          <Button
            onPress={() =>
              navigation.navigate("HomeTabs", {
                screen: "Swaps",
                params: { screen: "Received" },
              })
            }
            variant="primary"
            rounded="full"
            mt={4}
          >
            {i18n.t("browse-offers")}
          </Button>
        </VStack>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.conversationId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 24,
            paddingHorizontal: 24, // ✅ consistent system
          }}
          ItemSeparatorComponent={() => (
            <Divider ml={16} bg="gray.200" />
          )}
          renderItem={({ item }) => {
            const friend = userProfiles[item.userId] ?? {
              userId: item.userId,
            };

            const isUnread = item.unseenCount > 0;

            return (
              <Pressable
                onPress={() => handleStartChat(friend)}
                _pressed={{ bg: "gray.50" }}
                rounded="lg"
              >
                <Flex
                  direction="row"
                  alignItems="center"
                  py={3.5}
                >
                  {/* Avatar */}
                  <Image
                    source={getImageSource(
                      friend?.imageData,
                      IMAGE_FALLBACKS.USER_AVATAR
                    )}
                    alt="Profile Image"
                    size={12}
                    rounded="full"
                  />

                  {/* Content */}
                  <VStack flex={1} ml={3} space={0.5}>
                    <Text
                      fontSize="md"
                      fontFamily={
                        isUnread ? "poppins-semi-bold" : "poppins-medium"
                      }
                      color="gray.900"
                      numberOfLines={1}
                    >
                      {friend?.name ?? i18n.t("user")}
                    </Text>

                    <Text
                      fontSize="sm"
                      color="gray.500"
                      numberOfLines={1}
                    >
                      {item.lastMessageIsMine && (
                        <Text fontFamily="poppins-semi-bold" color="gray.700">
                          {i18n.t("you")}:{" "}
                        </Text>
                      )}
                      {truncateText(item.lastMessageText, 32)}
                    </Text>
                  </VStack>

                  {/* Right side */}
                  <VStack
                    alignItems="flex-end"
                    justifyContent="center"
                    ml={3}
                    minW="52px"
                    space={1}
                  >
                    <Text
                      fontSize="xs"
                      color={isUnread ? "primary.500" : "gray.400"}
                      fontFamily={
                        isUnread ? "poppins-semi-bold" : "poppins-regular"
                      }
                    >
                      {formatLastMessageTime(
                        item.lastMessageTime,
                        languagePreference
                      )}
                    </Text>

                    {isUnread && (
                      <Badge
                        bg="primary.500"
                        rounded="full"
                        minW="22px"
                        h="22px"
                        alignItems="center"
                        justifyContent="center"
                        px={0}
                        _text={{
                          fontSize: 11,
                          color: "white",
                          fontFamily: "poppins-bold",
                          textAlign: "center",
                          lineHeight: 14,
                        }}
                      >
                        {item.unseenCount > 99 ? "99+" : item.unseenCount}
                      </Badge>
                    )}
                  </VStack>
                </Flex>
              </Pressable>
            );
          }}
        />
      )}
    </Screen>
  );
}