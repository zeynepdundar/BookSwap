import { NavigationProp } from '@react-navigation/native';

export const resetToHome = (navigation: NavigationProp<any>) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
}; 