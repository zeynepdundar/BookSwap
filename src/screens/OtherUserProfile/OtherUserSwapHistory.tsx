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

export default function OtherSwapHistory({ historyList }) {
  const tradeIcon = require("../../assets/images/icon/trade-in.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");

  return (
      <Center mt="6">
        <FlatList
          w="100%"
          data={historyList}
          showsVerticalScrollIndicator={false}
          // refreshing={refreshing}
          // onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Box
              p="1.5"
              mb="2"
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              overflow="hidden"
              key={item.id}
            >
              <HStack space="0.8" alignItems="center" h={151}>
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={
                      item.requestedBook.coverUrl
                        ? { uri: item.requestedBook.coverUrl }
                        : {
                            uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                          }
                    }
                    alt="Library"
                    roundedRight="4"
                    width="60"
                    height="82"
                  />
                  <Text color="#06070D" fontSize="xs" mt="1" textAlign="center">
                    {item.requestedBook.title}
                  </Text>
                </VStack>
                <Image source={tradeIcon} alt=" Library" />
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={
                      item.offeredBook.coverUrl
                        ? { uri: item.offeredBook.coverUrl }
                        : {
                            uri: "https://store.bookbaby.com/bookshop/OnePageBookCoverImage.jpg?BookID=BK00009510&abOnly=False",
                          }
                    }
                    alt=" Library"
                    width="60"
                    height="82"
                    roundedRight="4"
                  />
                  <Text color="#06070D" fontSize="xs" mt="1" textAlign="center">
                    {item.offeredBook.title}
                  </Text>
                </VStack>
                <Spacer></Spacer>
                <VStack w="102" h={126}>
                  <Text color="#8c8c8c" fontSize="xs" textAlign="right">
                    20 Jun
                  </Text>
                  <Spacer />
                  <Flex direction="column" alignItems="flex-end">
                    <AspectRatio w="39">
                      <Avatar source={profilePhoto} size="31" />
                    </AspectRatio>
                    <Text
                      color="#8c8c8c"
                      fontSize="10"
                      maxW="68px"
                      textAlign="center"
                      pt="1"
                    >
                      with <Text> {item.participantProfile.name}</Text>
                    </Text>
                  </Flex>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
  );
}
