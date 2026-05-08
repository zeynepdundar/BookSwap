import React, { useCallback } from 'react';
import { Button, Heading, Image, Spacer, VStack } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import i18n from "@/i18n";
import { AuthStackParamList } from '@/types/navigation.types';
import Screen from "@/components/Screen";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const ASSETS = {
  infiniteLibrary: require("@/assets/images/infinite-library.png"),
} as const;

const LAYOUT = {
  imageSize: 375,
  headingWidth: 312,
} as const;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const handleGetStarted = useCallback(() => {
    navigation.navigate("AuthVerification");
  }, [navigation]);

  return (
   <Screen>
      <VStack flex={1} space={2} alignItems="center">
        <Image
          source={ASSETS.infiniteLibrary}
          alt={i18n.t("infinite-library")}
          size={LAYOUT.imageSize}
          mt="50"
        />
        <Heading fontSize="22px" mb="2">
          {i18n.t("infinite-library")}
        </Heading>

        <Heading color="black.200" w={LAYOUT.headingWidth} textAlign="center">
          {i18n.t("make-your-library-different")}
        </Heading>

        <Spacer />

        <Button m="7" variant="primary" onPress={handleGetStarted}>
          {i18n.t("get-started")}
        </Button>
      </VStack>
    </Screen>
  );
}