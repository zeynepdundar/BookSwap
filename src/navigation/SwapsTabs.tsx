import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions} from "react-native";

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
      <ScreenHeader
        title={i18n.t("swaps")}
      />
      <Tab.Navigator
        initialRouteName="Received"
        screenOptions={{
          tabBarActiveTintColor: "#001833",
          tabBarInactiveTintColor: "#D8D8D8",
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 48,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarAllowFontScaling: false,
          tabBarIndicatorStyle: { backgroundColor: "#7F3DFF" },
        }}
        initialLayout={{ width }}
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