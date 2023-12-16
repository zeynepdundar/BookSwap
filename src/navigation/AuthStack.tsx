import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import AuthVerificationScreen from "../screens/Auth/AuthVerificationScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { confirmationResult, error } = useSelector((state: any) => state.userAuth);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      {(!confirmationResult && !error )&& (
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
      )}
      <Stack.Screen
        name="AuthVerification"
        component={AuthVerificationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
