import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Auth from "../screens/Auth";
import VerificationCode from "../screens/Auth/VerificationCode";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCode}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}
