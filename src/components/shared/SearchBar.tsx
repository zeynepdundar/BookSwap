import { useState } from "react";
import { Input, SearchIcon, Center, VStack, Box } from "native-base";
import i18n from "../../i18n";

export default function SearchBar(props) {
  const [gender, setGender] = useState<string>("");

  return (
    <Center>
      {/* <Input
        placeholder={i18n.t("search-by-title")}
        width="100%"
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
        onFocus={props.onFocus}
        onChangeText={props.onPress}
        InputLeftElement={
          <SearchIcon size="5" mt="0.5" mx="2" color="black.300" />
        }
      /> */}

        {/* <Input placeholder="Search People & Places" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} /> */}

    </Center>
  );
}
