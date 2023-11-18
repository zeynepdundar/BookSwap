import { useState } from "react";
import {
  FlatList,
  Box,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Divider,
  Button,
  Pressable,
  Actionsheet,
} from "native-base";
import i18n from "../../i18n";
import { InfoDialogBox } from "../InfoDialogBox";

export const VerticalList = ({ data, onAction }) => {
  const importUrl = require("../../assets/images/cover_2.png");
  const icon = require("../../assets/images/icon/dots-icon.png");

  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);


  data.forEach((item) => {
    console.log(item);
  });

  const pressHandler = () => {
    //Navigate to trade creating screen
  };


  return (
    <>
      <FlatList
        w="100%"
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <Box pl={["3", "4"]} pr={["3", "5"]} py="2" mb="1">
              <HStack space={[2, 3]} justifyContent="space-between">
                <Image
                  source={importUrl}
                  alt=" Library"
                  width="85"
                  height="100"
                />
                <VStack>
                  <Text color="#000000">{item.title}</Text>
                  <Text color="#8c8c8c" fontSize="xs">
                    {item.author}
                  </Text>
                  <Text color="#8c8c8c" fontSize="9px">
                    Can Publications
                  </Text>
                </VStack>
                <Spacer />
                <Pressable
                  onPress={() => {
                    setIsActionSheetOpen(true);
                  }}
                >
                  <Image source={icon} alt=" Library" />
                </Pressable>
                <Button
                  variant="outline"
                  onPress={pressHandler}
                  right={0}
                  bottom="0"
                  position="absolute"
                  p={2}
                  px="0"
                >
                  {i18n.t("send-offer")}
                </Button>
              </HStack>
            </Box>
            <Divider my="1" bg="#EEEEEE" />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
      <Actionsheet isOpen={isActionSheetOpen} onClose={()=>setIsActionSheetOpen(false)}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={()=>setIsInfoDialogOpen(true)}>
            {i18n.t("add-my-wishlist")}
          </Actionsheet.Item>
          <Actionsheet.Item onPress={null}>
            {i18n.t("add-my-library")}
          </Actionsheet.Item>
          <Actionsheet.Item onPress={null}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={()=>setIsInfoDialogOpen(false)}
          title={i18n.t("logout")}
          description={i18n.t("are-you-sure-log-out")}
          confirmButtonLabel={i18n.t("logout")}
        />
    </>
  );
};
