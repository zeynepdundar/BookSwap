import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Image, NativeBaseProvider, Text } from "native-base";
// import { Amplify, DataStore } from "aws-amplify";
// import awsconfig from "./src/aws-exports";
import { theme } from "./src/theme";
import { Gender, User } from "./src/models";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import NameInputScreen from "./src/screens/NameInputScreen";
import Auth from "./src/screens/auth";
import VerificationCode from "./src/screens/auth/VerificationCode";
import GenderInputScreen from "./src/screens/GenderInputScreen";
import BirthdateInputScreen from "./src/screens/BirthdateInputScreen";
import WishlistInputScreen from "./src/screens/WishlistInputScreen";
import BookSearchScreen from "./src/screens/BookSearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MyWishlistScreen from "./src/screens/MyWishlistScreen";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import TradeScreen from "./src/screens/TradeScreen";
import MessageScreen from "./src/screens/MessageScreen";
import MyLibraryScreen from "./src/screens/MessageScreen";

// Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[] | null>([]);

  const homeIcon = require("../book-swap/src/assets/images/icon/home-icon.png");
  const envelopeIcon = require("../book-swap/src/assets/images/icon/envelope-icon.png");
  const bellIcon = require("../book-swap/src/assets/images/icon/bell-icon.png");
  const tradeIcon = require("../book-swap/src/assets/images/icon/trade-icon.png");

  // useEffect(() => {
  //   //query the initial todolist and subscribe to data updates
  //   const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
  //     //isSynced can be used to show a loading spinner when the list is being loaded.
  //     const { items, isSynced } = snapshot;
  //     setUsers(items);
  //   });

  //   //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
  //   return function cleanup() {
  //     subscription.unsubscribe();
  //   };
  // }, []);

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

  const handleInsert = async () => {
    // await DataStore.save(new User({ name, gender: Gender.FEMALE }));
    setName("");
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-nocheck
  // @ts-ignore
  const renderItem = ({ item }) => <Text>{item.name}</Text>;

  function Root() {
    useEffect(() => {
      async function fetchToken() {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setIsAuthenticated(true);
        }
      }
      fetchToken();
    }, []);

    return <Navigation />;
  }

  function AuthStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
          <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
          <Stack.Screen
            name="VerificationCode"
            component={VerificationCode}
          ></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  function AuthenticatedStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Name" component={NameInputScreen}></Stack.Screen>
          <Stack.Screen
            name="Gender"
            component={GenderInputScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Birthdate"
            component={BirthdateInputScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Wishlist"
            component={WishlistInputScreen}
          ></Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="BookSearch"
            component={BookSearchScreen}
          ></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
        <Stack.Screen
          name="MyWishlist"
          component={MyWishlistScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="MyLibrary"
          component={MyLibraryScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }

  function HomeTabs() {
    return (
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={homeIcon} alt="Home" size={5} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={bellIcon} alt="Notification" size={5} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Trade"
          component={TradeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={tradeIcon} alt="Trade" size={5} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image source={envelopeIcon} alt="Message" size={5} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  const RootStack = createNativeStackNavigator();


  function Navigation() {
    return (
      <NavigationContainer>
        <ProfileStack></ProfileStack>
        {/* <HomeTabs></HomeTabs> */}
        {/* 
        {!isAuthenticated && <AuthStack />}
        {isAuthenticated && <AuthenticatedStack />} */}
      </NavigationContainer>
    );
  }
  return (
    <NativeBaseProvider theme={theme}>
      <Root />
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
    </NativeBaseProvider>
  );
}
