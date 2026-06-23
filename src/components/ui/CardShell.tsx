import { Box } from "native-base";

export function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      mx="4"
      my="2"
      p="4"
      bg="white"
      borderRadius="16"
      borderWidth="1"
      borderColor="coolGray.100"
    >
      {children}
    </Box>
  );
}