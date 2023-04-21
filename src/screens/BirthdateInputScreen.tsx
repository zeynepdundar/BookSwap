import { Button, Center, Flex, Heading, Input, Spacer } from "native-base";
import { Radio } from "native-base";
import { useState } from "react";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { TextInput } from "react-native";

export default function BirthdateInputScreen() {
  const [birthDay, setBirthDay] = useState<any>();
  const [birthMonth, setBirthMonth] = useState<any>();
  const [birthYear, setBirthYear] = useState<any>();

  const pressHandler = () => {
    console.log("birthdat", birthDay);
  };

  return (
    <Screen>
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
        </Flex></Center>
        <Center mt={100}>
          <Button variant="primary" onPress={pressHandler}>
          {i18n.t("continue")}
          </Button>
        </Center>
    </Screen>
  );
}