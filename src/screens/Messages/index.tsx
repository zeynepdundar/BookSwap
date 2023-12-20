import React, { useState } from "react";

import Screen from "../../components/Screen";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import i18n from "../../i18n";

const DUMMY_USERS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Afreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujita Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];

export default function MessagesScreen({ navigation }) {
  const [users, setUsers] = useState(DUMMY_USERS);


  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");

  const handlePress = (name, uid, friendId) => {
    setUserId(uid);
    setFriendId(friendId);
    navigation.navigate("Chat", { userId: uid, friendId: friendId })
  };

  return (
    <Screen>
      {/* <Text>Who are you</Text> */}
      {/* <Button
        bg="primary.100"
        m="7"
        _text={{
          color: "primary.50",
        }}
        onPress={() => handlePress("Alex", "hNYjBXSZEpAdAuReEvbr", "AhAiD1dxrrCCXvrCOE1N")}
      >
        Alex
      </Button>
      <Button
        bg="primary.100"
        m="7"
        _text={{
          color: "primary.50",
        }}
        onPress={() => handlePress("Tomas", "AhAiD1dxrrCCXvrCOE1N", "hNYjBXSZEpAdAuReEvbr")}
      >
        Tomas
      </Button>
      <Button
        bg="primary.300"
        m="7"
        _text={{ 
          color: "primary.50",
        }}
        onPress={() => navigation.navigate("Chat", { userId: userId, friendId: friendId })}
      >
        Start
      </Button> */}
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="center"
        w="100%"
        h={16}
      >
        <Heading>{i18n.t("my-messages")}</Heading>
      </HStack>

      {users.length > 0 && (
        <FlatList
          w="100%"
          data={users}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress("Alex", "hNYjBXSZEpAdAuReEvbr", "AhAiD1dxrrCCXvrCOE1N")}>
              <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text color="coolGray.800" fontSize="md">
                      {item.fullName}
                    </Text>
                    <Text color="coolGray.500" fontSize="sm">
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text
                      fontSize="xs"
                      color="coolGray.500"
                      alignSelf="flex-start"
                    >
                      {item.timeStamp}
                    </Text>
                    <Badge 
                      bg="primary.50"
                      rounded="5"
                      zIndex={1}
                      variant="solid"
                      alignSelf="flex-end"
                      _text={{
                        fontSize: 12,
                      }}
                    >
                      2
                    </Badge>
                  </VStack>
                </HStack>
                <Divider my="2"></Divider>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Screen>
  );
}
