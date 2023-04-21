import { Button, Center, Heading, Box } from "native-base";
import { Radio } from "native-base";
import { useState } from "react";
import i18n from "../i18n";
import Screen from "../components/Screen";

export default function GenderInputScreen() {
  const [gender, setGender] = useState<string>("");

  const pressHandler = () => {
    console.log("enteredgender", gender);
  };

  return (
    <Screen>
      <Heading mt="100px">I am a</Heading>
      <Center mt="50">
        <Radio.Group
          name="genderRadioGroup"
          defaultValue=""
          accessibilityLabel="Select your gender"
          value={gender}
          onChange={(nextValue) => {
            setGender(nextValue);
          }}
        >
          <Box
            width={{
              base: 300,
              lg: 250,
            }}
            height={60}
            alignItems="center"
            rounded="4px"
            borderColor={gender === "woman" ? "primary.50" : "black.400"}
            borderWidth={gender === "woman" ? "2" : "1"}
            py="12px"
            mb={5}
          >
            <Radio
              value="woman"
              my="2"
              _text={{
                color: gender === "woman" ? "primary.50" : "black.400",
                textTransform: "uppercase",
                fontWeight:"500"

              }}
            >
              {i18n.t("woman")}
            </Radio>
          </Box>
          <Box
            width={{
              base: 300,
              lg: 250,
            }}
            height={60}
            alignItems="center"
            rounded="4px"
            borderColor={gender === "man" ? "primary.50" : "black.400"}
            borderWidth={gender === "man" ? "2" : "1"}
            py="12px"
          >
            <Radio
              value="man"
              my="2"
              _text={{
                color: gender === "man" ? "primary.50" : "black.400",
                textTransform: "uppercase",
                fontWeight:"500"
              }}
            >
              {i18n.t("man")}
            </Radio>
          </Box>
        </Radio.Group>
        {/* <Input
          value={gender}
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
        /> */}
      </Center>
      <Center mt={10}>
          <Button variant="primary" onPress={pressHandler}>
            Continue
          </Button>
        </Center>
    </Screen>
  );
}
