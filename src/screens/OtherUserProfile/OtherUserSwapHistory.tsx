import {
  Center,
  Spacer,
  Image,
  Box,
  Text,
  VStack,
  HStack,
  FlatList,
  AspectRatio,
  Avatar,
  Flex,
} from "native-base";
import Screen from "../../components/Screen";

export default function OtherSwapHistory() {
  const tradeIcon = require("../../assets/images/icon/trade-in.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");
  const importUrl = require("../../assets/images/cover_2.png");

  const data = [
    {
      id: "1",
      senderUserName: "Lalo Salamanca",
      profilPhotoUrl: "../../assets/images/icon/logout-icon.png",
      requestedBookCover: "",
      offeredBookCover: "../../assets/images/cover_2.png",
      requestedBookTitle: "The Path Made Clear",
      offeredBookTitle: "The Path Made Clear",
      acceptedDate: "",
    },
    {
      id: "2",
      senderUserName: "Lalo Salamanca",
      profilPhotoUrl: "../../assets/images/icon/logout-icon.png",
      requestedBookCover: "",
      offeredBookCover: "../../assets/images/cover_2.png",
      requestedBookTitle: "The Path Made Clear",
      offeredBookTitle: "The Path Made Clear",
      acceptedDate: "",
    },
  ];

  return (
    <Screen>
      <Center>
        <FlatList
          w="100%"
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Box
              p="1.5"
              mb="2"
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              shadow={0.8}
              overflow="hidden"
            >
              <HStack space="0.8" alignItems="center" h={151}>
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={importUrl}
                    alt=" Library"
                    width="60"
                    height="82"
                    borderRightRadius={10}
                  />
                  <Text color="#06070D" fontSize="xs" mt="1" textAlign="center">
                    {item.requestedBookTitle}
                  </Text>
                </VStack>
                <Image source={tradeIcon} alt=" Library" />
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={importUrl}
                    alt=" Library"
                    width="60"
                    height="82"
                    borderRightRadius={10}
                  />
                  <Text color="#06070D" fontSize="xs" mt="1" textAlign="center">
                    {item.offeredBookTitle}
                  </Text>
                </VStack>
                <Spacer></Spacer>
                <VStack w="102" h={126}>
                  <Text color="#8c8c8c" fontSize="xs" textAlign="right">
                    20 Jun
                  </Text>
                  <Spacer />
                  <Flex
                    direction="row"
                    alignItems="baseline"
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8c8c8c"
                      fontSize="10"
                      maxW="68px"
                    >
                      with <Text bold> {item.senderUserName}</Text>
                    </Text>
                    <AspectRatio w="39">
                      <Avatar source={profilePhoto} size="31" />
                    </AspectRatio>
                  </Flex>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
    </Screen>
  );
}
