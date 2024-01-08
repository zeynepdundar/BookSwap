import {
  FlatList,
  Box,
  AspectRatio,
  Image,
  Badge,
  CloseIcon,
  VStack,
  Text,
  Pressable,
} from "native-base";

export const HorizontalCoverList = ({ data, removeBook }) => {

  return (
    <FlatList
      maxH="250px"
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      extraData={data}
      renderItem={({ item }) => (
        <VStack w="110px" justifyContent="center" mr="6px">
          <Box pt={2} h="150" w="98">
            <AspectRatio
              ratio={{
                base: 41 / 62,
              }}
              h="95%"
            >
              <Image
                source={{ uri: item.coverUrl }}
                alt={`Cover of ${item.title} by ${item.author}`}
              />
            </AspectRatio>
            {removeBook && (
              <Pressable
                onPress={() => removeBook(item.id)}
                position="absolute"
                right={0}
                top={0}
              >
                <Badge rounded="100" w="7" h="7" bg="#F2F2F2">
                  <CloseIcon fontSize={10} color="coolGray.800" />
                </Badge>
              </Pressable>
            )}
          </Box>
          {!removeBook && (
            <>
              <Text p={1} bold fontSize={11}>
                {item.title}
              </Text>
              <Text px={1} fontSize={10} color="#838384">
                by {item.author}
              </Text>
            </>
          )}
        </VStack>
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};
