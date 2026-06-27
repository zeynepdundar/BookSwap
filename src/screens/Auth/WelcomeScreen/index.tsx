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
import Screen from "@/components/ui/Screen";
import { clearVerification } from "@/store/auth/slice";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { APP_IMAGES } from "@/constants/image";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "Welcome"
  >;
};

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
    <Screen full>
      <Box flex={1} bg="gray.50" overflow="hidden">

        <Box
          position="absolute"
          top={-100}
          left={-100}
          w="80"
          h="80"
          borderRadius="full"
          bg="primary.100"
          opacity={0.4}
        />

        <VStack
          flex={1}
          px={6}
          pt={16}
          pb={8}
          justifyContent="space-between"
          zIndex={1}
        >
          <VStack space={3} mt={4}>
            <Text
              fontSize="xs"
              fontWeight="800"
              letterSpacing="2xl"
              color="primary.600"
              textTransform="uppercase"
            >
              BOOK SWAP
            </Text>

            <Heading
              fontSize="4xl"
              lineHeight="sm"
              maxW="300px"
            >
              {i18n.t("build-your-infinite-library")}
            </Heading>

            <Text
              maxW="280px"
            >
              {i18n.t("discover-and-exchange-books-with-people-who-read-like-you")}
            </Text>
          </VStack>

          <Box flex={1} bg="white" overflow="hidden">

            <Image
              source={APP_IMAGES.infiniteLibrary}
              accessible={false}
              resizeMode="contain"
              w="100%"
              h="85%"
              opacity={.6}
            />
          </Box>

          <VStack space={4} w="100%">
            <Button
              py={4}
              variant="primary"
              shadow={3}
              onPress={handleGetStarted}
            >
              {i18n.t("get-started")}
            </Button>
            <Text
              textAlign="center"
              fontSize="xs"
              fontWeight="500"
            >
              {i18n.t("a-shared-world-of-books")}
            </Text>
          </VStack>

        </VStack>
      </Box>
    </Screen>
  );
}