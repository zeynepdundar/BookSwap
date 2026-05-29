import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { WelcomeScreen, PhoneInputScreen, CodeVerificationScreen } from "@/screens/Auth";
import { AuthStackParamList } from "@/types/navigation.types";
import { RootState } from "@/store/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { verificationId } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={verificationId ? "CodeVerification" : "Welcome"}
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
