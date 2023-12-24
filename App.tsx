import { useState, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { theme } from "./src/theme";
import Navigation from "./src/navigation";
import store, { AppDispatch } from "./src/store/store";

export default function App() {
  useEffect(() => {}, []);

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
