import React from "react";
import { Center, Alert, Text } from "native-base";

export const ErrorAlert = ({ message }) => (
  <Center>
    <Alert
      w="80%"
      borderRadius="10px"
      backgroundColor="black.700"
      shadow="9"
      py="5"
      position="absolute"  // Set to absolute
      bottom={10}          // Adjust bottom spacing as needed
      zIndex={100}  
    >
      <Text fontSize="sm" fontWeight="medium" color="#dddddd">
        {message}
      </Text>
    </Alert>
  </Center>
);
