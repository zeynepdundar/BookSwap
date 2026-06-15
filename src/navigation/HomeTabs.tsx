import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import NotificationScreen from "@/screens/NotificationScreen";
import MessagesScreen from "@/screens/Messages";
import SwapsTabs from "./SwapsTabs";
import HouseIcon from "@/components/ui/icons/HouseIcon";
import ArrowLeftRightIcon from "@/components/ui/icons/ArrowLeftRightIcon";
import MessageSquareIcon from "@/components/ui/icons/MessageSquareIcon";
import i18n from "@/i18n";
import { useSelector } from "react-redux";
import { useMessageSubscription } from "@/hooks/use-message-subscription";
import { HomeTabsParamList } from "@/types/navigation.types";

const BottomTab = createBottomTabNavigator<HomeTabsParamList>();

export default function HomeTabs() {
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const { messages } = useMessageSubscription(firebaseUserId);

  const unseenMessagesCount =
    messages?.reduce((total, item) => total + (item.unseenCount || 0), 0) || 0;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#7F3DFF",
        tabBarInactiveTintColor: "#B8B8C0",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          paddingHorizontal: 24,
          paddingTop: 10,
          borderTopColor: "transparent",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          elevation: 10,
          shadowOpacity: 0.05,
          shadowRadius: 10,
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: i18n.t("home"),
          tabBarIcon: ({ color }) => <HouseIcon size={22} color={color} />,
        }}
      />
      {/* <BottomTab.Screen
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
      /> */}
      <BottomTab.Screen
        name="Swaps"
        component={SwapsTabs}
        options={{
          tabBarLabel: i18n.t("swaps"),
          tabBarIcon: ({ color }) => <ArrowLeftRightIcon size={22} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: i18n.t("messages"),
          tabBarBadge: unseenMessagesCount > 0 ? unseenMessagesCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#7F3DFF",
            color: "#fff",
            fontSize: 10,
            lineHeight: 15,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            top: -2,
            marginLeft: 0,
          },
          tabBarIcon: ({ color }) => (
            <MessageSquareIcon size={22} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
