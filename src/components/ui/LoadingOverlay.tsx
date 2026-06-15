import { Spinner, Text, Center } from "native-base";

export const LoadingOverlay = ({ message = null }) => {
  return (
    // TODO: Verify that the background color is appropriate for each sharing component.
    <Center p={5} height="100%" bg="#fff">
      {message && <Text mb={3}>{message}</Text>}
      <Spinner color="indigo.500" size="sm" />
    </Center>
  );
};
