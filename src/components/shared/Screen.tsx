import { ScrollView, View } from "native-base";
import {
  ViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props extends ViewProps {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Screen: React.FC<Props & { noPadding?: boolean }> = ({ scroll, style, children, noPadding }) => {
  return scroll ? (
    <ScrollView showsVerticalScrollIndicator={false}
    //   testID="scrollview-screen"
    //   contentContainerStyle={styles.contentContainer}
    //   style={[styles.container, { backgroundColor }, style]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, { padding: noPadding ? 0 : 16 }, style]}backgroundColor="#fff" >{children}</View>
  );
};
export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    height: height,
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 36,
  },
});
