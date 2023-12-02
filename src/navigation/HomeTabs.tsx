import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import MessagesScreen from "../screens/MessagesScreen";
import TradingTabs from "./TradingTabs";
import { MaterialIcons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

export default function HomeTabs() {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "primary.50",
        tabBarInactiveTintColor: "primary.100",
        tabBarStyle: {
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
            <Icon
              size="8"
              color={color}
              as={<MaterialIcons name="home" />}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              size="7"
              color={color}
              as={<MaterialIcons name="notifications" />}
            />
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
            <Icon
              size="8"
              color={color}
              as={<MaterialIcons name="swap-vert" />}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              size="6"
              color={color}
              as={<MaterialIcons name="mail-outline" />}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
