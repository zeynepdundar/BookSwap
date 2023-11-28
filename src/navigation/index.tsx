import { useState } from "react";
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
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLoading = useSelector(selectIsLoading);
  const userToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);

  console.log("userToken on Navigation", userToken);

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
            {!user.fullName && (
              <Stack.Screen
                name="ProfileCreation"
                component={ProfileCreationStack}
              />
            )}

            {!!user.fullName && (
              <Stack.Group>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen
                  name="MyProfileStack"
                  component={MyProfileStack}
                />
                <Stack.Screen
                  name="OtherProfile"
                  component={OtherProfileScreen}
                ></Stack.Screen>{" "}
              </Stack.Group>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
            <Stack.Screen name="AuthenticationFlow" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
