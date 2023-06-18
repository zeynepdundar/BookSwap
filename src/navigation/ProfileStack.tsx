import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyWishlistScreen from "../screens/MyWishlistScreen";
import MyLibraryScreen from "../screens/MyLibraryScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      <Stack.Screen
        name="MyWishlist"
        component={MyWishlistScreen}
      ></Stack.Screen>
      <Stack.Screen name="MyLibrary" component={MyLibraryScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
