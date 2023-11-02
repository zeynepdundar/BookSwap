import { useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spacer,
  ArrowBackIcon,
  VStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";

export default function BirthdateInputScreen({ navigation }) {
  const [birthDay, setBirthDay] = useState<any>();
  const [birthMonth, setBirthMonth] = useState<any>();
  const [birthYear, setBirthYear] = useState<any>();

  //@TODO: Convert date input to db date fomrmat, here is one of the dynamoDB approach.
  // You can use the string data type to represent a date or a timestamp. One way to do this is by using ISO 8601 strings, as shown in these examples:
  const mergeDate = () => {
    return `${birthYear + "-" + birthMonth + "-" + birthDay}`;
  };

  const pressHandler = () => {
    navigation.navigate("Gender");
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
          {i18n.t("my-birthdate")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <Flex  direction="row" justifyContent="justify" width={190}>
            <Input
              value={birthDay}
              variant="underlined"
              keyboardType="numeric"
              maxLength={2}
              width={45}
              fontSize={20}
              borderTopColor="none"
              placeholder="DD"
              borderBottomColor="black.400"
              color="black.400"
              textAlign="center"
              px="1"
              onChange={(enteredDay) => {
                setBirthDay(enteredDay);
              }}
            />
            <Spacer />
            <Input
              value={birthMonth}
              variant="underlined"
              keyboardType="numeric"
              maxLength={2}
              width={45}
              fontSize={20}
              borderTopColor="none"
              borderBottomColor="black.400"
              placeholder="MM"
              color="black.400"
              textAlign="center"
              px="1"
              onChange={(enteredMonth) => {
                setBirthMonth(enteredMonth);
              }}
            />
            <Spacer />
            <Input
              value={birthYear}
              variant="underlined"
              keyboardType="numeric"
              maxLength={4}
              width={82}
              fontSize={20}
              borderTopColor="none"
              borderBottomColor="black.400"
              placeholder="YYYY"
              color="black.400"
              textAlign="center"
              px="0"
              onChange={(enteredYear) => {
                setBirthYear(enteredYear);
              }}
            />
          </Flex>
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
