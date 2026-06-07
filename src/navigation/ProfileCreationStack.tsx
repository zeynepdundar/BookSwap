import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NameInputScreen,
  GenderInputScreen,
  BirthdateInputScreen,
  PhotoInputScreen,
  WishlistInputScreen,
  LibraryInputScreen,
  BookSearchOnCreationScreen,
} from "@/screens/ProfileCreation";
import { ProfileCreationStackParamList } from "@/types/navigation.types";

const Stack = createNativeStackNavigator<ProfileCreationStackParamList>();


export default function ProfileCreationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="NameInput" component={NameInputScreen}></Stack.Screen>
      <Stack.Screen
        name="GenderInput"
        component={GenderInputScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="BirthdateInput"
        component={BirthdateInputScreen}
      ></Stack.Screen>
      <Stack.Screen name="PhotoInput" component={PhotoInputScreen}></Stack.Screen>
      <Stack.Screen
        name="WishlistInput"
        component={WishlistInputScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="LibraryInput"
        component={LibraryInputScreen}
      ></Stack.Screen>

      {/* Search screen specific only to the onboarding flow */}
      <Stack.Screen
        name="BookSearchOnCreation"
        component={BookSearchOnCreationScreen}
      />
    </Stack.Navigator>
  );
}
