import { useEffect, useState } from "react";
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
import i18n from "@/i18n";
import { getImageSource } from "@/utils/helper";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import Screen from "@/components/shared/Screen";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { sendOfferAsync } from "@/store/offers/thunks";
import { IMAGE_FALLBACKS } from "@/constants/image";

export default function SwapOfferProposal({ navigation, route }) {
  const user = route?.params?.data?.user || route?.params?.user;
  const book = route?.params?.data?.book || route?.params?.book;
  const offeredBookFromParams = route?.params?.offeredBook;
  const requestedBookFromParams = route?.params?.requestedBook;

  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const [sentPropasal, setSentProposal] = useState<any>(() => ({
    receiverId: user?.id || "",
    offeredBook: route?.params?.offeredBook || null,
    requestedBook: book || route?.params?.requestedBook || null,
  }));

  const dispatch = useAppDispatch();

  const proposeTradeHandler = async (): Promise<void> => {
    try {
      console.log("Proposing trade with proposal data:", sentPropasal);
      await dispatch(sendOfferAsync(sentPropasal)).unwrap();
      setIsInfoDialogOpen(true); // Başarılı olduğunda sadece modalı açar
    } catch (error) {
      console.error("Failed to send offer:", error);
    }
  };

  useEffect(() => {
    if (offeredBookFromParams) {
      setSentProposal((prev) => ({ ...prev, offeredBook: offeredBookFromParams }));
      navigation.setParams({ offeredBook: undefined });
    }
    if (requestedBookFromParams) {
      setSentProposal((prev) => ({ ...prev, requestedBook: requestedBookFromParams }));
      navigation.setParams({ requestedBook: undefined });
    }
  }, [offeredBookFromParams, requestedBookFromParams, navigation]);

  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
  };

  useEffect(() => {
    if (sentPropasal?.offeredBook && sentPropasal?.requestedBook) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [sentPropasal]);

  const tradeIcon = require("@/assets/images/icon/trade-icon.png");

  return (
    <Screen>
      {/* Üst Bar */}
      <HStack alignItems="center" space="20%" justifyContent="space-between" w="100%" h="50px">
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{ bg: "transparent" }}
          onPress={() => navigation.goBack()}
        />
        <Heading>{i18n.t("swap-proposal")}</Heading>
        <Spacer />
      </HStack>

      <VStack flex={1}>
        {/* Verilecek Kitap Alanı */}
        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-give")}
          </Text>
          <Center p="2" borderWidth="1" borderRadius="10" width="100%" borderColor="#EEEEEE" bgColor="white" shadow={0.9} height="200" overflow="hidden">
            <Center borderWidth="1" borderRadius="10" borderColor="#EEEEEE" bgColor="white" shadow={0.9} width="43%" height="180" overflow="hidden">
              {sentPropasal?.offeredBook ? (
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image source={sentPropasal.offeredBook.coverUrl ? { uri: sentPropasal.offeredBook.coverUrl } : { uri: IMAGE_FALLBACKS.BOOK_COVER }} alt="Cover" />
                    </AspectRatio>
                    <Pressable position="absolute" right={0} top={0} onPress={() => setSentProposal(prev => ({ ...prev, offeredBook: null }))}>
                      <Badge rounded="100" width={7} height={7} bg="rgba(140, 140, 140, 0.7)">
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text w={100} textAlign="center" fontSize={11} numberOfLines={2}>{sentPropasal.offeredBook.title}</Text>
                </>
              ) : (
                <Fab onPress={() => navigation.navigate("ProfileStack", { screen: "Library", params: { data: "SwapOfferProposal" } })} renderInPortal={false} shadow={2} size="9" mr="7" mb="12" bgColor="primary.500" icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />} />
              )}
            </Center>
          </Center>
        </Box>

        <Image source={tradeIcon} alt="Trade Icon" mt="4" alignSelf="center" />

        {/* Alınacak Kitap Alanı */}
        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-receive")}
          </Text>
          <Center p="2" borderWidth="1" borderRadius="10" width="100%" borderColor="#EEEEEE" shadow={0.9} bgColor="white" height="200" overflow="hidden">
            <Center borderWidth="1" borderRadius="10" borderColor="#EEEEEE" shadow={0.9} bgColor="white" width="43%" height="180" overflow="hidden">
              {sentPropasal?.requestedBook ? (
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image source={sentPropasal.requestedBook.coverUrl ? { uri: sentPropasal.requestedBook.coverUrl } : { uri: IMAGE_FALLBACKS.BOOK_COVER }} alt="Cover" />
                    </AspectRatio>
                    <Pressable position="absolute" right={0} top={0} onPress={() => setSentProposal(prev => ({ ...prev, requestedBook: null }))}>
                      <Badge rounded="100" width={7} height={7} bg="rgba(140, 140, 140, 0.7)">
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text w={100} textAlign="center" fontSize={11} numberOfLines={2}>{sentPropasal.requestedBook.title}</Text>
                </>
              ) : (
                <Fab onPress={() => navigation.navigate("OtherLibrary", { user })} renderInPortal={false} shadow={2} size="9" mr="7" mb="12" bgColor="primary.500" alignSelf="center" icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />} />
              )}
            </Center>
          </Center>
        </Box>

        {/* Kullanıcı Bilgisi */}
        <HStack justifyContent="flex-end" mr="4" my="3" alignItems="center">
          <VStack mr="2">
            <Text color="#8c8c8c" textAlign="right" fontSize="xs">Trade with</Text>
            <Text textAlign="right" fontWeight="500">{user?.name}</Text>
          </VStack>
          <Box size={12} rounded="full" backgroundColor="#e0e0e0" overflow="hidden">
            <Image source={getImageSource(user?.photo_file_name, IMAGE_FALLBACKS.USER_AVATAR)} alt="Profile" size={12} rounded="full" />
          </Box>
        </HStack>
      </VStack>

      {/* Teklif Gönder Butonu */}
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
        title={i18n.t("the-offer-sent")}
        description={i18n.t("see-sent-offers-description")}
        confirmButtonLabel={i18n.t("see-my-offers")}
        onConfirmPress={() =>
          navigation.navigate("HomeTabs", {
            screen: "Swaps",
            params: { screen: "Sent" },
          })
        }
      />
    </Screen>
  );
}