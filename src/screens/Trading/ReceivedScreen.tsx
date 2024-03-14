import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "native-base";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";
import {
  acceptOfferAsync,
  rejectOfferAsync,
} from "../../store/profile-actions";

export default function ReceivedScreen({ navigation }) {
  const tra = require("../../assets/images/icon/Icons.png");
  const otherUserImage = require("../../assets/images/jesse-pinkman-profile.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");
  const receivedOffers = useSelector(
    (state: any) => state.profile.profile.receivedOffer
  );
  const importUrl = require("../../assets/images/no-cover-available.png");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const acceptOfferHandler = (offer: any) => {
    dispatch(acceptOfferAsync(offer.id));
    navigation.navigate("TradeOfferAcceptedScreen", {
      userId:offer.participantProfile.id,
      receivedBook: offer.requestedBook,
      offeredBook: offer.offeredBook,
    });
  };

  const rejectOfferHandler = (offerId: string) => {
    dispatch(rejectOfferAsync(offerId));
  };

  return (
    <>
      {!receivedOffers || receivedOffers.length===0 && (
        <VStack width="100%" height="100%" pt="100" bg="#fff">
          <Center>
            <Text fontSize="md">{i18n.t("start-searching-for-new-books")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
            <Text textAlign="center" mx="30" fontWeight="200">
            {  i18n.t("you-have-not-received-any-offer-yet")}
            </Text>
          </Center>
        </VStack>
      )}

      {receivedOffers && receivedOffers.length > 0 && (
        <FlatList
          maxWidth="100%"
          bg="#fff"
          height="75%"
          data={receivedOffers}
          showsVerticalScrollIndicator={false}
          pt="3"
          renderItem={({ item }) => (
            <Box pb="6" overflow="hidden" alignItems="center">
              <Flex
                direction="row"
                justifyContent="space-between"
                w="95%"
                alignSelf="center"
                position="relative"
                zIndex={9}
              >
                <Flex direction="row" justifyContent="space-between">
                  <Avatar source={otherUserImage} size="44" />
                  {/* <Text
                onPress={() => navigation.navigate("Library")}
                color="#161719"
                fontWeight="medium"
                fontSize="14px"
                mx="1"
              >
                {"Jesse Pinkman"}
              </Text> */}
                </Flex>
                <Flex direction="row" justifyContent="space-between">
                  <VStack>
                    <Text
                      onPress={() => navigation.navigate("Library")}
                      color="#161719"
                      fontWeight="medium"
                      fontSize="14px"
                      mx="1"
                    >
                      {item.participantProfile.name}
                    </Text>
                    <Text
                      onPress={() => navigation.navigate("Library")}
                      color="coolGray.400"
                      fontSize="12px"
                      top="-5.5"
                      mx="1"
                      textAlign={"right"}
                    >
                      {item.createdAt}
                    </Text>
                  </VStack>
                  <Avatar source={profilePhoto} size="44" />
                </Flex>
              </Flex>
              <Box
                px="7"
                py="4"
                pt="6"
                pb="2"
                borderColor="coolGray.200"
                width="90%"
                shadow="2"
                alignSelf="center"
                maxW="80"
                top="-12"
                rounded="10"
                overflow="hidden"
                borderWidth="0.5"
              >
                <VStack>
                  <HStack justifyContent="space-between" width="100%" space={1}>
                    <VStack flex={1} alignItems="center">
                      <AspectRatio
                        w="70%"
                        ratio={{
                          base: 45 / 68,
                        }}
                      >
                        <Image
                          source={
                            item.offeredBook.coverUrl
                              ? { uri: item.offeredBook.coverUrl }
                              : importUrl
                          }
                          alt={`Cover of: ${item.offeredBook.title} by ${item.offeredBook.author}`}
                          roundedRight="6"
                        />
                      </AspectRatio>
                      <Text
                        color="#000000"
                        fontSize="12"
                        fontWeight={500}
                        numberOfLines={3}
                      >
                        {item.offeredBook.title}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">
                        {item.offeredBook.author}
                      </Text>
                    </VStack>
                    <Center height={110}>
                      <Image source={tra} alt="Library icon" />
                    </Center>
                    <VStack flex={1} alignItems="center">
                      <AspectRatio
                        w="70%"
                        ratio={{
                          base: 45 / 68,
                        }}
                      >
                        <Image
                          source={
                            item.requestedBook.coverUrl
                              ? { uri: item.requestedBook.coverUrl }
                              : importUrl
                          }
                          alt={`Cover of: ${item.requestedBook.title} by ${item.requestedBook.author}`}
                          roundedRight="6"
                        />
                      </AspectRatio>
                      <Text
                        color="#000000"
                        fontSize="12"
                        fontWeight={500}
                        numberOfLines={3}
                      >
                        {item.requestedBook.title}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">
                        {item.requestedBook.author}
                      </Text>
                    </VStack>
                  </HStack>
                  {/* <Divider my={3} color="#E5E7F3" thickness="1" /> */}
                  <Flex direction="row" justifyContent="space-between" pt="3">
                    <Button
                      variant="ghost"
                      _text={{ color: "#9395A4" }}
                      onPress={() => rejectOfferHandler(item.id)}
                    >
                      {i18n.t("decline")}
                    </Button>
                    <Divider
                      color="#E5E7F3"
                      thickness="1"
                      orientation="vertical"
                      height={6}
                      marginY="2"
                    />
                    <Button
                      variant="ghost"
                      onPress={() => acceptOfferHandler(item)}
                    >
                      {i18n.t("accept")}
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}
