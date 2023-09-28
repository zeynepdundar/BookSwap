import { useState } from "react";
import { Button, Center, Flex, Heading, Input, Spacer, ArrowBackIcon } from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";

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
      </Flex>
      <Heading mt="100px">{i18n.t("my-birthdate")}</Heading>
      <Center>
        <Flex mt="50" direction="row" justifyContent="justify" width={190}>
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
      <Center mt={100}>
        <Button variant="primary" onPress={pressHandler}>
          {i18n.t("continue")}
        </Button>
      </Center>
    </Screen>
  );
}
