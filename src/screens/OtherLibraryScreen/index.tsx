import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Icon,
  ChevronLeftIcon,
  Button,
  Text,
  Box,
  Avatar,
  HStack,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../../components/ui/Screen";
import i18n from "../../i18n";
import { BookListVertical } from "../../components/ui/BookListVertical";
import { LoadingOverlay } from "../../components/ui/LoadingOverlay";
import { fetchUserProfileData } from "@/services/profile/profile.service";
import { IMAGE_FALLBACKS } from "@/constants/image";
import { useAppToast } from "@/hooks/useAppToast";

const AddBookToProposalButton = ({ onPress }) => (
  <Pressable onPress={onPress} hitSlop={10}>
    <Icon
      name="add-circle"
      size="2xl"
      color="primary.100"
      as={MaterialIcons}
    />
  </Pressable>
);

export default function OtherLibraryScreen({ navigation, route }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userLibraryList, setUserLibraryList] = useState([]);
  const toast = useAppToast();

  const { params } = route;
  const user = params?.user;

  const renderAddBookButton = useCallback((book) => (
    <AddBookToProposalButton
      onPress={() => {
        navigation.navigate({
          name: "SwapOfferProposal",
          params: { requestedBook: book },
          merge: true,
        } as any);
      }}
    />
  ), [navigation]);
  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);

      const profileData = await fetchUserProfileData(user.firebase_uid);

      setUserLibraryList(profileData.libraryBook || []);
    }
    catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : i18n.t("something-went-wrong")
      );
    }
    finally {
      setLoading(false);
    }
  }, [user.firebase_uid]);

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [fetchProfileData])
  );

  return (
    <Screen>
      <HStack
        alignItems="center"
        w="100%"
        h="60px"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            as={MaterialIcons}
            name="chevron-left"
            size="8"
            color="black.100"
          />
        </Pressable>

        <Text fontWeight="500" fontSize="18">
          {i18n.t("users-library", { user: user.name })}
        </Text>
      </HStack>

      {loading && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <LoadingOverlay />
        </Box>
      )}
      {!loading && userLibraryList.length > 0 && (
        <BookListVertical
          data={userLibraryList}
          onPrimaryAction={renderAddBookButton} />
      )}
    </Screen>
  );
}
