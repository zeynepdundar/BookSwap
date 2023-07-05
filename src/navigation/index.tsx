import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyWishlistScreen from "../screens/MyWishlistScreen";
import MyLibraryScreen from "../screens/MyLibraryScreen";
import AuthStack from "./AuthStack";
import ProfileStack from "./ProfileStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";

const Stack = createNativeStackNavigator();

export default function Navigation({ isAuthenticated }) {
  function RenderedStack() {
    return isAuthenticated ? <ProfileCreationStack /> : <AuthStack />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Home" component={HomeTabs} /> */}
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="AuthenticationFlow" component={RenderedStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
