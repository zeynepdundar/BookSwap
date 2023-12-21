import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";

const DUMMY_INCOMING = [
  {
    id: "1",
    senderProfile: { name: "Iriana Saliha", profileUrl: "" },
    createdAt: "2008-04-30T09:38:13.731961",
    offeredBook: {
      title: "The World of Yesterday",
      author: "Stefan Zweig",
      coverUrl: "https://covers.openlibrary.org/b/id/6634325-L.jpg",
    },

    requestedBook: {
      title: "Boleyn Girl",
      author: "Plippa Gregory",
      coverUrl: "https://covers.openlibrary.org/b/id/13157680-L.jpg",
    },
  },
];
export default function RequestScreen({ navigation }) {
  const tra = require("../../assets/images/icon/Icons.png");
  const otherUserImage = require("../../assets/images/jesse-pinkman-profile.png");

  return (
    <FlatList
      maxWidth="100%"
      height="75%"
      data={DUMMY_INCOMING}
      showsVerticalScrollIndicator={false}
      pt="3"
      renderItem={({ item }) => (
        <Box>
          <Flex
            direction="row"
            justifyContent="space-between"
            w="95%"
            alignSelf="center"
            position="relative"
            bottom="-10"
          >
            <Flex direction="row" justifyContent="space-between">
              <Avatar source={otherUserImage} size="44" />
              <Text
                onPress={() => navigation.navigate("Library")}
                color="#161719"
                fontWeight="medium"
                fontSize="15px"
              >
                {"Jesse Pinkman"}
              </Text>
            </Flex>
            <Flex direction="row" justifyContent="space-between">
              <Text
                onPress={() => navigation.navigate("Library")}
                color="#161719"
                fontWeight="medium"
                fontSize="15px"
              >
                {"Jesse Pinkman"}
              </Text>
              <Avatar source={otherUserImage} size="44" />
            </Flex>
          </Flex>
          <Box
            borderWidth="0.2"
            borderRadius="25"
            borderColor="coolGray.600"
            px="7"
            py="4"
            pt="6"
            width="90%"
            alignSelf="center"
            // height={300}
            // backgroundColor={isSelectedItem(item.id) ? "primary.200" : "white"}
          >
            <VStack>
              <HStack justifyContent="space-between" width="100%" space={3}>
                <VStack width="40%">
                  <AspectRatio
                    ratio={{
                      base: 6 / 9,
                    }}
                    width={100}
                  >
                    <Image
                      source={{ uri: item.offeredBook.coverUrl }}
                      alt={`The book cover of ${item.offeredBook.title}`}
                      roundedRight="6"
                    />
                  </AspectRatio>

                  <Text color="#000000" fontSize="14" fontWeight={600}>
                    {item.offeredBook.title}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11">
                    by {item.offeredBook.author}
                  </Text>
                  {/* <Pressable
                onPress={() => {
                  {
                    event.stopPropagation();
                    navigation.navigate("UserList");
                  }
                }}
                borderColor="#323232"
                borderWidth="0.5"
                borderRadius="9"
                p="1"
                width="90px"
              >
                <Text alignSelf="center" color="#323232" fontSize="12px">
                  999 Owner
                </Text>
              </Pressable> */}
                </VStack>
                <Center height={150}>
                  <Image source={tra} alt="Library icon" />
                </Center>
                <VStack width="40%">
                  <AspectRatio
                    alignSelf="center"
                    ratio={{
                      base: 6 / 9,
                    }}
                    width={100}
                  >
                    <Image
                      source={{ uri: item.requestedBook.coverUrl }}
                      alt={`The book cover of ${item.offeredBook.title}`}
                      roundedRight="6"
                    />
                  </AspectRatio>

                  <Text color="#000000" fontSize="14" fontWeight={600}>
                    {item.requestedBook.title}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11">
                    by {item.requestedBook.author}
                  </Text>
                  {/* <Pressable
                onPress={() => {
                  {
                    event.stopPropagation();
                    navigation.navigate("UserList");
                  }
                }}
                borderColor="#323232"
                borderWidth="0.5"
                borderRadius="9"
                p="1"
                width="90px"
              >
                <Text alignSelf="center" color="#323232" fontSize="12px">
                  999 Owner
                </Text>
              </Pressable> */}
                </VStack>

                {/* <Box position="absolute" bottom="0" right="0">
              <Icon
                m="2"
                ml="3"
                size="6"
                color={isSelectedItem(item.id) ? "primary.50" : "primary.100"}
                as={
                  <MaterialIcons
                    name={
                      isSelectedItem(item.id) ? "bookmark" : "bookmark-outline"
                    }
                  />
                }
              />
            </Box> */}
              </HStack>
              <Divider my={3} color="#E5E7F3" thickness="1" />
              <Flex
                direction="row"
                justifyContent="space-between"
                w="84%"
                alignSelf="center"
              >
                <Box justifyContent="center">
                  <Text
                    onPress={() => navigation.navigate("Library")}
                    color="#9395A4"
                    fontWeight="medium"
                    fontSize="15px"
                  >
                    {i18n.t("decline")}
                  </Text>
                </Box>
                <Box justifyContent="center">
                  <Text
                    onPress={() => navigation.navigate("Library")}
                    color="#9395A4"
                    fontWeight="medium"
                    fontSize="15px"
                  >
                    {i18n.t("accept")}
                  </Text>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
