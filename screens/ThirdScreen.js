//import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import { useFocusEffect } from "@react-navigation/native";
import { ProgressStep } from "@tkkortit/own-stepper";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import CustomProgressStep from "../components/CustomProgressStep";
import CustomProgressSteps from "../components/CustomProgressSteps";
import ProgressModeStepContent from "../components/ProgressModeStepContent";
import ProgressStepContent from "../components/ProgressStepContent";
import { colors } from "../constants/colors";
import { dimensions } from "../constants/dimensions";
import { QUESTIONS } from "../data/questions";
import {
  addAnswerToAQuestion,
  itemSaved,
  setActiveSummaryItemId,
  setScreenNumber,
} from "../store/actions/cards";

const defaultScrollViewProps = {
  keyboardShouldPersistTaps: "handled",
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center",
  },
};

const START_STEP = 7;

export default function SecondScreen({ route, navigation }) {
  const [answer, setAnswer] = useState("");
  const [activeIndex, setActiveIndex] = useState(START_STEP);
  const [error, setError] = useState("");
  const [listMode, setListMode] = useState(true);

  const summaryId = useSelector((state) => state.cards.activeSummaryItemId);
  const summaryItem = useSelector(
    (state) => state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId]
  );
  const screenNumber = useSelector((state) => state.cards.screenNumber);

  const dispatch = useDispatch();
  const { height, width } = Dimensions.get("window");
  const progressRef = useRef();

  const { name } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <CustomHeaderTitle {...props} letterNum={4} name={name} />
      ),
    });
  }, [name]);

  useFocusEffect(() => {
    if (!summaryId) navigation.navigate("MainScreen");
  }, [summaryId]);

  useEffect(() => {
    setAnswer("");
    setListMode(true);
    if (summaryItem && summaryItem.questions[QUESTIONS[activeIndex]])
      populateFields(activeIndex);
  }, [activeIndex, screenNumber]);

  const populateFields = (activeIndex) => {
    if (activeIndex >= 7 && activeIndex <= 9)
      setAnswer(summaryItem.questions[QUESTIONS[activeIndex]]);
  };

  const handleSubmit = (answerToAQuestion, wordType) => {
    if (!answerToAQuestion && !summaryItem.questions[QUESTIONS[activeIndex]]) {
      setError("Et voi tallentaa tyhjää sisältöä!");
      setTimeout(() => setError(""), 2500);
      return;
    }

    if (activeIndex >= 7 && activeIndex <= 9)
      dispatch(
        addAnswerToAQuestion(
          summaryId,
          QUESTIONS[activeIndex],
          answerToAQuestion,
          listMode,
          wordType
        )
      );

    if (activeIndex < 9) {
      progressRef.current.setActiveStep(activeIndex - (START_STEP - 1) + 1);
      setActiveIndex((prev) => prev + 1);
    } else {
      dispatch(itemSaved(summaryId));
      dispatch(setScreenNumber(4));
      dispatch(setActiveSummaryItemId(""));
      navigation.navigate("ThankScreen");
    }
  };

  const goToPreviousPage = () => {
    dispatch(setScreenNumber(2));
    navigation.navigate("SecondScreen");
  };

  const onSave = () => {
    if (
      !Object.keys(summaryItem.questions).length &&
      summaryItem.cards.length === 0
    ) {
      setError("Täytä ainakin yksi kysymys");
      setTimeout(() => setError(""), 2500);
      return;
    }
    dispatch(setScreenNumber(4));
    dispatch(itemSaved(summaryId));
    dispatch(setActiveSummaryItemId(""));
    navigation.navigate("ThankScreen");
  };

  const getRef = (ref) => {
    progressRef.current = ref;
  };

  if (!summaryItem)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bodyBg,
        }}
      >
        <ActivityIndicator testID="activity-indicator" size="large" />
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={"handled"}
    >
      <View style={styles.container}>
        <View
          style={{
            width: width <= 500 ? "100%" : "60%",
            height: height <= 750 ? "100%" : "75%",
          }}
        >
          <CustomProgressSteps
            getRef={getRef}
            startStep={START_STEP}
            activeStep={1}
          >
            <ProgressStep label="kaipaamasi tunne">
              <Text>Dummy Step</Text>
            </ProgressStep>

            <CustomProgressStep
              label="tarve tällä hetkellä"
              onNext={() => setActiveIndex((prevIndex) => prevIndex + 1)}
              onPrevious={goToPreviousPage}
            >
              <ProgressModeStepContent
                navigation={navigation}
                navigateTo="WordScreen"
                wordType="needs"
                navigateBackTo="ThirdScreen"
                question={7}
                listMode={listMode}
                setListMode={setListMode}
                handleSubmit={handleSubmit}
                description={QUESTIONS[activeIndex]}
                answer={answer}
                setAnswer={setAnswer}
                error={error}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>

            <CustomProgressStep
              label="mietityttävä lause"
              onNext={() => setActiveIndex((prevIndex) => prevIndex + 1)}
              onPrevious={() => setActiveIndex((prevIndex) => prevIndex - 1)}
            >
              <ProgressModeStepContent
                navigation={navigation}
                navigateTo="WordScreen"
                wordType="sentences"
                navigateBackTo="ThirdScreen"
                question={8}
                listMode={listMode}
                setListMode={setListMode}
                handleSubmit={handleSubmit}
                description={QUESTIONS[activeIndex]}
                answer={answer}
                setAnswer={setAnswer}
                error={error}
                pad={height > dimensions.phoneMaxHeight}
              />
            </CustomProgressStep>

            <CustomProgressStep
              last
              label="hyvinvoinnin edellytys"
              onSubmit={onSave}
              onPrevious={() => setActiveIndex((prevIndex) => prevIndex - 1)}
            >
              <ProgressStepContent
                description={QUESTIONS[activeIndex]}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bodyBg,
  },

  buttonContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonStyle: {
    color: "#bbb",
    fontSize: 18,
    fontFamily: "Roboto-Light",
  },

  listButtonText: {
    fontSize: 18,
    // color: 'white',
    //borderRadius: 5,
    // padding: 4,
    textDecorationLine: "underline",
    //backgroundColor: 'black'
  },

  instructionText: {
    fontSize: 18,
    padding: 15,
  },

  bolded: {
    fontWeight: "bold",
    fontSize: 18,

    marginBottom: 5,
  },

  image: {
    width: 96,
    height: 140,
    marginRight: 5,
  },

  error: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: "red",
  },
  pad: {
    backgroundColor: colors.stepperContentBg,
    padding: 50,
    borderRadius: 10,
  },
});
