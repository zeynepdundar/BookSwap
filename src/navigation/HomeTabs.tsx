import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import HomeScreen from "@/screens/HomeScreen";
import MessagesScreen from "@/screens/Messages";
import SwapsTabs from "./SwapsTabs";
import HouseIcon from "@/components/ui/icons/HouseIcon";
import ArrowLeftRightIcon from "@/components/ui/icons/ArrowLeftRightIcon";
import MessageSquareIcon from "@/components/ui/icons/MessageSquareIcon";
import i18n from "@/i18n";
import { useMessageSubscription } from "@/hooks/useMessageSubscription";
import { HomeTabsParamList } from "@/types/navigation.types";

const BottomTab = createBottomTabNavigator<HomeTabsParamList>();

export default function HomeTabs() {
  // Redux tiplemesi düzeltildi (Kendi RootState tipinizi buraya verebilirsiniz)
  const firebaseUserId = useSelector((state: any) => state.auth.user?.firebaseUserId);
  const { messages } = useMessageSubscription(firebaseUserId);

  const unseenMessagesCount = React.useMemo(() => {
    return messages?.reduce((total, item) => total + (item.unseenCount || 0), 0) || 0;
  }, [messages]); // Performance optimization: useMemo ile gereksiz hesaplamaları önledik

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
          height: 78, // Cihaz alt boşluğu (Safe Area) için ideal yükseklik
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 20, // Alt barın yazılarını modern cihazlarda yukarı çeker
          borderTopColor: "transparent",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 12,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
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
            lineHeight: 14,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarIcon: ({ color }) => <MessageSquareIcon size={22} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}