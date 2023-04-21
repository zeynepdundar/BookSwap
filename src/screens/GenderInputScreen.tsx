import { useState } from "react";
import { Button, Center, Heading, Box, ArrowBackIcon, Radio, Flex } from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";

export default function GenderInputScreen({ navigation }) {
  const [gender, setGender] = useState<string>("");

  const pressHandler = () => {
    console.log("enteredgender", gender);
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
        <Button
          variant="ghost"
          maxWidth="130"
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.navigate("Birthdate")}
          _text={{
            textTransform: "uppercase",
            color: "black.300",
            fontWeight: "600",
          }}
        >
          {i18n.t("skip")}
        </Button>
      </Flex>
      <Heading mt="100px">{i18n.t("my-gender")}</Heading>
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
                fontWeight: "500",
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
                fontWeight: "500",
              }}
            >
              {i18n.t("man")}
            </Radio>
          </Box>
        </Radio.Group>
      </Center>
      <Center mt={10}>
        <Button variant="primary" onPress={pressHandler}>
          {i18n.t("continue")}
        </Button>
      </Center>
    </Screen>
  );
}
