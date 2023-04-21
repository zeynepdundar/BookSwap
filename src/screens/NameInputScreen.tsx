import { Button, Center, Heading, Input, Text, View } from "native-base";
import { useState } from "react";
import Screen from "../components/Screen";

export default function NameInputScreen() {
  const [name, setName] = useState<string>("");

  const pressHandler = (event: any) => {
    console.log("enteredName", name);
  };

  return (
    <Screen>
      <Heading mt="100px">My full name is</Heading>
      <Center mt="50">
        <Input
          value={name}
          variant="underlined"
          maxLength={25}
          width={300}
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
        />
        <Center mt={100}>
          <Button variant="primary" onPress={pressHandler}>
            Continue
          </Button>
        </Center>
      </Center>
    </Screen>
  );
}
