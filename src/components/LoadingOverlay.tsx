import { Spinner, Text, Center } from "native-base";

export const LoadingOverlay = ({ message =null}) => {
  return (
    <Center p={5} height="100%">
      {message && <Text mb={3}>{message}</Text>}
      <Spinner color="indigo.500" size="sm" />
    </Center>
  );
};