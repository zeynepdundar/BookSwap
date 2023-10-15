import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import WishlistInputScreen from "../screens/ProfileCreation/WishlistInputScreen";
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
      <Stack.Screen name="MyProfile" component={ProfileScreen}></Stack.Screen>
      <Stack.Screen
        name="MyWishlist"
        component={WishlistInputScreen}
      ></Stack.Screen>
      <Stack.Screen name="MyLibrary" component={MyLibraryScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
