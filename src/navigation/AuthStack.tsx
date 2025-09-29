import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { WelcomeScreen, AuthVerificationScreen } from "../screens/Auth";
import { AuthStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { confirmationResult, error } = useSelector((state: any) => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      {!confirmationResult && !error && (
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
      )}
      <Stack.Screen
        name="AuthVerification"
        component={AuthVerificationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
