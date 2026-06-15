import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import {
  Button,
  Center,
  Heading,
  VStack,
  Input,
  Spacer,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";

import { setOnboardingName } from "@/store/onboarding";

export default function NameInputScreen({ navigation }) {
  const onboardingName = useSelector(
    (state: any) => state.onboarding.name
  );

  const [name, setName] = useState(onboardingName || "");

  const dispatch = useAppDispatch();

  const isButtonDisabled = name.trim().length <= 2;

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const pressHandler = () => {
    dispatch(setOnboardingName(name.trim()));
    navigation.navigate("BirthdateInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center h="118px" />

        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-name")}
        </Heading>

        <Center w="100%" h="20" px={8}>
          <Input
            value={name}
            variant="underlined"
            maxLength={25}
            width={250}
            fontSize={20}
            borderBottomColor="black.400"
            color="black.400"
            textAlign="center"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={handleNameChange}
          />
        </Center>

        <Spacer />

        <Center p={4}>
          <Button
            variant={isButtonDisabled ? "disabled" : "primary"}
            isDisabled={isButtonDisabled}
            onPress={pressHandler}
          >
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}