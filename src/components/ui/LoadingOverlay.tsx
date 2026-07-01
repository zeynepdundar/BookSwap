import { Spinner, Text, Center } from "native-base";

export const LoadingOverlay = ({ message = null }) => {
  return (
    <Center flex={1} bg="gray.100">
      {message && (
        <Text mb={3} color="gray.500" fontSize="sm">
          {message}
        </Text>
      )}

      <Spinner color="primary.500" size="md" />
    </Center>
  );
};