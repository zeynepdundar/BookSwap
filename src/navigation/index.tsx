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
import OtherLibraryScreen from "@/screens/OtherLibraryScreen";
import { RootState } from "@/store/types";
import { RootStackParamList } from "@/types/navigation.types";
import SwapOfferProposal from "@/screens/SwapOfferProposal";
import SwapOfferAcceptedScreen from "@/screens/SwapOfferAcceptedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {

  const { loading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // --- AUTH FLOW ---
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : user?.isNewUser ? (
          // --- NEW USER FLOW ---
          <Stack.Screen
            name="ProfileCreation"
            component={ProfileCreationStack}
          />
        ) : (
          // --- MAIN APP FLOW (EXISTING USER) ---
          <Stack.Group>
            {/* Main Tab (Home, Swaps, Messages) */}
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            {/* Profile */}
            <Stack.Screen name="ProfileStack" component={ProfileStack} />
            {/* Common Screens */}
            <Stack.Screen name="UserList" component={UserListScreen} />
            <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
            <Stack.Screen name="BookSearch" component={BookSearchScreen} />
            <Stack.Screen name="SwapOfferProposal" component={SwapOfferProposal} />
            <Stack.Screen name="SwapOfferAcceptedScreen" component={SwapOfferAcceptedScreen} />
            <Stack.Screen name="OtherLibrary" component={OtherLibraryScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
      {loading && (
        <Box position="absolute" top={0} bottom={0} left={0} right={0} bg="rgba(0,0,0,0.3)">
          <LoadingOverlay />
        </Box>
      )}

    </NavigationContainer>
  );
}