import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Center,
  Heading,
  Spacer,
  ChevronLeftIcon,
  Image,
  Box,
  Text,
  Pressable,
  VStack,
  HStack,
  Fab,
  Icon,
  AspectRatio,
  Badge,
  CloseIcon,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { AppDispatch } from "../../store/store";
import { InfoDialogBox } from "../../components/Modal/InfoDialogBox";
import { sendOfferAsync } from "../../store/profile-actions";
import { getImageSource } from "../../utils/helper";

interface TradeProposal {
  receiverId: string;
  offeredBook: any;
  requestedBook: any;
}
export default function TradeProposal({ navigation, route }) {
  const user = route?.params?.data?.user;
  const book = route?.params?.data?.book;

  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const avatar = require("../../assets/images/avatar.png");

  const initialState: TradeProposal = {
    receiverId: user.id,
    offeredBook: null,
    requestedBook: book,
  };

  const [sentPropasal, setSentProposal] = useState<TradeProposal | null>(
    initialState
  );

  const dispatch = useDispatch<AppDispatch>();

  const proposeTradeHandler = async (): Promise<void> => {
    dispatch(sendOfferAsync(sentPropasal));
    setIsInfoDialogOpen(true);
  };

  const tradeIcon = require("../../assets/images/icon/trade-icon.png");

  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  useEffect(() => {
    // Check if either offeredBook or requestedBook is null
    if (sentPropasal?.offeredBook && sentPropasal?.requestedBook) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [sentPropasal]);

  let title, description, buttonVariant, confirmButtonLabel, navigateToScreen;

  title = i18n.t("the-offer-sent");
  description = i18n.t("see-sent-offers-description");
  buttonVariant = "outline";
  confirmButtonLabel = i18n.t("see-my-offers");
  navigateToScreen = () => navigation.navigate("Trading", { screen: "Sent" });

  return (
    <Screen>
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="space-between"
        w="100%"
        h="50px"
      >
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        />
        <Heading>{i18n.t("trade-proposal")}</Heading>
        <Spacer></Spacer>
      </HStack>
      <VStack>
        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-give")}
          </Text>
          <Center
            p="2"
            borderWidth="1"
            borderRadius="10"
            width="100%"
            borderColor="#EEEEEE"
            shadow={0.9}
            height="200"
            overflow="hidden"
          >
            <Center
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              shadow={0.9}
              width="43%"
              height="180"
              overflow="hidden"
            >
              {sentPropasal?.offeredBook && (
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image
                        source={
                          sentPropasal.offeredBook.coverUrl
                            ? { uri: sentPropasal.offeredBook.coverUrl }
                            : {
                                //TODO Use the static import URL here
                                uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                              }
                        }
                        alt={`Cover of`}
                      />
                    </AspectRatio>
                    <Pressable
                      onPress={() =>
                        setSentProposal((prevProposal) => ({
                          ...prevProposal,
                          offeredBook: null,
                        }))
                      }
                      position="absolute"
                      right={0}
                      top={0}
                    >
                      <Badge
                        rounded="100"
                        width={7}
                        height={7}
                        bg="rgba(140, 140, 140, 0.7)"
                      >
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text
                    w={100}
                    textAlign="center"
                    fontSize={11}
                    numberOfLines={2}
                  >
                    {sentPropasal.offeredBook.title}
                  </Text>
                </>
              )}
              {!sentPropasal.offeredBook && (
                <Fab
                  onPress={() => {
                    navigation.navigate("ProfileStack", {
                      screen: "Library",
                      params: {
                        data: "TradeProposal",
                        onDataReceived: (data) =>
                          setSentProposal((prevProposal) => ({
                            ...prevProposal,
                            offeredBook: data,
                          })),
                      },
                    });
                  }}
                  renderInPortal={false}
                  shadow={2}
                  size="9"
                  mr="7"
                  mb="12"
                  bgColor="primary.50"
                  icon={
                    <Icon
                      color="white"
                      as={MaterialIcons}
                      name="add"
                      size="md"
                    />
                  }
                />
              )}
            </Center>
          </Center>
        </Box>
        <Image source={tradeIcon} alt=" Library" mt="4" alignSelf="center" />

        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-receive")}
          </Text>
          <Center
            p="2"
            borderWidth="1"
            borderRadius="10"
            width="100%"
            borderColor="#EEEEEE"
            shadow={0.9}
            height="200"
            overflow="hidden"
          >
            <Center
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              shadow={0.9}
              width="43%"
              height="180"
              overflow="hidden"
            >
              {sentPropasal?.requestedBook && (
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image
                        source={
                          sentPropasal.requestedBook.coverUrl
                            ? { uri: sentPropasal.requestedBook.coverUrl }
                            : {
                                //TODO Use the static import URL here
                                uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                              }
                        }
                        alt={`Cover of`}
                      />
                    </AspectRatio>
                    <Pressable
                      onPress={() =>
                        setSentProposal((prevProposal) => ({
                          ...prevProposal,
                          requestedBook: null,
                        }))
                      }
                      position="absolute"
                      right={0}
                      top={0}
                    >
                      <Badge
                        rounded="100"
                        width={7}
                        height={7}
                        bg="rgba(140, 140, 140, 0.7)"
                      >
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text
                    w={100}
                    textAlign="center"
                    fontSize={11}
                    numberOfLines={2}
                  >
                    {sentPropasal.requestedBook.title}
                  </Text>
                </>
              )}
              {/* TODO: Fetch other's library data, no api implemented yet */}
              {!sentPropasal?.requestedBook && (
                <Fab
                  onPress={() =>
                    navigation.navigate("OtherLibrary", {
                      user: user,
                      onDataReceived: (data) => {
                        setSentProposal((prevProposal) => ({
                          ...prevProposal,
                          requestedBook: data,
                        }));
                      },
                    })
                  }
                  renderInPortal={false}
                  shadow={2}
                  size="9"
                  mr="7"
                  mb="12"
                  bgColor="primary.50"
                  alignSelf="center"
                  icon={
                    <Icon
                      color="white"
                      as={MaterialIcons}
                      name="add"
                      size="md"
                    />
                  }
                />
              )}
            </Center>
          </Center>
        </Box>
        <HStack justifyContent="flex-end" mr="4" my="3">
          <VStack mr="2">
            <Box alignItems="flex-end">
              <Text color="#8c8c8c" pt="1">
                Trade with
              </Text>
            </Box>
            <Text textAlign="right">{user.name}</Text>
          </VStack>

          <Box
            size={12}
            rounded="full"
            backgroundColor="#e0e0e0"
            mr={3}
            overflow="hidden"
          >
            <Image
              source={getImageSource(user.photo_file_name, avatar)}
              alt="Profile Image"
              size={12}
              rounded="full"
            />
          </Box>
        </HStack>
      </VStack>
      <Button
        m="7"
        variant={isButtonDisabled ? "disabled" : "primary"}
        isDisabled={isButtonDisabled}
        onPress={proposeTradeHandler}
      >
        {i18n.t("send-offer")}
      </Button>
      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={closeInfoDialog}
        title={title}
        description={description}
        buttonVariant={buttonVariant}
        confirmButtonLabel={confirmButtonLabel}
        navigateToScreen={navigateToScreen}
      />
    </Screen>
  );
}
