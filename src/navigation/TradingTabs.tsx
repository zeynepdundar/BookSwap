import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Center, Heading, HStack } from "native-base";
import { Dimensions } from "react-native";
import Screen from "../components/Screen";
import i18n from "../i18n";
import HistoryScreen from "../screens/Trading/HistoryScreen";
import SentScreen from "../screens/Trading/SentScreen";
import ReceivedScreen from "../screens/Trading/ReceivedScreen";

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

export default function TradingTabs() {
  return (
    <Screen>
      <Center w="100%" h="40px">
        <Heading>{i18n.t("trading")}</Heading>
      </Center>
      <Tab.Navigator
        initialRouteName="Received"
        screenOptions={{
          tabBarActiveTintColor: "#001833",
          tabBarInactiveTintColor: "#D8D8D8",
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
          },
          tabBarStyle: { backgroundColor: "#fff"},
          tabBarAllowFontScaling: false,
          tabBarIndicatorStyle: { backgroundColor: "#7F3DFF" },
        }}
        initialLayout={{ width: width }}
      >
        <Tab.Screen
          name="Received"
          component={ReceivedScreen}
          options={{ tabBarLabel: i18n.t("received") }}
        />
        <Tab.Screen
          name="Sent"
          component={SentScreen}
          options={{ tabBarLabel: i18n.t("sent") }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ tabBarLabel: i18n.t("history") }}
        />
      </Tab.Navigator>
    </Screen>
  );
}
