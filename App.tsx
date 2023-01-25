import { useFonts } from 'expo-font';
import { NativeBaseProvider, Center, Button, Text, Input } from "native-base";
import { theme } from './src/theme';
import { useState, useEffect } from 'react';

import { Amplify, DataStore } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Gender, User } from './src/models';
import { FlatList } from 'react-native';
import Welcome from "./src/screens/Welcome";
import Auth from "./src/screens/auth";

Amplify.configure(awsconfig);

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[] | null>([]);

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
        //isSynced can be used to show a loading spinner when the list is being loaded. 
        const { items, isSynced } = snapshot;
        setUsers(items);
      });
  
      //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
      return function cleanup() {
        subscription.unsubscribe();
      }
  }, []);

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
    await DataStore.save(new User({ name, gender:Gender.FEMALE }));
    setName('');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-nocheck
  // @ts-ignore
  const renderItem = ({ item }) => (
        <Text>{item.name}</Text>
  );

  return (
    <NativeBaseProvider theme={theme}>
      <Auth></Auth>
      {/* <Welcome></Welcome> */}
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
