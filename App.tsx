import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { NativeBaseProvider, Text } from "native-base";
// import { Amplify, DataStore } from "aws-amplify";
// import awsconfig from "./src/aws-exports";
import { theme } from "./src/theme";
import { Gender, User } from "./src/models";
import Navigation from "./src/navigation";

// Amplify.configure(awsconfig);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[] | null>([]);

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
          setIsNewUser(false)
        }
      }

      fetchToken();
    }, []);


    return <Navigation isAuthenticated={false} />;
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
