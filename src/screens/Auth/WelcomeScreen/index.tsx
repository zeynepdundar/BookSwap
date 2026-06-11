import { useCallback } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
} from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


import i18n from "@/i18n";
import { AuthStackParamList } from "@/types/navigation.types";
import Screen from "@/components/shared/Screen";
import { clearVerification } from "@/store/auth/slice";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "Welcome"
  >;
};

const ASSETS = {
  infiniteLibrary: require("@/assets/images/infinite-library.png"),
} as const;

export default function WelcomeScreen({
  navigation,
}: WelcomeScreenProps) {
  const dispatch = useAppDispatch();

  const handleGetStarted = useCallback(() => {
    dispatch(clearVerification());

    requestAnimationFrame(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "PhoneInput" }],
      });
    });
  }, [navigation, dispatch]);

  return (
    <Screen>
      <Box flex={1} bg="white">
        <Box
          position="absolute"
          top={-140}
          left={-100}
          w="320px"
          h="320px"
          borderRadius="full"
          bg="primary.100"
          opacity={0.12}
        />

        <Box
          position="absolute"
          bottom={-140}
          right={-100}
          w="300px"
          h="300px"
          borderRadius="full"
          bg="secondary.100"
          opacity={0.1}
        />

        <Image
          source={ASSETS.infiniteLibrary}
          alt={i18n.t("infinite-library")}
          position="absolute"
          top="20%"
          alignSelf="center"
          resizeMode="contain"
          w="100%"
          h={400}
          opacity={0.22}
        />

        <VStack
          flex={1}
          px={7}
          pt={18}
          pb={10}
          justifyContent="space-between"
        >
          <VStack space={6}>
            <Text fontSize="sm" fontWeight="bold" letterSpacing="xl" color="primary.50" > BOOK SWAP </Text>

            <Heading
              fontSize="4xl" lineHeight="48px" fontWeight="semibold"
              color="black"
              maxW="320px"
            >
              {i18n.t("build-your-infinite-library")}
            </Heading>

            <Text
              fontSize="md"
              color="black.500"
              lineHeight="28px"
              maxW="260px"
            >
              {i18n.t("discover-and-exchange-books-with-people-who-read-like-you")}
            </Text>
          </VStack>

          <VStack space={4}>
            <Button
              size="lg"
              borderRadius="full"
              py={4}
              variant="primary" 
              shadow={1}
              onPress={handleGetStarted}
            >
              {i18n.t("get-started")}
            </Button>

            <Text
              textAlign="center"
              fontSize="sm"
              color="black.400"
            >
              {i18n.t("a-shared-world-of-books")}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Screen>
  );
}