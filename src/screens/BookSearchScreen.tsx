import { useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  ArrowBackIcon,
  SearchIcon,
  Input,
  Image,
  FlatList,
  Box,
  Text,
  Spacer,
  VStack,
  HStack,
  Avatar,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import SearchBar from "../components/shared/SearchBar";

export default function BookSearchScreen({ navigation }) {
  const importUrl = require("../assets/images/cover_1.png");

  const [birthDay, setBirthDay] = useState<any>();
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Crime and Punishment",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl: importUrl,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];
  const pressHandler = () => {
    console.log("birthdat", birthDay);
    navigation.navigate("Gender");
  };

  return (
    <Screen>
      {/* <Flex direction="row" justifyContent="space-between" m="0" p="0">
        <Button
          variant="ghost"
          width="50"
          leftIcon={<ArrowBackIcon size="6" mt="0.5" color="#212325" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <Button
          variant="ghost"
          maxWidth="130"
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.navigate("Gender")}
          _text={{
            textTransform: "uppercase",
            color: "black.300",
            fontWeight: "600",
          }}
        >
          {i18n.t("skip")}
        </Button>
      </Flex> */}
      <Heading mt="2">{i18n.t("keep-exploring")}</Heading>
      {/* <SearchBar></SearchBar> */}
      <Center>
        <Input
          placeholder={i18n.t("search-by-title")}
          width="90%"
          maxWidth="500"
          borderRadius="6"
          borderColor="black.900"
          color="black.400"
          backgroundColor="black.800"
          m="5"
          py="3"
          px="1"
          fontSize="14"
          _focus={{
            borderColor: "black.700",
          }}
          onFocus={() => {}}
          InputLeftElement={
            <SearchIcon size="5" mt="0.5" mx="2" color="black.300" />
          }
        />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Box
              borderWidth="1"
              borderRadius="15"
              borderColor="#F1F1F1"
              backgroundColor="primary.200"
              pl={["3", "4"]}
              pr={["3", "5"]}
              py="2"
              m="0.5"
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Image
                  source={importUrl}
                  alt=" Library"
                  width="85"
                  height="100"                />

                <VStack>
                  <Text color="#000000">{item.fullName}</Text>
                  <Text color="#8c8c8c" fontSize="xs">
                    {item.recentText}
                  </Text>
                  <Text color="#8c8c8c" fontSize="9px">
                    Can Publications
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
      <Center mb={100}>
        <Button variant="outline" onPress={pressHandler}>
          {i18n.t("done")}
        </Button>
      </Center>
    </Screen>
  );
}
