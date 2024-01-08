import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  FlatList,
  Text,
  VStack,
  HStack,
  Spacer,
  Center,
  ArrowBackIcon,
  Divider,
  Avatar,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { useRoute } from "@react-navigation/native";

const DUMMY_USERS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    userName: "Skyler White",
    photoUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    userName: "The Path Made Clear",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    userName: "The Path Made Clear",
    photoUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    userName: "The Path Made Clear",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    userName: "The Path Made Clear",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];

export default function UserListScreen({ navigation }) {
  const route = useRoute();
  // const usersTemp = route?.params?.users;
  console.log("route", route.params);
    const importUrl = require("../assets/images/cover_1.png");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [users, setUsers] = useState(DUMMY_USERS);

  const [libraryItems, setLibraryItem] = useState<any>([]);

  useEffect(() => {

    setUsers(usersTemp);
  }, []);

  const addLibraryItemHandler = (selectedLibraryItem: any) => {
    setLibraryItem((currentLibraryItems) => [
      ...currentLibraryItems,
      { id: selectedLibraryItem.id, userName: selectedLibraryItem.name },
    ]);
  };

  const removeLibraryItemHandler = (id: string) => {
    setLibraryItem((currentLibraryItems) => {
      return currentLibraryItems.filter((item) => item.id !== id);
    });
  };

  const isSelectedItem = (id: string) => {
    const existingLibraryItemIndex = libraryItems.findIndex(
      (item) => item.id === id
    );
    return existingLibraryItemIndex !== -1;
  };

  const searchBookuserNameHandler = (enteredBookuserName) => {
    console.log("Searching..", enteredBookuserName);
  };

  const pressHandler = () => {
    console.log("Selected Library Items");
    navigation.goBack();
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center">
        <HStack
          alignItems="center"
          space="26%"
          justifyContent="space-between"
          w="100%"
          h={16}
        >
          <Button
            variant="ghost"
            leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          ></Button>
          <Heading w="145">{i18n.t("ask-for-swap")}</Heading>
          <Spacer></Spacer>   

        </HStack>
        {/* {data.length > 0 && (
          <Center w="100%"  px={6}>
            <HorizontalCoverList data={data} editable={true}/>
          </Center>
        )} */}
        <FlatList
          w="325px"
          data={users}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <Center mx="3" mb="1" justifyContent="center" h="76">
                <HStack space={[4, 6]} justifyContent="space-between">
                  <Avatar source={importUrl} />
                  <Text
                    color="#000000"
                    fontSize="16"
                    alignSelf="center"
                    width="105px"
                  >
                    {item.name}
                  </Text>

                  <Spacer />
                  <Button
                    variant="primary"
                    right={0}
                    bottom="0"
                    position="absolute"
                    p={2}
                    px="0"
                    width={126}
                  >
                    {i18n.t("send-offer")}
                  </Button>
                </HStack>
              </Center>
              <Divider mt="0" mb="3" mx="3" bg="#EEEEEE" />
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      </VStack>
    </Screen>
  );
}
