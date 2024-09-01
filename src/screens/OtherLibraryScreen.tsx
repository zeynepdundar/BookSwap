import {
  Center,
  Heading,
  Icon,
  Fab,
  ArrowBackIcon,
  Button,
  Spacer,
  HStack,
  Text,
  Divider,
  VStack,
  Box,
  AspectRatio,
  Avatar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useCallback, useEffect, useState } from "react";
import Screen from "../components/Screen";
import i18n from "../i18n";
import { BookListVertical } from "../components/shared/BookListVertical";
import { fetchUserProfileData } from "../api/service";

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
  const navigationState = useNavigationState((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [userLibraryList, setUserLibraryList] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const { params } = route;
  const user = params?.user;
  const onDataReceived = params?.onDataReceived;

  // const addBookToProposalButton = (book) => (
  //   <AddBookToProposalButton
  //     onPress={() => {
  //       if (onDataReceived && typeof onDataReceived === "function") {
  //         onDataReceived(book);
  //       }
  //       navigation.goBack();
  //     }}
  //   />
  // );

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
      {userLibraryList.length === 0 && (
        <VStack width="100%" height={200} mt="100">
          <Center>
            <Icon
              name={"bookmark"}
              color="primary.100"
              variant="solid"
              size="lg"
              as={MaterialIcons}
            />

            <Text fontSize="md">{i18n.t("no-books-in-your-library-yet")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />

            <Text textAlign="center" mx="30" fontWeight="200">
              {i18n.t("add-books-to-your-library-to-swap-books")}
            </Text>
          </Center>
        </VStack>
      )}

      {userLibraryList.length > 0 && (
        <BookListVertical
          data={userLibraryList}
          onPrimaryAction={addBookToProposalButton}        />
      )}
    </Screen>
  );
}
