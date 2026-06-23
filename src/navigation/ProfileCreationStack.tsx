import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NameInputScreen,
  GenderInputScreen,
  BirthdateInputScreen,
  PhotoInputScreen,
  WishlistInputScreen,
  LibraryInputScreen,
} from "@/screens/ProfileCreation";
import BookSearchScreen from "@/screens/BookSearchScreen";
import BarcodeScannerScreen from "@/screens/BarcodeScannerScreen";
import { ProfileCreationStackParamList } from "@/types/navigation.types";

const Stack = createNativeStackNavigator<ProfileCreationStackParamList>();


export default function ProfileCreationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="NameInput" component={NameInputScreen}></Stack.Screen>
      <Stack.Screen
        name="GenderInput"
        component={GenderInputScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="BirthdateInput"
        component={BirthdateInputScreen}
      ></Stack.Screen>
      <Stack.Screen name="PhotoInput" component={PhotoInputScreen}></Stack.Screen>
      <Stack.Screen
        name="WishlistInput"
        component={WishlistInputScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="LibraryInput"
        component={LibraryInputScreen}
      ></Stack.Screen>

      {/* Shared screens, registered here so they are reachable inside the
          onboarding tree. Behaviour is driven by the `mode` route param. */}
      <Stack.Screen name="BookSearch" component={BookSearchScreen} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
    </Stack.Navigator>
  );
}
