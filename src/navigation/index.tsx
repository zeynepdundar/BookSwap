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
import BookSearchOnCreationScreen from "../screens/ProfileCreation/BookSearchOnCreationScreen";
import TradeProposal from "../screens/TradeProposal";
import LibraryScreen from "../screens/Profile/LibraryScreen";
import OtherLibraryScreen from "../screens/OtherLibraryScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { loading, user } = useSelector((state: any) => state.auth);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

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
                          <Stack.Screen
                    name="ProfileCreation"
                    component={ProfileCreationStack}
                  />
        {isAuthenticated ? (
          <>
            {user.isNewUser && (
              <>
                <Stack.Group>
                  <Stack.Screen
                    name="ProfileCreation"
                    component={ProfileCreationStack}
                  />
                  <Stack.Screen
                    name="BarcodeScannerOnProfileCreation"
                    component={BarcodeScannerScreen}
                  />
                  <Stack.Screen
                    name="BookSearchOnCreation"
                    component={BookSearchOnCreationScreen}
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
                    <Stack.Screen
                    name="BookSearchFromList"
                    component={BookSearchOnCreationScreen}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="BookSearch"
                    component={BookSearchScreen}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="TradeProposal"
                    component={TradeProposal}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="OtherLibrary"
                    component={OtherLibraryScreen}
                  />
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
