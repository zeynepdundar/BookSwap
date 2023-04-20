import { Button, Center, Heading, Input, Text, View } from "native-base";
import { useState } from "react";
import Screen from "../components/Screen";

export default function NameInputScreen() {
  const [name, setName] = useState<string>("");

  const pressHandler = (event: any) => {
    console.log("enteredName");
  };

  return (
    <Screen>
      <Heading mt="100px">My full name is</Heading>
      <Center mt="50">
        <Input
          value={name}
          variant="underlined"
          maxLength={25}
          width={330}
          fontSize={20}
          borderTopColor="none"
          borderBottomColor="black.300"
          color="black.300"
          textAlign="center"
          autoCapitalize="none"
          autoCorrect={false}
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
