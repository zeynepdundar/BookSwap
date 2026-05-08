import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { WelcomeScreen, AuthVerificationScreen } from "@/screens/Auth";
import { AuthStackParamList } from "@/types/navigation.types";
import { RootState } from "@/store/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { verificationId, error } = useSelector((state: RootState) => state.auth);
  const showWelcomeScreen = !verificationId && !error;

  return (
    <Stack.Navigator
      initialRouteName={showWelcomeScreen ? "Welcome" : "AuthVerification"}
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      {showWelcomeScreen && (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      )}
      <Stack.Screen
        name="AuthVerification"
        component={AuthVerificationScreen}
      />
    </Stack.Navigator>
  );
}
