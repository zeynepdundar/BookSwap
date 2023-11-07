import {
  ArrowBackIcon,
  Box,
  Button,
  Center,
  Fab,
  Flex,
  Heading,
  Icon,
  Input,
  Pressable,
  Spacer,
  Text,
  View,
  VStack,
} from "native-base";
import ImagePicker from "../../components/ImagePicker";
import Screen from "../../components/Screen";
import i18n from "../../i18n";

export default function PhotoInputScreen({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Wishlist");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
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
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("my-photo")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          {/* <Input
            value={name}
            variant="underlined"
            maxLength={25}
            width={250}
            fontSize={20}
            borderTopColor="none"
            borderBottomColor="black.400"
            color="black.400"
            textAlign="center"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(enteredName) => {
              setName(enteredName);
            }}
          /> */}
          <Pressable
            width={"300px"}
            height="100px"
            background={"amber.500"}
            borderColor={"amber.100"}
          >
            <Box borderColor="blue.100">huhu</Box>
          </Pressable>
          {/* <ImagePicker /> */}
        </Center>
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
