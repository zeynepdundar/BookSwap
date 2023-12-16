import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";
import { LoadingOverlay } from "../components/LoadingOverlay";
import BookSearchScreen from "../screens/BookSearchScreen";
import UserListScreen from "../screens/UserListScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import ProfileStack from "./ProfileStack";
import OtherUserProfileScreen from "../screens/OtherUserProfile";
import ChatScreen from "../screens/Messages/ChatScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { loading, user, authToken } = useSelector((state: any) => state.userAuth);
  const isAuthenticated = useSelector((state:any) => state.userAuth.isAuthenticated);

  console.log("Loading", user, authToken);
  if (loading) {
    // We haven't finished checking for the token yet
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        {isAuthenticated? (
          <>
            {user.isNewUser && (
              <>
                <Stack.Group>
                  <Stack.Screen
                    name="ProfileCreation"
                    component={ProfileCreationStack}
                  />
                  <Stack.Screen
                    name="BarcodeScanner"
                    component={BarcodeScannerScreen}
                  />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="BookSearch"
                    component={BookSearchScreen}
                  ></Stack.Screen>
                </Stack.Group>
              </>
            )}
            {!user.isNewUser && (
              <>
                <Stack.Group>
                  <Stack.Screen name="HomeTabs" component={HomeTabs} />
                  <Stack.Screen name="ProfileStack" component={ProfileStack} />
                  <Stack.Screen name="UserList" component={UserListScreen} />
                  <Stack.Screen
                    name="OtherUserProfile"
                    component={OtherUserProfileScreen}
                  />
                  <Stack.Screen
                    name="BarcodeScanner"
                    component={BarcodeScannerScreen}
                  />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="BookSearch"
                    component={BookSearchScreen}
                  ></Stack.Screen>
                </Stack.Group>
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
