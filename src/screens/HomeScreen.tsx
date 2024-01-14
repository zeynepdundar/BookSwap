import {
  AspectRatio,
  Box,
  Center,
  FlatList,
  Flex,
  Heading,
  Image,
  Pressable,
  Text,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { HorizontalCoverList } from "../components/shared/HorizontalCoverList";
import SearchBar from "../components/shared/SearchBar";
import { useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const jesse = require("../assets/images/jesse-pinkman.png");

  const { name } = useSelector((state: any) => state.profile.profile);

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "The Path Made Clear",
      author: "Oprah Winfrey",
      coverUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "The Path Made Clear",
      author: "Oprah Winfrey",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "The Path Made Clear",
      author: "Oprah Winfrey",
      coverUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      title: "The Path Made Clear",
      author: "Oprah Winfrey",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      title: "The Path Made Clear",
      author: "Oprah Winfrey",
      coverUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];

  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex my="4">
          <Heading color="coolGray.800">{i18n.t("hello")}</Heading>
          <Text color="coolGray.800" fontWeight="500" fontSize={16}>
            {name}
          </Text>
        </Flex>
        <Pressable
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Profile" })
          }
        >
          <Image source={jesse} alt="Notification" size={10} />
        </Pressable>
      </Flex>
      <SearchBar
        onSearchBook={() => {
          navigation.navigate("BookSearch", {
            relatedScreen: "Home",
          });
        }}
        onScanBarcode={() => {
          navigation.navigate("BarcodeScanner", {
            relatedScreen: "Home",
          });
        }}
        onFocus={() => {
          navigation.navigate("BookSearch", {
            relatedScreen: "Home",
          });
        }}
      />
      {data.length > 0 && (
        <Box mt="6">
          <Text color="black.400" fontWeight="700">
            Recently Added
          </Text>

          <Center w="100%">
            <HorizontalCoverList data={data} />
          </Center>
        </Box>
      )}
      {data.length > 0 && (
        <Box mt="6">
          <Text color="black.400" fontWeight="700">
            Most Popular
          </Text>

          <Center w="100%">
            <HorizontalCoverList data={data} />
          </Center>
        </Box>
      )}
    </Screen>
  );
}
