import { Provider, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Platform, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { theme } from "./src/theme";
import Navigation from "./src/navigation";
import store, { AppDispatch } from "./src/store/store";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

///  PUSH NOTIFICATIONS - START  ///

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log("PUSH TOKEN: ", token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

///  PUSH NOTIFICATIONS - END  ///


export default function App() {

  ///  PUSH NOTIFICATIONS - START  ///
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification>();


  useEffect(() => {}, []);

  const registerForPushNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        // Process the token (send to backend, etc.)
      } catch (error) {
        console.error('Error while registering for push notifications:', error);
      }

      notificationListener.current = Notifications.addNotificationReceivedListener(
        (incomingNotification) => {
          setNotification(incomingNotification);
        }
      );

      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );
    };

  useEffect(() => {
      registerForPushNotifications();
  
      // Cleanup subscriptions when unmounting
      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(notificationListener.current);
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
      async function fetchToken() {
        // const storedToken = await AsyncStorage.getItem("authToken");
        //  await AsyncStorage.removeItem("authToken");
        // if (storedToken) {
        //   // dispatch(setToken(storedToken));
        // }
      }
      fetchToken();
    }, []);

    return <Navigation />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <Root />
        {/* <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <TextInput
              onChangeText={(value) => setInput("name", value)}
              style={styles.input}
              value={formState.name}
              placeholder="Name"
            />
            <TextInput
              onChangeText={(value) => setInput("profile_photo", value)}
              style={styles.input}
              value={formState.profile_photo}
              placeholder="Profile Photo"
            />
            <Pressable onPress={addUser} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Create user</Text>
            </Pressable>
            {users.map((user, index) => (
              <View key={user.id ? user.id : index} style={styles.todo}>
                <Text style={styles.todoName}>{user.name}</Text>
                <Text style={styles.todoDesc}>{user.profile_photo}</Text>
              </View>
            ))}
          </View>
        </SafeAreaView> */}
        {/* <Center flex="1" fontFamily="heading" mt={20}>
        <Input w="75%" value={name} onChangeText={setName} />
        <Button
          bg="primary.100"
          m="7"
          _text={{
            color: "primary.50",
          }}
          onPress={handleInsert}
        >
          Insert into Dynamo DB
        </Button>
        <FlatList
          data={users}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
      </Center> */}
      </Provider>
    </NativeBaseProvider>
  );
}
