import { Center, Text } from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { VerticalList } from "../../components/shared/VerticalList";

export default function OtherLibraryScreen() {
  const sendOffer = (event: any) => {
  };

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
      <Center>
        <VerticalList data={data} onAction={sendOffer} />
      </Center>
    </Screen>
  );
}
