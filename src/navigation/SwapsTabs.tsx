import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions } from "react-native";

import i18n from "@/i18n";
import { ReceivedScreen, SentScreen, HistoryScreen } from "@/screens";
import { SwapsTabsParamList } from "@/types/navigation.types";
import { useOffersSync } from "@/hooks/api/useOffersSync";
import ScreenHeader from "@/components/ui/ScreenHeader";
import Screen from "@/components/ui/Screen";

const Tab = createMaterialTopTabNavigator<SwapsTabsParamList>();

export default function SwapsTabs() {
  const { width } = useWindowDimensions();
  const { syncHistory } = useOffersSync();

  return (
    <Screen full>
      <ScreenHeader title={i18n.t("swaps")} />

      <Tab.Navigator
        initialRouteName="Received"
        initialLayout={{ width }}
        screenOptions={{
          tabBarActiveTintColor: "#7F3DFF",
          tabBarInactiveTintColor: "#8E8E93",

          tabBarLabelStyle: {
            fontSize: 13,
            fontFamily: "poppins-medium",
            textTransform: "none",
          },
          tabBarItemStyle: {
            flex: 1,
          },

          tabBarStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#F2F2F7",
          },

          tabBarIndicatorStyle: {
            backgroundColor: "#7F3DFF",
            height: 3,
            borderRadius: 3,
          },

          tabBarAllowFontScaling: false,
        }}
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
          listeners={{
            focus: () => syncHistory(),
          }}
        />
      </Tab.Navigator>
    </Screen>
  );
}