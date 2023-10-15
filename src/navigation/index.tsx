import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import ProfileStack from "./ProfileStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";
import {  useState } from "react";
import {  useSelector } from "react-redux";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { selectIsLoading, selectUser, selectUserToken } from "../store/auth-slice";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
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
        {true ? (
          <>
            {true && (
              <Stack.Screen
                name="ProfileCreation"
                component={ProfileCreationStack}
              />
            )}

            {!isNewUser && (
              <Stack.Group>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="ProfileStack" component={ProfileStack} />
              </Stack.Group>
            )}
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
