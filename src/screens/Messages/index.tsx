import  { useEffect, useState } from "react";

import Screen from "@/components/ui/Screen";
import ScreenHeader from "@/components/ui/ScreenHeader";
import {
  Badge,
  Divider,
  FlatList,
  Flex,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import i18n from "@/i18n";
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
<Screen>
  <ScreenHeader title={i18n.t("messages")} />

  {/* EMPTY STATE */}
  {!messages || messages.length === 0 ? (
    <VStack flex={1} justifyContent="center" alignItems="center" px={6}>
      <Text fontSize="md" textAlign="center" color="coolGray.700">
        {i18n.t("check-offers-and-begin-chatting")}
      </Text>

      <Divider w="40%" my={5} bg="coolGray.200" />

      <Text fontSize="sm" textAlign="center" color="coolGray.500">
        {i18n.t("you-have-not-receive-any-message")}
      </Text>
    </VStack>
  ) : (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.conversationId}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 8 }}
      ItemSeparatorComponent={() => (
        <Divider ml={15} bg="coolGray.100" />
      )}
      renderItem={({ item }) => {
        const friendProfile = userProfiles[item.userId];

        return (
          <Pressable onPress={() => handleStartChat(friendProfile)}>
            <Flex
              direction="row"
              alignItems="center"
              py={3}
              bg="transparent"
            >
              {/* Avatar (no box, just image) */}
              <Image
                source={getImageSource(
                  friendProfile.imageData,
                  IMAGE_FALLBACKS.USER_AVATAR
                )}
                alt="Profile Image"
                size={12}
                rounded="full"
              />

              {/* Text content */}
              <VStack flex={1} ml={3} space={0.5}>
                <Text fontSize="md" fontWeight="600" color="coolGray.900">
                  {friendProfile?.name || "Unknown User"}
                </Text>

                <Text fontSize="sm" color="coolGray.500" numberOfLines={1}>
                  {item.lastMessageIsMine && (
                    <Text fontWeight="500" color="coolGray.600">
                      {i18n.t("you")}:{" "}
                    </Text>
                  )}
                  {truncateText(item.lastMessageText, 28)}
                </Text>
              </VStack>

              {/* Right side meta */}
              <VStack alignItems="flex-end" justifyContent="center" space={1.5} ml={2}>
                <Text fontSize="xs" color="coolGray.400">
                  {formatLastMessageTime(
                    item.lastMessageTime,
                    languagePreference
                  )}
                </Text>

                {item.unseenCount > 0 && (
                  <Badge
                    bg="primary.500"
                    rounded="full"
                    px={2}
                    py={0.5}
                    _text={{ fontSize: 11, color: "white" }}
                  >
                    {item.unseenCount}
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
