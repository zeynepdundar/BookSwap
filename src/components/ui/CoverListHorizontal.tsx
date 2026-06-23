import React from 'react';
import { FlatList, Box, AspectRatio, Image, Pressable, Badge, CloseIcon, VStack, Text } from 'native-base';

export const CoverListHorizontal = ({
  data,
  removeBook = null,
  navigation = null,
}) => {
  
  const renderBookCover = (item) => (
    <Box position="relative">
      <AspectRatio ratio={2 / 3} w="100%">
        <Image
          source={
            item.coverUrl
              ? { uri: item.coverUrl }
              : { uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg" }
          }
          alt={`Cover of ${item.title}`}
          resizeMode="cover"
          rounded="lg" // Büyük kapaklarda daha şık durması için lg yapıldı
        />
      </AspectRatio>

      {!!removeBook && (
        <Pressable
          onPress={() => removeBook(item.id)}
          position="absolute"
          right="-4px"
          top="-4px"
          zIndex={10}
        >
          <Badge rounded="full" w="6" h="6" bg="coolGray.100" p={0} alignItems="center" justifyContent="center" shadow={1}>
            <CloseIcon fontSize={8} color="coolGray.800" />
          </Badge>
        </Pressable>
      )}
    </Box>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      extraData={data}
      keyExtractor={(item) => item.id.toString()}
      // 🔥 paddingHorizontal kaldırıldı çünkü ana ekranın padding'ini kullanıyoruz
      contentContainerStyle={{ paddingLeft: 0, paddingRight: 16 }} 
      renderItem={({ item }) => (
        // Orijinal büyük boyutlara geri dönüldü
        <Box w="110px" mr="4"> 
          {!!removeBook ? (
            renderBookCover(item)
          ) : (
            <Pressable
              onPress={() => navigation?.navigate("BookDetail", { book: item })}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              {renderBookCover(item)}

              {/* Kitap Adı */}
              <Box h="30px" mt={2} justifyContent="flex-start">
                <Text
                  color="coolGray.900"
                  fontWeight="semibold"
                  fontSize="13px"
                  numberOfLines={2}
                  lineHeight="xs"
                >
                  {item.title}
                </Text>
              </Box>

              {/* Yazar Adı */}
              <Box mt={1} h="16px" justifyContent="flex-start">
                <Text
                  color="coolGray.500"
                  fontSize="11px"
                  fontWeight="medium"
                  numberOfLines={1}
                >
                  {item.author}
                </Text>
              </Box>
            </Pressable>
          )}
        </Box>
      )}
    />
  );
};