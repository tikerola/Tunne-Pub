import React from "react";
import { QUESTIONS } from "../../data/questions";
import { render } from "../../test-utils";
import { RenderSummary } from "../RenderSummary";
import configureStore from "redux-mock-store";
import Card from "../../models/card";
import CARD_DATA from "../../data/cards";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { deleteSummaryItem } from "../../store/actions/cards";

describe("<RenderSummary />", () => {
  const allCards = [
    CARD_DATA[0],
    CARD_DATA[1],
    CARD_DATA[2],
    CARD_DATA[3],
    CARD_DATA[4],
    CARD_DATA[5],
  ];
  const data = [CARD_DATA[0], CARD_DATA[1], CARD_DATA[2]];

  const INITIAL_STATE = {
    cards: {
      cards: allCards,
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "my name",
          cards: data,
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
          name: "",
          cards: data,
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

  const dispatch = jest.fn();

  const mockStore = configureStore([]);
  const store = mockStore(INITIAL_STATE);

  it("should match snapshot", () => {
    expect(
      render(
        <RenderSummary
          navigation={navigation}
          item={INITIAL_STATE.cards.summaryOfChosenItems["123"]}
          dispatch={dispatch}
        />,
        undefined,
        store
      )
    ).toMatchSnapshot();
  });

  it("should be able to be edited if marked as editable", () => {
    const component = render(
      <RenderSummary
        navigation={navigation}
        item={INITIAL_STATE.cards.summaryOfChosenItems["123"]}
        dispatch={dispatch}
        enableEdit={true}
      />,
      undefined,
      store
    );

    const editButton = component.queryByText("Muokkaa");
    fireEvent.press(editButton);

    expect(dispatch).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith("MainScreen", {
      name: "my name",
    });
  });

  it("should be able to delete if marked as editable", async () => {
    const component = render(
      <RenderSummary
        navigation={navigation}
        item={INITIAL_STATE.cards.summaryOfChosenItems["123"]}
        dispatch={dispatch}
        enableEdit={true}
      />,
      undefined,
      store
    );

    const deleteButton = component.queryByText("Poista");
    fireEvent.press(deleteButton);

    expect(
      component.queryByText("Haluatko varmasti poistaa istunnon?")
    ).toBeTruthy();

    const confirmButton = component.queryByText("Kyllä");
    fireEvent.press(confirmButton);
    expect(navigation.goBack).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(deleteSummaryItem("123"));
  });
});
