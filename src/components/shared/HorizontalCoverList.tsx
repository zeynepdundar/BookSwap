import { useState } from "react";
import {
  Center,
  FlatList,
  Box,
  AspectRatio,
  Image,
  Badge,
  CloseIcon,
  HStack,
  VStack,
  Text,
} from "native-base";
import i18n from "../../i18n";

export const HorizontalCoverList = ({ data, editable = true }) => {
  const importUrl = require("../../assets/images/cover_2.png");
  data.forEach((item) => {
    console.log(item);
  });

  return (
    <FlatList
      maxH="250px"
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <VStack w="110px" justifyContent="center">
          <Box h={160} pt={2}>
            <AspectRatio
              ratio={{
                base: 3 / 4,
                md: 9 / 10,
              }}
            >
              <Image source={importUrl} alt="image base" />
            </AspectRatio>
            {editable && (
              <Badge
                rounded="100"
                w="7"
                h="7"
                bg="#F2F2F2"
                position="absolute"
                right={0}
                top={0}
              >
                <CloseIcon fontSize={10} color="coolGray.800" />
              </Badge>
            )}
          </Box>
          {!editable && (
            <>
              <Text p={1} bold fontSize={11}>{item.title}</Text>
              <Text px={1} fontSize={10} color="#838384">by {item.author}</Text>
            </>
          )}
        </VStack>
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};
