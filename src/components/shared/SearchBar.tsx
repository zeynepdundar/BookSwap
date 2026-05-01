import { Input, Center, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "@/i18n";
import { useState } from "react";

export default function SearchBar({
  onSearchBook,
  onScanBarcode,
  onFocus,
  disableKeyboard = false,
  navigateOnPress,
}) {
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
        editable
        focusable
        // @ts-ignore - RN supports this prop on modern versions
        showSoftInputOnFocus={!disableKeyboard}
        // Ensure cursor is visible even when keyboard is disabled
        caretHidden={false}
        bg="transparent"
        onPressIn={disableKeyboard ? navigateOnPress : undefined}
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
