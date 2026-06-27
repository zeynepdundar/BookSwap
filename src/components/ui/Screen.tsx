import React from "react";
import { ScrollView, View } from "native-base";
import { ViewProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // 🔥 Çentiği milimetrik alan kütüphane

interface ScreenProps extends ViewProps {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  full?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  scroll,
  style,
  children,
  noPadding,
  full,
  ...rest
}) => {
  const insets = useSafeAreaInsets(); // 🔥 Cihazın gerçek üst boşluğunu (notch) alır

  // Kenar boşlukları (İstediğiniz gibi ne az ne çok, ideal 16px)
  const paddingHorizontal = full ? 0 : noPadding ? 0 : 16;
  
  // Üst güvenli alan: Eğer tam ekran (full) değilse cihazın çentik yüksekliğini dinamik ekler
  const paddingTop = full ? 0 : (insets.top > 0 ? insets.top : 16); 
  
  // Alt boşluk: Tab bar absolute olmadığı için hafif bir nefes payı yeterli
  const paddingBottom = full ? 0 : insets.bottom; 

  if (scroll) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, style]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal, paddingTop, paddingBottom }
        ]}
        {...rest}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal, paddingTop, paddingBottom },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
});