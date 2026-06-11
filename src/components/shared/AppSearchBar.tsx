import React from "react";
import { Box, Input, Icon, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import i18n from "@/i18n";

interface AppSearchBarProps {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    scanBarcodeHandler: () => void;
    inputRef?: React.RefObject<any>;
}

export function AppSearchBar({
    searchQuery,
    setSearchQuery,
    scanBarcodeHandler,
    inputRef,
}: AppSearchBarProps) {
    return (
        <Box w="100%" h={16} justifyContent="center" bg="white">
            <Input
                placeholder={i18n.t("search-book-by-title")}
                width="100%"
                h="12"
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderRadius="10"
                py="3"
                px="2"
                fontSize="15"
                fontWeight="500"
                bg="##F3F4F6"
                borderWidth="1"
                borderColor="#E5E7EB"
                autoFocus
                _focus={{ borderColor: "primary.50", bg: "#F3F4F6" }}
                ref={inputRef}
                InputLeftElement={
                    <Icon m="2" ml="4" size="5" color="#4B5563" as={<MaterialCommunityIcons name="magnify" />} />
                }
                InputRightElement={
                    <Pressable
                        onPress={scanBarcodeHandler}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                        {({ isPressed }) => (
                            <Box
                                mr="2.5" // Tucks it neatly inside the right cushion of the input field
                                h="9"    // Slightly smaller than full-height to create an elegant border gap
                                w="9"    // Balanced 1:1 perfect square circle aspect ratio
                                bg={isPressed ? "primary.50" : "transparent"} // Soft isolated background flash
                                borderRadius="10" // Uniform chic rounding on all 4 corners
                                borderWidth="1"
                                borderColor={isPressed ? "primary.100" : "transparent"} // Clean bounding border frame on tap
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    // Ultra-subtle, snappy micro-scale click physics
                                    transform: [{ scale: isPressed ? 0.90 : 1 }]
                                }}
                            >
                                <Icon
                                    size="5" // Refined 20px glyph size to keep lines looking crisp and minimal
                                    color={isPressed ? "white" : "primary.50"}
                                    name="crop-free"
                                    as={MaterialCommunityIcons}
                                />
                            </Box>
                        )}
                    </Pressable>
                }
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
            />
        </Box>
    );
}