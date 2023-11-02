import { useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  ArrowBackIcon,
  Text,
  Box,
  VStack,
  Badge,
  CloseIcon,
  Image,
  AspectRatio,
  FlatList,
  Spacer,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import SearchBar from "../../components/shared/SearchBar";

export default function WishlistInputScreen({ navigation }) {
  const importUrl = require("../../assets/images/cover_1.png");

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      coverUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      coverUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  const pressHandler = () => {
    navigation.navigate("Library");
  };

  return (
    <Screen>
      <VStack
        space={1}
        alignItems="center"
        height={"50%"}
      >
        <Center w="100%" h="20" justifyContent="space-between">
          <Flex direction="row" justifyContent="space-between" w="100%" h="10">
            <Button
              backgroundColor="transparent"
              variant="ghost"
              leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
              _pressed={{
                bg: "transparent",
              }}
              onPress={() => navigation.goBack()}
            ></Button>
            <Box justifyContent="center">
              <Text
                onPress={() => navigation.navigate("Library")}
                color="#969696"
                fontWeight="500"
                fontSize="14px"
                px={4}
              >
                {i18n.t("skip").toUpperCase()}
              </Text>
            </Box>
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("add-books-to-wishlist")}
        </Heading>
        <Center w="100%" h="20" px={8} >
          <SearchBar
            onFocus={() => {
              navigation.navigate("BookSearch", {
                relatedScreen: "WISHLIST",
              });
            }}
            onPress={() =>
              navigation.navigate("BookSearch", {
                relatedScreen: "WISHLIST",
              })
            }
          />
        </Center>
        {data.length > 0 && (
          <Center w="100%" h="109px" px={6} >
            <FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Box w="90px" h="95px" mx={1} justifyContent="center">
                  <AspectRatio ratio={4 / 3}>
                    <Image source={importUrl} alt="image base" />
                  </AspectRatio>
                  <Badge
                    rounded="100"
                    w="7"
                    h="7"
                    bg="#F2F2F2"
                    position="absolute"
                    right={0}
                    top={0}
                  >
                    <CloseIcon fontSize={10} color="coolGray.800" />
                  </Badge>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </Center>
        )}
        <Spacer />
        <Center p={4}>
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
