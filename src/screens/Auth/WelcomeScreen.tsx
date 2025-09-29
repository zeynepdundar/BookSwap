import React from 'react';
import { Button, Heading, Image, Spacer, VStack } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Screen from "../../components/Screen";
import i18n from "../../i18n";
import { AuthStackParamList } from '../../types/navigation';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const APP_IMAGES = {
  infiniteLibrary: require("../../assets/images/infinite-library.png"),
} as const;

const IMAGE_SIZE = 375;
const HEADING_WIDTH = 312;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const handleGetStarted = () => {
    navigation.navigate("AuthVerification");
  };

  return (
    <Screen>
      <VStack space={2} alignItems="center" height="100%">
        <Image 
          source={APP_IMAGES.infiniteLibrary} 
          alt={i18n.t("infinite-library")} 
          size={IMAGE_SIZE} 
          mt="50"
        />
        
        <Heading fontSize="22px" mb="2">
          {i18n.t("infinite-library")}
        </Heading>
        
        <Heading color="black.200" w={HEADING_WIDTH}>
          {i18n.t("make-your-library-different")}
        </Heading>
        
        <Spacer />
        
        <Button 
          m="7" 
          variant="primary" 
          onPress={handleGetStarted}
        >
          {i18n.t("get-started")}
        </Button>
      </VStack>
    </Screen>
  );
}