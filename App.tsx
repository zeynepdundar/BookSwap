import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import {
  Button,
  Center,
  FlatList,
  Input,
  NativeBaseProvider,
} from "native-base";
import { Amplify } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { createUser, createEdition } from "./src/graphql/mutations";
import { listUsers } from "./src/graphql/queries";
import awsExports from "./src/aws-exports";
import { theme } from "./src/theme";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store/store";
import BookSearchScreen from "./src/screens/BookSearchScreen";

const EDITIONS = [
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-29T18:13:09.199231",
    },
    title: "Pharmacists Bill [H.L.]",
    number_of_pages: 2,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108360206"],
    isbn_10: ["0108360202"],
    publish_date: "May 30, 1997",
    key: "/books/OL10000259M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["314726356"],
    works: [{ key: "/works/OL14893274W" }],
    type: { key: "/type/edition" },
    revision: 3,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-29T08:48:44.702046",
    },
    title: "Wireless Telegraphy Bill (H.L.) (House of Lords Bills)",
    number_of_pages: 12,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108360350"],
    isbn_10: ["0108360350"],
    publish_date: "July 1997",
    key: "/books/OL10000274M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["314726345"],
    works: [{ key: "/works/OL14901660W" }],
    type: { key: "/type/edition" },
    subjects: ["English law: communications law"],
    revision: 3,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-25T23:22:41.733330",
    },
    title: "Social Security Bill (House of Lords Bills)",
    number_of_pages: 102,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108360978"],
    isbn_10: ["0108360970"],
    publish_date: "April 1998",
    key: "/books/OL10000326M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["314948600"],
    works: [{ key: "/works/OL14902088W" }],
    type: { key: "/type/edition" },
    subjects: ["English law: social insurance"],
    revision: 3,
  },
  {
    other_titles: ["Troubadour"],
    publishers: ["Runestone Press"],
    identifiers: { goodreads: ["608525"], librarything: ["545689"] },
    description: {
      type: "/type/text",
      value:
        "Presents factual information about these lyric poets of medieval Europe as well as a fictional account of Peire Vidal, a twelfth century troubadour from Provence, France.",
    },
    isbn_10: ["0822519151"],
    covers: [7264084],
    lc_classifications: ["PC3304 .P4713 1997", "PC3304.P4713 1997"],
    latest_revision: 10,
    key: "/books/OL1000072M",
    authors: [{ key: "/authors/OL38343A", name: "R\u00e9gine Pernoud" }],
    ocaid: "daywithtroubadou00pern",
    publish_places: ["Minneapolis"],
    contributions: ["Bacchin, Giorgio, ill.", "Clift, Dominique."],
    work_title: ["Trovatore."],
    pagination: "48 p. :",
    source_records: [
      "ia:daywithtroubadou00pern",
      "bwb:9780822519157",
      "marc:marc_loc_2016/BooksAll.2016.part25.utf8:103836014:1267",
    ],
    title: "A day with a troubadour",
    dewey_decimal_class: ["841/.109"],
    notes: {
      type: "/type/text",
      value: "Includes bibliographical references (p. 46) and index.",
    },
    number_of_pages: 48,
    created: { type: "/type/datetime", value: "2008-04-01T03:28:50.625462" },
    languages: [{ key: "/languages/eng" }],
    lccn: ["96038952"],
    subjects: [
      "Peire Vidal, fl. 1200 -- Juvenile fiction.",
      "Peire Vidal, fl. 1200 -- Fiction.",
      "Troubadours -- Juvenile literature.",
      "Troubadours.",
    ],
    publish_date: "1997",
    publish_country: "mnu",
    last_modified: {
      type: "/type/datetime",
      value: "2020-11-23T14:04:33.878296",
    },
    by_statement:
      "by Re\u0301gine Pernoud ; illustrations by Giorgio Bacchin ; translated by Dominique Clift.",
    oclc_numbers: ["35673444"],
    works: [{ key: "/works/OL540652W" }],
    type: { key: "/type/edition" },
    revision: 10,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    title: "Crime and Disorder Bill [H.L.]",
    number_of_pages: 16,
    isbn_13: ["9780108366512"],
    isbn_10: ["0108366510"],
    publish_date: "April 10, 1998",
    key: "/books/OL10000741M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    oclc_numbers: ["314675634"],
    works: [{ key: "/works/OL14903278W" }],
    type: { key: "/type/edition" },
    subjects: ["English law: criminal law"],
    source_records: ["bwb:9780108366512"],
    latest_revision: 4,
    revision: 4,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    last_modified: {
      type: "/type/datetime",
      value: "2022-07-17T02:27:08.522671",
    },
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-27T12:29:47.213418",
    },
    title: "Government of Wales Bill",
    number_of_pages: 4,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108367540"],
    isbn_10: ["0108367541"],
    publish_date: "June 12, 1998",
    key: "/books/OL10000844M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["314668897"],
    works: [{ key: "/works/OL14903289W" }],
    type: { key: "/type/edition" },
    revision: 3,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    subjects: ["Central government", "United Kingdom, Great Britain"],
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_10: ["0108602974"],
    number_of_pages: 34,
    isbn_13: ["9780108602979"],
    last_modified: {
      type: "/type/datetime",
      value: "2010-03-12T00:04:53.200037",
    },
    publish_date: "November 15, 1996",
    key: "/books/OL10001650M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    title: "House of Commons Weekly Information Bulletin",
    latest_revision: 2,
    works: [{ key: "/works/OL14903389W" }],
    type: { key: "/type/edition" },
    revision: 2,
  },
  {
    publishers: ["Stationery Office Books"],
    key: "/books/OL10000933M",
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    number_of_pages: 8,
    isbn_13: ["9780108368455"],
    physical_format: "Paperback",
    isbn_10: ["0108368459"],
    publish_date: "July 22, 1998",
    last_modified: {
      type: "/type/datetime",
      value: "2010-03-11T23:51:20.834357",
    },
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    title: "Government of Wales Bill [H.L.]",
    latest_revision: 2,
    works: [{ key: "/works/OL14903289W" }],
    type: { key: "/type/edition" },
    revision: 2,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-29T21:00:47.782175",
    },
    title: "European Parliamentary Elections Bill",
    number_of_pages: 2,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108368998"],
    isbn_10: ["0108368998"],
    publish_date: "October 13, 1998",
    key: "/books/OL10000987M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["314617439"],
    works: [{ key: "/works/OL14903171W" }],
    type: { key: "/type/edition" },
    revision: 3,
  },
  {
    publishers: ["Stationery Office Books"],
    physical_format: "Paperback",
    last_modified: {
      type: "/type/datetime",
      value: "2011-04-29T06:51:00.740157",
    },
    title: "Pollution Prevention and Control Bill [H.L.]",
    number_of_pages: 14,
    created: { type: "/type/datetime", value: "2008-04-30T09:38:13.731961" },
    isbn_13: ["9780108380594"],
    isbn_10: ["0108380599"],
    publish_date: "December 31, 1998",
    key: "/books/OL10001116M",
    authors: [{ key: "/authors/OL46053A", name: "Great Britain." }],
    latest_revision: 3,
    oclc_numbers: ["315032145"],
    works: [{ key: "/works/OL14903046W" }],
    type: { key: "/type/edition" },
    revision: 3,
  },
];

