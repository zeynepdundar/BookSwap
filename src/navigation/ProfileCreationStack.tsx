import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BirthdateInputScreen from "../screens/ProfileCreation/BirthdateInputScreen";
import BookSearchScreen from "../screens/BookSearchScreen";
import GenderInputScreen from "../screens/ProfileCreation/GenderInputScreen";
import LibraryInputScreen from "../screens/ProfileCreation/LibraryInputScreen";
import NameInputScreen from "../screens/ProfileCreation/NameInputScreen";
import WishlistInputScreen from "../screens/ProfileCreation/WishlistInputScreen";
import PhotoInputScreen from "../screens/ProfileCreation/PhotoInputScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";

const Stack = createNativeStackNavigator();

export default function ProfileCreationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Group>
        <Stack.Screen name="Name" component={NameInputScreen}></Stack.Screen>
        <Stack.Screen
          name="Gender"
          component={GenderInputScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Birthdate"
          component={BirthdateInputScreen}
        ></Stack.Screen>
        <Stack.Screen name="Photo" component={PhotoInputScreen}></Stack.Screen>
        <Stack.Screen
          name="Wishlist"
          component={WishlistInputScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Library"
          component={LibraryInputScreen}
        ></Stack.Screen>
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="BookSearch"
          component={BookSearchScreen}
        ></Stack.Screen>
      </Stack.Group>
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
