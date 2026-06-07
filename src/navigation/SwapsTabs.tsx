// SwapsTabs.tsx
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Center, Heading, Box } from "native-base";
import { useWindowDimensions, Platform, StatusBar } from "react-native";

import i18n from "@/i18n";
import { ReceivedScreen, SentScreen, HistoryScreen } from "@/screens";
import { SwapsTabsParamList } from "@/types/navigation.types";
import { useOffersSync } from "@/hooks/api/useOffersSync";

const Tab = createMaterialTopTabNavigator<SwapsTabsParamList>();

export default function SwapsTabs() {
  const { width } = useWindowDimensions();
  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const { syncHistory } = useOffersSync();

  return (
    <Box flex={1} bg="#fff" safeAreaTop pt={Platform.OS === "android" ? `${paddingTop}px` : 0}>
      
      {/* Synchronized Header Area using your reference */}
      <Center w="100%" h="50px">
        <Heading>{i18n.t("swaps")}</Heading>
      </Center>

      <Box flex={1}>
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
      </Box>
    </Box>
  );
}