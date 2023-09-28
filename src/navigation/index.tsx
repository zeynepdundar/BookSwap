import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import ProfileStack from "./ProfileStack";
import HomeTabs from "./HomeTabs";
import ProfileCreationStack from "./ProfileCreationStack";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function Navigation({ isAuthenticated }) {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);


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
            {isNewUser ? (
              <Stack.Screen
                name="ProfileCreation"
                component={ProfileCreationStack}
              />
            ) : (
              <></>
            )}

            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Profile" component={ProfileStack} />
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