Amplify.configure(awsExports);

const initialState = { name: "", profile_photo: "" };

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const [formState, setFormState] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    //addEditions();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  // temporary code to create editions
  async function addEditions() {
    try {
      EDITIONS.forEach(async (edition) => {
        console.log(
          edition.title,
          "\t",
          edition.authors[0].name,
          "\t",
          edition.publishers[0]
        );
        const e = {
          title: edition.title,
          authors: [
            { name: edition.authors[0].name, ol_key: edition.authors[0].key },
          ],
          publishers: edition.publishers,
        };
        await API.graphql(graphqlOperation(createEdition, { input: e }));
      });
    } catch (err) {
      console.log("error adding editions:", err);
    }
  }

  async function fetchUsers() {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      console.log("userData: ", userData);
      const users = userData.data.listUsers.items;
      setUsers(users);
    } catch (err) {
      console.log("error fetching users", err);
    }
  }

  async function addUser() {
    try {
      if (!formState.name || !formState.profile_photo) return;
      const user = { ...formState };
      setUsers([...users, user]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUser, { input: user }));
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  const [fontsLoaded] = useFonts({
    "poppins-light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "poppins-regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
    "poppins-semi-bold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function Root() {
    useEffect(() => {
      async function fetchToken() {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setIsAuthenticated(true);
          setIsNewUser(false);
        }
      }

      fetchToken();
    }, []);

    return <Navigation />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      {/* <Root /> */}

      <Provider store={store}>
        <Root />
        {/* <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <TextInput
              onChangeText={(value) => setInput("name", value)}
              style={styles.input}
              value={formState.name}
              placeholder="Name"
            />
            <TextInput
              onChangeText={(value) => setInput("profile_photo", value)}
              style={styles.input}
              value={formState.profile_photo}
              placeholder="Profile Photo"
            />
            <Pressable onPress={addUser} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Create user</Text>
            </Pressable>
            {users.map((user, index) => (
              <View key={user.id ? user.id : index} style={styles.todo}>
                <Text style={styles.todoName}>{user.name}</Text>
                <Text style={styles.todoDesc}>{user.profile_photo}</Text>
              </View>
            ))}
          </View>
        </SafeAreaView> */}
        {/* <Center flex="1" fontFamily="heading" mt={20}>
        <Input w="75%" value={name} onChangeText={setName} />
        <Button
          bg="primary.100"
          m="7"
          _text={{
            color: "primary.50",
          }}
          onPress={handleInsert}
        >
          Insert into Dynamo DB
        </Button>
        <FlatList
          data={users}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
      </Center> */}
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: "center" },
  todo: { marginBottom: 15 },
  input: {
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDesc: { fontSize: 15 },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 8,
  },
  buttonText: { color: "white", padding: 16, fontSize: 18 },
});
