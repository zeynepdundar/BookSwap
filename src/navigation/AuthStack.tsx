import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import TempScreen from "../screens/Auth/TempScreen";
import AuthVerificationScreen from "../screens/Auth/AuthVerificationScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

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
        // <Stack.Screen name="Temp" component={TempScreen}></Stack.Screen>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
      )}
      <Stack.Screen
        name="AuthVerification"
        component={AuthVerificationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
