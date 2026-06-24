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

  // Return early if data is still loading or user id is not ready
  if (!firebaseUserId || isFetchingUserData || isMessagesLoading) {
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


  return (
    <Screen full>
      <ScreenHeader title={i18n.t("messages")} />

      {/* EMPTY STATE */}
      {!messages || messages.length === 0 ? (
        <VStack
          flex={1}
          bg="#fff"
          px="6"
          justifyContent="center"
          alignItems="center"
          space={4}
        >
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
              color="primary.600"
            />
          </Box>

          <Text
            fontSize="18"
            fontWeight="500"
            color="#111827"
            textAlign="center"
          >
            {i18n.t("no-messages-yet")}
          </Text>

          <Text
            fontSize="sm"
            fontWeight="400"
            textAlign="center"
            color="#6B7280"
            px="8"
            lineHeight="20px"
          >
            {i18n.t("check-book-offers-to-get-started")}
          </Text>

          <Button
            onPress={() =>
              navigation.navigate("HomeTabs", {
                screen: "Swaps",
                params: { screen: "Received" }
              })}

            variant="primary"
            rounded="full"
            mt={4}
            px={2}
            py={3}
          >
            {i18n.t("browse")}
          </Button>
        </VStack>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.conversationId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 8,
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
          ItemSeparatorComponent={() => (
            <Divider ml={15} bg="coolGray.100" />
          )}
          renderItem={({ item }) => {
            const friendProfile = userProfiles[item.userId] ?? {
              userId: item.userId,
            };

            const isUnread = item.unseenCount > 0;

            return (
              <Pressable
                onPress={() => handleStartChat(friendProfile)}
                _pressed={{
                  bg: "coolGray.50",
                }}
                rounded="lg"
              >
                <Flex
                  direction="row"
                  alignItems="center"
                  py={3.5}
                  px={1}
                >
                  {/* Avatar */}
                  <Image
                    source={getImageSource(
                      friendProfile?.imageData,
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
                      fontWeight={isUnread ? "700" : "500"}
                      color="coolGray.900"
                      numberOfLines={1}
                    >
                      {friendProfile?.name ?? i18n.t("user")}
                    </Text>

                    <Text
                      fontSize="sm"
                      color={isUnread ? "coolGray.700" : "coolGray.500"}
                      fontWeight={isUnread ? "500" : "400"}
                      numberOfLines={1}
                    >
                      {item.lastMessageIsMine && (
                        <Text
                          fontWeight="600"
                          color="coolGray.700"
                        >
                          {i18n.t("you")}:{" "}
                        </Text>
                      )}

                      {truncateText(item.lastMessageText, 32)}
                    </Text>
                  </VStack>

                  {/* Meta */}
                  <VStack
                    alignItems="flex-end"
                    justifyContent="center"
                    ml={3}
                    minW="52px"
                    space={1.5}
                  >
                    <Text
                      fontSize="xs"
                      color={isUnread ? "primary.500" : "coolGray.400"}
                      fontWeight={isUnread ? "600" : "400"}
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
                        _text={{
                          color: "white",
                          fontSize: 11,
                          fontWeight: "700",
                        }}
                      >
                        {item.unseenCount > 99
                          ? "99+"
                          : item.unseenCount}
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
