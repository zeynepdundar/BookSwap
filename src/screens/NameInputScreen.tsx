import { useState } from "react";
import {
  Button,
  Center,
  Heading,
  Input,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";

export default function NameInputScreen({ navigation }) {
  const [name, setName] = useState<string>("");

  const pressHandler = (event: any) => {
    console.log("enteredName", name);
    navigation.navigate("Birthdate");
    
  };

  return (
    <Screen>
      <Heading mt="100px"> {i18n.t("my-full-name")}</Heading>
      <Center mt="50">
        <Input
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
        />
        <Center mt={100}>
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </Center>
    </Screen>
  );
}
