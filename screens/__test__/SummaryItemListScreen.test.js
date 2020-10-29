import React from "react";
import { QUESTIONS } from "../../data/questions";
import { render } from "../../test-utils";
import SummaryItemListScreen from "../SummaryItemListScreen";
import configureStore from "redux-mock-store";
import { fireEvent } from "@testing-library/react-native";

describe("<SummaryItemListScreen />", () => {
  const INITIAL_STATE = {
    cards: {
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "Anniinan sessio",
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
        234: {
          id: "234",
          name: "Timon Piirakat",
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
          itemSaved: false,
        },
      },
      screenNumber: 1,
      numOfItems: 0,
      initialLoadFinished: false,
    },
  };

  const INITIAL_STATE2 = {
    cards: {
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        234: {
          id: "234",
          name: "Timon Piirakat",
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
          itemSaved: false,
        },
      },
      screenNumber: 1,
      numOfItems: 0,
      initialLoadFinished: false,
    },
  };

  const navigation = {
    navigate: jest.fn(),
  };

  const mockStore = configureStore([]);

  it("should match snapshot", () => {
    expect(render(<SummaryItemListScreen />)).toMatchSnapshot();
  });

  it("should render names of records", () => {
    const component = render(
      <SummaryItemListScreen />,
      undefined,
      mockStore(INITIAL_STATE)
    );

    expect(component.queryByText("Anniinan sessio")).toBeTruthy();
    expect(component.queryByText("Timon Piirakat")).toBeFalsy();
  });

  it("should navigate to record if pressed", () => {
    const component = render(
      <SummaryItemListScreen navigation={navigation} />,
      undefined,
      mockStore(INITIAL_STATE)
    );

    fireEvent.press(component.queryByText("Anniinan sessio"));
    expect(navigation.navigate).toHaveBeenCalledWith("SummaryItem", {
      summaryItemId: "123",
    });
  });

  it("should reset activeSummaryItemId if we are in editing mode", () => {
    const store = mockStore(INITIAL_STATE);

    const component = render(
      <SummaryItemListScreen navigation={navigation} />,
      undefined,
      store
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual("SET ACTIVE SUMMARY ITEM ID");
  });

  it("should not reset activeSummaryItemId if we are not in editing mode", () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <SummaryItemListScreen navigation={navigation} />,
      undefined,
      store
    );

    const actions = store.getActions();
    expect(actions.length).toBe(0);
  });
});
