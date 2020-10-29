import { fireEvent } from "@testing-library/react-native";
import React from "react";
import configureStore from "redux-mock-store";
import { QUESTIONS } from "../../data/questions";
import { render } from "../../test-utils";
import CustomQueryNameModal from "../CustomQueryNameModal";

describe("<CustomQueryNameModal />", () => {
  const INITIAL_STATE = {
    cards: {
      cards: [],
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "my name",
          cards: [],
          feelingsWords: ["pahoillaan", "yskä"],
          feelingsYouMissWords: [],
          needs: ["hei"],
          needsBehindAFeeling: [],
          sentences: [],
          questions: {
            [QUESTIONS[7]]: "niinpä niin",
            [QUESTIONS[8]]: "pahoillaan, yskä",
            [QUESTIONS[9]]: "diipadaapa",
          },
          itemSaved: true,
        },
      },
      screenNumber: 1,
      numOfItems: 0,
      initialLoadFinished: false,
    },
  };

  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  modalVisible = true;
  setModalVisible = jest.fn();
  summaryItemName = "my name";
  error = "some error";
  setSummaryItemName = jest.fn();
  handleModalPress = jest.fn();

  const mockStore = configureStore([]);
  const store = mockStore(INITIAL_STATE);

  it("should match snapshot", () => {
    expect(
      render(
        <CustomQueryNameModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          summaryItemName={summaryItemName}
          error={error}
          setSummaryItemName={setSummaryItemName}
          handleModalPress={handleModalPress}
        />,
        undefined,
        store
      )
    ).toMatchSnapshot();
  });

  it("should hide modal when pressed cancel", () => {
    const component = render(
      <CustomQueryNameModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        summaryItemName={summaryItemName}
        error={error}
        setSummaryItemName={setSummaryItemName}
        handleModalPress={handleModalPress}
      />,
      undefined,
      store
    );

    fireEvent.press(component.queryByText("Peruuta"));
    expect(handleModalPress).toHaveBeenCalledWith("peruuta");
  });
});
