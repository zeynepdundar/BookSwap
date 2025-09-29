import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen, WishlistScreen, LibraryScreen, FeedbackScreen } from "../screens";
import { ProfileStackParamList } from "../types/navigation";


const Stack = createNativeStackNavigator<ProfileStackParamList>();

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
