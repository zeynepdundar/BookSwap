import { View, StyledProps } from "native-base";
import {
  ScrollView,
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

export const Screen: React.FC<Props> = ({ scroll, style, children }) => {
  return scroll ? (
    <ScrollView
    //   testID="scrollview-screen"
    //   contentContainerStyle={styles.contentContainer}
    //   style={[styles.container, { backgroundColor }, style]}
    //   showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, style]}>{children}</View>
  );
};
export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    height: height,
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 36,
  },
});
