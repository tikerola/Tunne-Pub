//import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import CustomProgressStep from "../components/CustomProgressStep";
import CustomProgressSteps from "../components/CustomProgressSteps";
import CustomQueryNameModal from "../components/CustomQueryNameModal";
import ProgressImageStepContent from "../components/ProgressImageStepContent";
import ProgressModeStepContent from "../components/ProgressModeStepContent";
import ProgressStepContent from "../components/ProgressStepContent";
import { colors } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { setItem } from "../data-storage/storageData";
import { QUESTIONS } from "../data/questions";
import {
  addAnswerToAQuestion,
  addSummaryItem,
  addSummaryItemName,
  setScreenNumber,
} from "../store/actions/cards";

export default function MainScreen({ route, navigation }) {
  const { name } = route && route.params ? route.params : {};
  const { height, width } = Dimensions.get("window");

  const [answer, setAnswer] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [summaryItemName, setSummaryItemName] = useState("");
  const [error, setError] = useState("");
  const [listMode, setListMode] = useState(true);

  const items = useSelector((state) => state.cards.summaryOfChosenItems);
  const activeId = useSelector((state) => state.cards.activeSummaryItemId);
  const summaryItem = useSelector(
    (state) => state.cards.summaryOfChosenItems[activeId]
  );
  const screenNumber = useSelector((state) => state.cards.screenNumber);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const progressRef = useRef();

  // If we get name from route params, let's put it in state => ends up in header

  useEffect(() => {
    if (name) setSummaryItemName(name);
  }, [name]);

  // Active name to header

  useEffect(() => {
    if (summaryItemName)
      navigation.setOptions({
        headerTitle: (props) => (
          <CustomHeaderTitle {...props} letterNum={8} name={summaryItemName} />
        ),
      });
  }, [summaryItemName]);

  // If not activeSummaryItemId populated in redux => initiate new session and present name query modal

  useEffect(() => {
    if (!activeId && isFocused) {
      setSummaryItemName("");
      setActiveIndex(0);
      setAnswer("");
      dispatch(setScreenNumber(1));
      setModalVisible(true);
    }
  }, [activeId, isFocused]);

  // If we come from another screen or we go back or forward with stepper, let's populate fields

  useEffect(() => {
    if (screenNumber === 1 || screenNumber === 41) {
      // 41 is a code of coming from a saved records edit-button
      // then we need to reset activeIndex so that we can start from first question

      if (screenNumber === 41) {
        dispatch(setScreenNumber(1));
        setActiveIndex(0);
      }

      setAnswer("");
      setListMode(true);

      if (summaryItem && summaryItem.questions[QUESTIONS[activeIndex]]) {
        populateFields(activeIndex);
      }
    }
  }, [activeIndex, screenNumber]);

  // If some of the items change and our active session is being updated, save it to async storage

  useEffect(() => {
    if (summaryItem && summaryItem.itemSaved) {
      setItem(items);
    }
  }, [items]);

  // This populates the fields for an updated session

  const populateFields = (activeIndex) => {
    if (activeIndex !== 2)
      setAnswer(summaryItem.questions[QUESTIONS[activeIndex]]);
  };

  // Saves answers to redux and handles updating stepper

  const handleSubmit = (answerToAQuestion, wordType) => {
    if (!answerToAQuestion && !summaryItem.questions[QUESTIONS[activeIndex]]) {
      setError("Et voi tallentaa tyhjää sisältöä!");
      setTimeout(() => setError(""), 2500);
      return;
    }

    if (activeIndex !== 2)
      dispatch(
        addAnswerToAQuestion(
          activeId,
          QUESTIONS[activeIndex],
          answerToAQuestion,
          listMode,
          wordType
        )
      );

    if (activeIndex < 3) {
      setActiveIndex((prev) => prev + 1);
      progressRef.current.setActiveStep(activeIndex + 1);
    } else {
      dispatch(setScreenNumber(2));
      navigation.navigate("SecondScreen", { name: summaryItemName });
    }
  };

  const toggleModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  // If unique name is given a new session is created and named

  const handleModalPress = (action) => {
    if (action === "peruuta") {
      toggleModal();
      navigation.navigate("Ohjeet");
      return;
    }

    if (!summaryItemName) {
      setError("Nimi ei voi olla tyhjä!");
      setTimeout(() => setError(""), 2500);
      return;
    }

    for (let item in items) {
      if (items[item].name === summaryItemName) {
        setError("Nimi on varattu!");
        setTimeout(() => setError(""), 2500);
        return;
      }
    }

    const id = Math.random().toString();
    dispatch(addSummaryItem(id));
    setActiveIndex(0);

    dispatch(addSummaryItemName(id, summaryItemName));
    toggleModal();
  };

  const goToNextPage = () => {
    dispatch(setScreenNumber(2));
    navigation.navigate("SecondScreen", { name: summaryItemName });
  };

  const getRef = (ref) => {
    progressRef.current = ref;
  };

  if (modalVisible)
    return (
      <CustomQueryNameModal
        testID="modal"
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setSummaryItemName={setSummaryItemName}
        handleModalPress={handleModalPress}
        pad={width > dimensions.phoneMaxWidth}
        error={error}
      />
    );

  if (!activeId)
    return (
      <View style={styles.empty}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View
          style={{
            width: width <= dimensions.phoneMaxWidth ? "100%" : "60%",
            height: height <= dimensions.phoneMaxHeight ? "100%" : "75%",
          }}
        >
          <CustomProgressSteps getRef={getRef}>
            <CustomProgressStep
              label="mietityttävä tilanne"
              onNext={() => setActiveIndex((prevIndex) => prevIndex + 1)}
            >
              <ProgressStepContent
                description={QUESTIONS[0]}
                answer={answer}
                setAnswer={setAnswer}
                error={error}
                handleSubmit={handleSubmit}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>

            <CustomProgressStep
              label="tunnesanat"
              onNext={() => setActiveIndex((prevIndex) => prevIndex + 1)}
              onPrevious={() => setActiveIndex((prevIndex) => prevIndex - 1)}
            >
              <ProgressModeStepContent
                navigation={navigation}
                navigateTo="WordScreen"
                wordType="feelingsWords"
                navigateBackTo="MainScreen"
                question={1}
                error={error}
                listMode={listMode}
                setListMode={setListMode}
                handleSubmit={handleSubmit}
                description={QUESTIONS[activeIndex]}
                answer={answer}
                setAnswer={setAnswer}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>

            <CustomProgressStep
              label="tunnekuvat"
              onNext={() => setActiveIndex((prevIndex) => prevIndex + 1)}
              onPrevious={() => setActiveIndex((prevIndex) => prevIndex - 1)}
            >
              <ProgressImageStepContent
                navigation={navigation}
                navigateTo="ImageScreen"
                data={items[activeId] ? items[activeId].cards : []}
                handleSubmit={handleSubmit}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>

            <CustomProgressStep
              label="kehon tuntemukset"
              onPrevious={() => setActiveIndex((prevIndex) => prevIndex - 1)}
              onSubmit={goToNextPage}
            >
              <ProgressStepContent
                description={QUESTIONS[3]}
                answer={answer}
                setAnswer={setAnswer}
                error={error}
                handleSubmit={handleSubmit}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>
          </CustomProgressSteps>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bodyBg,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bodyBg,
  },
});
