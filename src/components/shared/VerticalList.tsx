import { useState } from "react";
import {
  FlatList,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Divider,
  Actionsheet,
  Center,
  Icon,
} from "native-base";
import i18n from "../../i18n";
import { InfoDialogBox } from "../InfoDialogBox";
import { MaterialIcons } from "@expo/vector-icons";

export const VerticalList = ({ data, ...props }) => {
  const importUrl = require("../../assets/images/cover_2.png");

  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);


  return (
    <>
      <FlatList
        w="325px"
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <Center
              pl={["3", "4"]}
              pr={["3", "5"]}
              py="2"
              mb="1"
              justifyContent="center"
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Image
                  source={importUrl}
                  alt=" Library"
                  width="74px"
                  height="96px"
                  borderRightRadius={9}
                  shadow="8"
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
                <VStack>
                  {props.secondaryAction && (
                    <Icon
                      onPress={() => {
                        setIsActionSheetOpen(true);
                      }}
                      name={"more-vert"}
                      variant="solid"
                      size="md"
                      as={MaterialIcons}
                    />
                  )}
                  <Spacer />
                  {
                    props.children && props.children(item.id) // <Icon
                  }
                </VStack>
              </HStack>
            </Center>
            <Divider mt="0" mb="3" mx="3" bg="#EEEEEE" />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
      <Actionsheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
      >
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => setIsInfoDialogOpen(true)}>
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
        onClose={() => setIsInfoDialogOpen(false)}
        title={i18n.t("logout")}
        description={i18n.t("are-you-sure-log-out")}
        confirmButtonLabel={i18n.t("logout")}
      />
    </>
  );
};
