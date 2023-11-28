import React, { useState } from "react";

import Screen from "../components/Screen";
import { Button, Text } from "native-base";

export default function MessagesScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");

  const handlePress = (name, uid, friendId) => {
    console.log("User: ", name);
    setUserId(uid);
    setFriendId(friendId);
  }

  return (
    <Screen>
      <Text>Who are you</Text>
      <Button
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
      </Button>
    </Screen>
  );
}
