import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { Provider, useDispatch } from "react-redux";
import "expo-dev-client";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import AsyncStore from "./src/utils/AsyncStore";
import { theme } from "./src/theme";
import Navigation from "./src/navigation";
import { AppDispatch, store } from "./src/store";

///  PUSH NOTIFICATIONS - START  ///

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log("PUSH TOKEN: ", token.data);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

///  PUSH NOTIFICATIONS - END  ///

export default function App() {
  ///  PUSH NOTIFICATIONS - START  ///
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification>();


  const registerForPushNotifications = async () => {
    try {
      const pushToken = await registerForPushNotificationsAsync();

      if (pushToken) {
        await AsyncStore.setItem("pushToken", pushToken);
      }
    } catch (error) {
      console.error("Error while registering for push notifications:", error);
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((incomingNotification) => {
        setNotification(incomingNotification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
      });
  };

  useEffect(() => {
    registerForPushNotifications();

    // Cleanup subscriptions when unmounting
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        notificationListener.current = null; // Reset the ref
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
        responseListener.current = null; // Reset the ref
      }
    };
  }, []);

  ///  PUSH NOTIFICATIONS - END  ///

  const [fontsLoaded] = useFonts({
    "poppins-light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "poppins-regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "poppins-semi-bold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function Root() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      // async function fetchToken() {
      //   const storedToken = await AsyncStorage.getItem("authToken");
      //    await AsyncStorage.removeItem("authToken");
      //   if (storedToken) {
      //     dispatch(setToken(storedToken));
      //   }
      // }
      // fetchToken();
    }, []);

    return <Navigation />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <Root />
      </Provider>
    </NativeBaseProvider>
  );
}
