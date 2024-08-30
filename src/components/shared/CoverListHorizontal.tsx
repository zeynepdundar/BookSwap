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

export const CoverListHorizontal = ({ data, removeBook = null }) => {
  const noCoverUrl = require("../../assets/images/no-cover.jpg");
  return (
    <FlatList
      maxH="250px"
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      extraData={data}
      renderItem={({ item }) => (
        <VStack w="120px" justifyContent="center" mr="1" key={item.id}>
          <Box pt={2} h="160px" w="100%">
            <AspectRatio ratio={2 / 3} w="90%" h="100%">
              <Image
                source={
                  item.coverUrl
                    ? { uri: item.coverUrl }
                    : {
                        //TODO Use the static import URL here
                        uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                      }
                }
                alt={`Cover of ${item.title} by ${item.author}`}
                resizeMode="cover"
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
              <Box h="50px" justifyContent="center">
                <Text
                  p={1}
                  bold
                  fontSize={12}
                  numberOfLines={2}
                  mt={1}
                  maxH="60px"
                >
                  {item.title}
                </Text>
              </Box>
              <Text
                px={1}
                color="#838384"
                fontSize={11}
                numberOfLines={1}
                mt="-1"
              >
                {item.author}
              </Text>
            </>
          )}
        </VStack>
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};
