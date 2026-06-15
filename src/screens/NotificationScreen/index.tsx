import { Heading, HStack, Text } from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/ui/Screen";

export default function NotificationScreen({ navigation }) {
  return (
    <Screen>
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="center"
        w="100%"
        h={16}
      >
        <Heading>{i18n.t("notifications")}</Heading>
      </HStack>
    </Screen>
  );
}
