import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Icon,
  ChevronLeftIcon,
  Button,
  Text,
  Box,
  AspectRatio,
  Avatar,
  HStack,
  Heading,
  Spacer,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../../components/shared/Screen";
import i18n from "../../i18n";
import { BookListVertical } from "../../components/shared/BookListVertical";
import { LoadingOverlay } from "../../components/shared/LoadingOverlay";
import { BorderedBookListVertical } from "../../components/shared/BorderedBookListVertical";
import { fetchUserProfileData } from "@/services/profile/profile.service";
import { IMAGE_FALLBACKS } from "@/constants/image";

const AddBookToProposalButton = ({ onPress }) => (
  <Icon
    onPress={onPress}
    name={"add-circle"}
    variant="solid"
    size="2xl"
    color="primary.100"
    as={MaterialIcons}
  />
);

export default function OtherLibraryScreen({ navigation, route }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userLibraryList, setUserLibraryList] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const { params } = route;
  const user = params?.user;

  const addBookToProposalButton = (book) => (
    <AddBookToProposalButton
      onPress={() => {
        navigation.navigate({
          name: "SwapOfferProposal",
          params: { requestedBook: book },
          merge: true,
        } as any);
      }}
    />
  );
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const profileData = await fetchUserProfileData(user.firebase_uid);
      setUserLibraryList(profileData.libraryBook || []); // Ensure this is always an array
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [route?.params])
  );

  useEffect(() => {
    // Trigger initial fetch when the component mounts
    fetchProfileData();
  }, []);


  return (
    <Screen>
      {/* <Box flexDirection="row" alignItems="center" m="3">
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <AspectRatio w="50px" ratio={1} marginRight={2}>
          <Avatar source={profilePhoto} size="50" />
        </AspectRatio>
        <Text fontWeight="500" fontSize="18">
          {i18n.t("users-library", { user: user.name })}
        </Text>
      </Box> */}
      <HStack
        alignItems="center"
        justifyContent="flex-start" // Aligns items to the left
        w="100%"
        h="60px"
        space={2} // Optional: Adds a small space between items
      >
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        />
        <Avatar source={IMAGE_FALLBACKS.USER_AVATAR} size="50" />
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
          onPrimaryAction={addBookToProposalButton}
        />
        // <BorderedBookListVertical
        // data={userLibraryList}
        // onDonePress={addBookToProposalButton}
        // listType={"listType"}/>
      )}
    </Screen>
  );
}
