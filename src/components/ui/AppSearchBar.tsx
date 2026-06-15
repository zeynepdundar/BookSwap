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
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                ref={inputRef}
                h="12"
                width="100%"
                borderRadius="16"
                bg="#F8FAFC"
                borderWidth="1"
                borderColor="#EEF2F7"
                px="2"
                fontSize="15"
                fontWeight="400"
                color="#1F2937"
                placeholderTextColor="#94A3B8"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                _focus={{
                    bg: "#FFFFFF",
                    borderColor: "primary.500",
                    style: {
                        shadowColor: "#000",
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 3,
                    },
                }}
                InputLeftElement={
                    <Icon
                        ml="4"
                        size="5"
                        color="#64748B"
                        as={<MaterialCommunityIcons name="magnify" />}
                    />
                }
                InputRightElement={
                    <Pressable
                        onPress={scanBarcodeHandler}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                        {({ isPressed }) => (
                            <Box
                                mr="3"
                                h="9"
                                w="9"
                                bg={isPressed ? "primary.100" : "#F8FAFC"}
                                borderRadius="12"
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    transform: [{ scale: isPressed ? 0.95 : 1 }],
                                }}
                            >
                                <Icon
                                    size="5"
                                    color={isPressed ? "primary.600" : "primary.500"}
                                    as={MaterialCommunityIcons}
                                    name="barcode-scan"
                                />
                            </Box>
                        )}
                    </Pressable>
                }
            />
        </Box>
    );
}