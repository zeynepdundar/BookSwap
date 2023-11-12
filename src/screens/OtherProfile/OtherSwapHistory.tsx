import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  ArrowBackIcon,
  Image,
  Box,
  Text,
  Pressable,
  Menu,
  VStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signOut } from "../../store/auth-actions";
import { useState } from "react";
import { AlertDialogBox } from "../../components/AlertDialogBox";
import ImagePicker from "../../components/ImagePicker";

export default function OtherSwapHistory() {
  const libraryIcon = require("../../assets/images/icon/library-icon.png");
  const wishlistIcon = require("../../assets/images/icon/wishlist-icon.png");
  const languageIcon = require("../../assets/images/icon/language-icon.png");
  const feedbackIcon = require("../../assets/images/icon/feedback-icon.png");
  const logoutIcon = require("../../assets/images/icon/logout-icon.png");
  const profilePhoto = "jesse-pinkman-profile.png";

  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const signOutHandler = async (): Promise<void> => {
    dispatch(signOut());
  };

  return (
    <Screen>
      <Text>Swap History</Text>
    </Screen>
  );
}
