import { Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import {
  loadSummaryItems,
  setActiveSummaryItemId,
} from "../store/actions/cards";

const HelpScreen = () => {
  const dispatch = useDispatch();
  const { height, width } = Dimensions.get("window");

  const item = useSelector(
    (state) => state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId]
  );

  // Make sure that if we are editing a record and go to help screen, we terminate the editing and
  // prepare for the possible creation of new session

  useFocusEffect(
    React.useCallback(() => {
      if (item && item.itemSaved) {
        dispatch(setActiveSummaryItemId(""));
      }
    }, [item])
  );

  // Fetch and initiate redux with async storage items

  useEffect(() => {
    const getFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("items");
        const parsedData = JSON.parse(data);

        if (parsedData) {
          dispatch(loadSummaryItems(parsedData));
        }
      } catch (err) {
        console.log("Something went wrong when trying to fetch items");
      }
    };

    getFromAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            width: width <= dimensions.phoneMaxWidth ? "100%" : "75%",
            alignSelf: "center",
          }}
        >
          <Text
            testID="title"
            style={[
              styles.title,
              { marginTop: height <= dimensions.phoneMaxHeight ? 20 : 50 },
            ]}
          >
            Tervetuloa
          </Text>

          <Text style={styles.content}>
            Tunne-sovelluksessa pääset luomaan uuden tunnedokumentin painamalla
            alavalikon keskimmäistä painiketta{" "}
            <Entypo name={"new-message"} size={20} color={"gray"} />. Jos olet
            tekemässä ensimmäistä istuntoa tai sinulla ei ole keskeneräisiä
            istuntoja, pyytää ohjelma sinua antamaan istunnolle nimi.
          </Text>

          <Text style={styles.content}>
            Tämän jälkeen eteesi avautuu ensimmäinen kysymys. Kysymykseen
            vastataan kirjoittamalla vastaus tekstikenttään ja painamalla
            'tallenna'-nappia. Tallennettuasi vastauksen, ohjelma siirtää sinut
            automaattisesti seuraavaan kysymykseen. Jos kuitenkin vastaaminen
            tuntuu vaikealta ja haluat kenties palata kysymyksen pariin vasta
            myöhemmin, voit siirtyä 'seuraava'-linkillä seuraavaan kysymykseen.
          </Text>

          <Text style={styles.content}>
            Toisinaan kysymyksiin (kysymykset: 2, 6, 7, 8 ja 9) on mahdollista
            vastata joko valitsemalla listasta valmiita sanoja/lauseita tai
            vaihtoehtoisesti kirjoittaa oma vastaus. Voit vaihtaa valintaasi
            kysymyskentän alla olevasta moodi-kytkimestä. Kytkimen tekstistä
            sekä tekstikentän vihjeestä näet miten vastata.
          </Text>

          <Text style={styles.content}>
            Kysymyksiä on kaiken kaikkiaan kymmenen. Jos haluat nähdä, mitä olet
            vastannut aiempiin kysymyksiin, näet koosteen vastauksistasi
            painamalla oikean yläkulman{" "}
            <Ionicons name={"md-clipboard"} size={20} color={"gray"} /> ikonia.
            Koostesivulta pääset jatkamaan istunnon päivittämistä painamalla
            yläpalkin takaisin-nuolta.
          </Text>

          <Text style={styles.content}>
            Tallennat istunnon painaessasi kymmenennen kysymyksen
            tallenna-nappia/linkkiä. Tämän jälkeen istunto on tallennettu
            puhelimen muistiin. Voit tätä ja tulevia tallennettuja istuntoja
            tutkailla ja päivitellä oikean alareunan{" "}
            <Entypo name="save" size={20} color="gray" /> napista ja
            valitsemalla listasta haluamasi istunto. Jos myöhemmin muokkaat jo
            tallennettua istuntoa, voit vastata vain haluamiisi kysymyksiin ja
            tallentaa nämä. Tallennus astuu heti voimaan tarvitsematta käydä
            kaikkia kymmentä kysymystä läpi.
          </Text>

          <Text style={styles.content}>
            Jos jotain jäi epäselväksi, voi ohjeisiin (
            <Entypo name="help" size={20} color="gray" />
            -nappi vasemmalla alhaalla) palata missä vaiheessa tahansa ilman,
            että istunnon jo kirjoitettuja tietoja menetetään.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyBg,
  },

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  title: {
    width: "100%",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 0,
    fontSize: 19,
    fontFamily: "Roboto-Bold",
    color: "#bbb",
  },

  content: {
    margin: 10,
    color: "#999",
    fontSize: 18,
  },
});
