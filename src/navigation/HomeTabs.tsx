import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "native-base";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import TradeScreen from "../screens/Trading/HistoryScreen";
import MessageScreen from "../screens/MessageScreen";
import TradingTabs from "./TradingTabs";

const BottomTab = createBottomTabNavigator();

export default function HomeTabs() {
  const homeIcon = require("../assets/images/icon/home-icon.png");
  const envelopeIcon = require("../assets/images/icon/envelope-icon.png");
  const bellIcon = require("../assets/images/icon/bell-icon.png");
  const tradeIcon = require("../assets/images/icon/trade-icon.png");

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{   
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#7F3DFF",
        tabBarInactiveTintColor: "#e1d0ff",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          height: 90,
          paddingHorizontal: 10,
          borderTopColor: "#B3B3B3",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={homeIcon} alt="Home" size={5} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={bellIcon} alt="Notification" size={5} />
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "#7F3DFF", color: "#fff" },
        }}
      />
      <BottomTab.Screen
        name="Trading"
        component={TradingTabs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={tradeIcon} alt="Trade" size={5} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={envelopeIcon} alt="Message" size={5} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
