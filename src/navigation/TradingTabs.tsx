import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Heading, HStack } from "native-base";
import Screen from "../components/Screen";
import i18n from "../i18n";
import HistoryScreen from "../screens/Trading/HistoryScreen";
import ProposeScreen from "../screens/Trading/ProposeScreen";
import RequestScreen from "../screens/Trading/RequestScreen";

const Tab = createMaterialTopTabNavigator();

export default function TradingTabs() {
  return (
    <Screen>
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="center"
        w="100%"
        h={16}
      >
        <Heading>{i18n.t("trading")}</Heading>
      </HStack>

      <Tab.Navigator
        initialRouteName="Request"
        screenOptions={{
          tabBarActiveTintColor: "#001833",
          tabBarInactiveTintColor: "#D8D8D8",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: {backgroundColor:"transparent"},
          tabBarAllowFontScaling: true,
          tabBarPressColor: "#001833",
          tabBarIndicatorContainerStyle: { alignContent: "center"},
          tabBarGap: 25,
        }}
      >
        <Tab.Screen
          name="Request"
          component={RequestScreen}
          options={{ tabBarLabel: i18n.t("request") }}
        />
        <Tab.Screen
          name="Propose"
          component={ProposeScreen}
          options={{ tabBarLabel: i18n.t("propose") }}
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
