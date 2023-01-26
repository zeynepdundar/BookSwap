import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  View,
} from "native-base";
import Screen from "../components/Screen";

export default function NameInputScreen() {
  return (
    <Screen>
      <Text>hello</Text>
      <View>
        <Input placeholder="Input" />
        <Button variant="primary">GET STARTED</Button>
      </View>
    </Screen>
  );
}
