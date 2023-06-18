
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BirthdateInputScreen from "../screens/BirthdateInputScreen";
import BookSearchScreen from "../screens/BookSearchScreen";
import GenderInputScreen from "../screens/GenderInputScreen";
import NameInputScreen from "../screens/NameInputScreen";
import WishlistInputScreen from "../screens/WishlistInputScreen";

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
          <Stack.Screen
            name="Wishlist"
            component={WishlistInputScreen}
          ></Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="BookSearch"
            component={BookSearchScreen}
          ></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    );
  }
