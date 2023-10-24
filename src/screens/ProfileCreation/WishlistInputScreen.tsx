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
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import SearchBar from "../../components/shared/SearchBar";

export default function WishlistInputScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("BookSearch");
  };

  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between">
        <Button
          variant="ghost"
          position="absolute"
          width="50"
          leftIcon={<ArrowBackIcon size="6" color="#212325" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <Button
          variant="ghost"
          position="absolute"
          right="0"
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.navigate("Library")}
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
      <SearchBar
        onFocus={() => {
          navigation.navigate("BookSearch");
        }}
      ></SearchBar>
      <Center mt={100}>
        <Button variant="primary" onPress={pressHandler}>
          {i18n.t("continue")}
        </Button>
      </Center>
    </Screen>
  );
}
