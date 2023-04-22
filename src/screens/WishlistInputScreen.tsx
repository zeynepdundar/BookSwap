import { useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  ArrowBackIcon,
  SearchIcon,
  Input,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import SearchBar from "../components/shared/SearchBar";

export default function WishlistInputScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("BookSearch");
  };

  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between" m="0" p="0">
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
      </Flex>
      <Heading mt="100px">{i18n.t("add-books-to-wishlist")}</Heading>
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
          onPressIn={() => {
            navigation.navigate("BookSearch");
          }}
          InputLeftElement={
            <SearchIcon size="5" mt="0.5" mx="2" color="black.300" />
          }
        />
      </Center>
      <Center mt={100}>
        <Button variant="primary" onPress={pressHandler}>
          {i18n.t("continue")}
        </Button>
      </Center>
    </Screen>
  );
}
