import { Button, Center, Heading, Input, Text, View } from "native-base";
import ImagePicker from "../../components/ImagePicker";
import Screen from "../../components/Screen";

export default function PhotoInputScreen() {
  const pressHandler = (event: any) => {
    console.log("pressHandler");
  };

  return (
    <Screen>
        <ImagePicker />
      <Heading mt="100px">My photo</Heading>
      <Center mt="50">
        <Center mt={100}>
          <Button variant="primary" onPress={pressHandler}>
            Continue
          </Button>
        </Center>
      </Center>
    </Screen>
  );
}
