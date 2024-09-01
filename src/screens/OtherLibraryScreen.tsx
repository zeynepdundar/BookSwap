import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Icon,
  ArrowBackIcon,
  Button,
  Text,
  Box,
  AspectRatio,
  Avatar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import i18n from "../i18n";
import { BookListVertical } from "../components/shared/BookListVertical";
import { fetchUserProfileData } from "../api/service";
import { LoadingOverlay } from "../components/LoadingOverlay";

const AddBookToProposalButton = ({ onPress }) => (
  <Icon
    onPress={onPress}
    name={"add-circle"}
    variant="solid"
    size="md"
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
  const onDataReceived = params?.onDataReceived;

  const addBookToProposalButton = (book) => (
    <AddBookToProposalButton
      onPress={() => {
        if (onDataReceived && typeof onDataReceived === "function") {
          onDataReceived(book);
        }
        navigation.goBack();
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

  const profilePhoto = require("../assets/images/lalo-salamanca.png");

  return (
    <Screen>
      {/* <HStack
        alignItems="center"
        space="20%"
        justifyContent="space-between"
        w="100%"
        h={16}
      >
        <Button
          variant="ghost"
          leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <Heading>{i18n.t("my-library")}</Heading>
        <Spacer></Spacer>
      </HStack> */}
      <Box flexDirection="row" alignItems="center" m="3">
        <Button
          variant="ghost"
          leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
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
      </Box>

      {loading && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <LoadingOverlay />
        </Box>
      )}
      {userLibraryList.length > 0 && (
        <BookListVertical
          data={userLibraryList}
          onPrimaryAction={addBookToProposalButton}
        />
      )}
    </Screen>
  );
}
