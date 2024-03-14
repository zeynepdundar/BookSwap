import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Icon,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";

import { useState } from "react";
import Screen from "../components/Screen";
import { formatText, BookListVertical } from "../components/shared/BookListVertical";
import i18n from "../i18n";

const DUMMY_BOOKS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    publisher: "Can Yayınları",
    coverUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    publisher: "Can Yayınları",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    publisher: "Can Yayınları",
    coverUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    publisher: "Can Yayınları",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    title: "The ",
    author: "Oprah Winfrey",
    publisher: "Can Yayınları",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];
export default function OtherLibraryScreen({navigation, route}) {
  const [books, setBooks] = useState(DUMMY_BOOKS);

  const { relatedScreen, onDonePress } = route.params;


  const handleDonePress = (item:any) => {
    // Pass selected items to the parent using the callback
    onDonePress(item);
    navigation.goBack();
  };

  const profilePhoto = require("../assets/images/lalo-salamanca.png");

  return (
    <Screen>
      <Box flexDirection="row" alignItems="center" m="3">
        <AspectRatio w="50px" ratio={1} marginRight={2}>
          <Avatar source={profilePhoto} size="50" />
        </AspectRatio>
        <Text fontWeight="500" fontSize="18">
          Lalo Salamanca's Library
        </Text>
      </Box>
      <Center>
        <>
          <FlatList
            maxWidth="100%"
            height="75%"
            mx="3"
            data={DUMMY_BOOKS}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
              onPress={()=>handleDonePress(item)}
              >
                <Box
                  borderWidth="1"
                  borderRadius="15"
                  height="130"
                  borderColor="#F1F1F1"
                  // backgroundColor={
                  //   isSelectedBook(item.id) ? "primary.200" : "white"
                  // }
                  p="3"
                  mx="2"
                  my="1"
                >
                  <HStack
                    justifyContent="space-between"
                    width="100%"
                    space={3}
                    p={1}
                  >
                    <AspectRatio
                      w="20%"
                      ratio={{
                        base: 40 / 62,
                      }}
                    >
                      <Image
                        source={{ uri: item?.coverUrl }}
                        alt={`Cover of ${item.title} by ${item.author}`}
                        roundedRight="4"
                      />

                      {/* {!item?.coverUrl && (
                            <Image
                              source={importUrl}
                              alt={`Cover of`}
                              roundedRight="6"
                            />
                          )} */}
                    </AspectRatio>

                    <VStack width="75%" h="95">
                      <Text color="#000000" fontSize="15">
                        {formatText(item.title)}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">
                        {formatText(item.author)}
                      </Text>
                      <Text color="#000000" fontSize="13px" fontWeight="200">
                        {formatText(item.publisher)}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      </Center>
    </Screen>
  );
}
