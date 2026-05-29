import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import BookSearchScreen from "@/screens/BookSearchScreen";
import UserListScreen from "@/screens/UserListScreen";
import BarcodeScannerScreen from "@/screens/BarcodeScannerScreen";
import ProfileStack from "./ProfileStack";
import OtherUserProfileScreen from "@/screens/OtherUserProfile";
import ChatScreen from "@/screens/Messages/ChatScreen";
import BookSearchOnCreationScreen from "@/screens/ProfileCreation/BookSearchOnCreationScreen";
import TradeProposal from "@/screens/TradeProposal";
import OtherLibraryScreen from "@/screens/OtherLibraryScreen";
import TradeOfferAcceptedScreen from "@/screens/TradeOfferAcceptedScreen";
import { RootState } from "@/store/types";
import { RootStackParamList } from "@/types/navigation.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {

  const { loading, user, isAuthenticated } = useSelector(
  (state: RootState) => state.auth
);

console.log("Navigation state:", loading, user, isAuthenticated );


  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            {user.isNewUser ? (
              // New User Flow
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
                />
              </Stack.Group>
            ) : (
              // Existing User Flow
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
                />
                <Stack.Screen
                  name="BookSearch"
                  component={BookSearchScreen}
                />
                <Stack.Screen
                  name="TradeProposal"
                  component={TradeProposal}
                />
                <Stack.Screen
                  name="TradeOfferAcceptedScreen"
                  component={TradeOfferAcceptedScreen}
                />
                <Stack.Screen
                  name="OtherLibrary"
                  component={OtherLibraryScreen}
                />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
              </Stack.Group>
            )}
          </>
        ) : (
          // Auth Flow
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}