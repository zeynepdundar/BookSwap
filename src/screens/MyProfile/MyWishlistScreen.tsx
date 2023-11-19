import { useState } from "react";
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
  VStack,
  Divider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { VerticalList } from "../../components/shared/VerticalList";

const DUMMY_BOOKS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    coverUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    coverUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    title: "The Path Made Clear",
    author: "Oprah Winfrey",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];

export default function MyWishlistScreen({ navigation }) {
  const [books, setBooks] = useState(DUMMY_BOOKS);

  const removeBookHandler = (id) => {
    // setBooks()
    const existingBookItemIndex = books.findIndex((book) => book.id === id);
    setBooks(books.filter((book) => book.id !== id));
  };

  const addBookHandler = (book) => {
    setBooks((prevBooks) => {
      return [book, ...prevBooks];
    });
  };

  const pressHandler = () => {
    console.log("press handler");
  };

  const removeBookButton = (id) => (
    <Icon
      onPress={() => {
        removeBookHandler(id);
      }}
      name={"delete-forever"}
      variant="solid"
      size="md"
      color="primary.100"
      as={MaterialIcons}
    />
  );

  return (
    <Screen>
      <HStack
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
        <Heading>{i18n.t("my_wishlist.my_wishlist")}</Heading>
        <Spacer></Spacer>
      </HStack>

      {books.length === 0 && (
        <VStack width="100%" height={200} mt="100">
          <Center>
            <Icon
              name={"bookmark"}
              color="primary.100"
              variant="solid"
              size="lg"
              as={MaterialIcons}
            />

            <Text fontSize="md">{i18n.t("no-books-in-your-wishlist-yet")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />

            <Text textAlign="center" mx="30" fontWeight="200">
            {i18n.t("add-books-to-your-wishlist-to-swap-books")}
            </Text>
          </Center>
        </VStack>
      )}

      {books.length > 0 && (
        <Center>
          <VerticalList data={books}>{removeBookButton}</VerticalList>
        </Center>
      )}
      <Fab
        onPress={() => {
          addBookHandler("inputValue");
        }}
        renderInPortal={false}
        shadow={2}
        size="sm"
        bgColor="primary.50"
        right={35}
        bottom={70}
        icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
      />
    </Screen>
  );
}
