import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/MyProfile/MyProfileScreen";
import MyLibraryScreen from "../screens/MyProfile/MyLibraryScreen";
import MyWishlistScreen from "../screens/MyProfile/MyWishlistScreen";

const Stack = createNativeStackNavigator();

export default function MyProfileStack() {
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
        component={MyWishlistScreen}
      ></Stack.Screen>
      <Stack.Screen name="MyLibrary" component={MyLibraryScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
