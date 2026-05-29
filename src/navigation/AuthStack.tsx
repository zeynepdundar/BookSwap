import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen, PhoneInputScreen, CodeVerificationScreen } from "@/screens/Auth";
import { AuthStackParamList } from "@/types/navigation.types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="PhoneInput"
        component={PhoneInputScreen}
      />
      <Stack.Screen
        name="CodeVerification"
        component={CodeVerificationScreen}
      />
    </Stack.Navigator>
  );
}
