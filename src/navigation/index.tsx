import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";
import { LoadingOverlay } from "../components/LoadingOverlay";
import {
  selectIsLoading,
  selectUser,
  selectUserToken,
} from "../store/auth-slice";
import MyProfileStack from "./MyProfileStack";
import OtherProfileScreen from "../screens/OtherProfile/OtherProfileScreen";
import BookSearchScreen from "../screens/BookSearchScreen";
import UserListScreen from "../screens/UserListScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLoading = useSelector(selectIsLoading);
  const userToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);

  if (isLoading) {
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
        {userToken !== null ? (
          <>
            {user.fullName && (
              <Stack.Group>
                <Stack.Screen
                  name="ProfileCreation"
                  component={ProfileCreationStack}
                />
              </Stack.Group>
            )}
            {!!user.fullName && (
              <Stack.Group>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen
                  name="MyProfileStack"
                  component={MyProfileStack}
                />
                <Stack.Screen
                  name="UserList"
                  component={UserListScreen}
                />
                <Stack.Screen
                  name="OtherProfile"
                  component={OtherProfileScreen}
                />
              </Stack.Group>
            )}
            <Stack.Screen
              name="BarcodeScanner"
              component={BarcodeScannerScreen}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="BookSearch"
                component={BookSearchScreen}
              ></Stack.Screen>
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="AuthenticationFlow" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
