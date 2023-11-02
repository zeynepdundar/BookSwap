import { Spinner, Text, Box } from "native-base";

export const LoadingOverlay = ({ message = null }) => {
  return (
    <Box p={5}>
      {message && <Text mb={3}>{message}</Text>}
      <Spinner color="indigo.500" size="sm" />
    </Box>
  );
};