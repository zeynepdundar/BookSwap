import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile";
import FeedbackScreen from "../screens/Profile/FeedbackScreen";
import LibraryScreen from "../screens/Profile/LibraryScreen";
import WishlistScreen from "../screens/Profile/WishlistScreen";

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
      <Stack.Screen name="Wishlist" component={WishlistScreen}></Stack.Screen>
      <Stack.Screen name="Library" component={LibraryScreen}></Stack.Screen>
      <Stack.Screen name="Feedback" component={FeedbackScreen}></Stack.Screen>

    </Stack.Navigator>
  );
}
