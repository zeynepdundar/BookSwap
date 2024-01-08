import { Input, Center, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "../../i18n";
import { useState } from "react";

export default function SearchBar({ onSearchBook, onScanBarcode, onFocus }) {
  const [value, setValue] = useState("");

  // const searchHandler = (text) => {
  //   if (text.length > 5) {
  //     onSearchBook(text);
  //   }
  // };

  return (
    <Center>
      <Input
        placeholder={i18n.t("search-book-by-title")}
        width="100%"
        value={value}
        borderRadius="6"
        py="3"
        px="1"
        fontSize="14"
        onChangeText={onSearchBook}
        onFocus={onFocus}
        _focus={{
          borderColor: "#EFEFEF",
          bg: "#F4F4F6",
        }}
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
        InputRightElement={
          <Icon
            m="2"
            mr="3"
            size="6"
            color="gray.400"
            onPress={onScanBarcode}
            as={<MaterialIcons name="crop-free" />}
          />
        }
      />
    </Center>
  );
}
