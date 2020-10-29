import React from "react";
import { QUESTIONS } from "../../data/questions";
import { render } from "../../test-utils";
import ImageSlider from "../ImageSlider";
import configureStore from "redux-mock-store";
import Card from "../../models/card";
import CARD_DATA from "../../data/cards";
import { fireEvent, waitFor } from "@testing-library/react-native";

describe("<ImageSlider />", () => {
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

  const mockStore = configureStore([]);
  const store = mockStore(INITIAL_STATE);

  it("should match snapshot", () => {
    expect(render(<ImageSlider />, undefined, store)).toMatchSnapshot();
  });

  it("should render images", async () => {
    const component = render(<ImageSlider />, undefined, store);
    const images = await waitFor(() => component.queryAllByTestId("image"));

    expect(images.length).toBe(INITIAL_STATE.cards.cards.length);
  });

  it("should toggle pressed card", async () => {
    const component = render(<ImageSlider />, undefined, store);
    const images = await waitFor(() => component.queryAllByTestId("image"));

    fireEvent.press(images[0]);
    fireEvent.press(images[3]);
    const actions = store.getActions();

    expect(actions[0].type).toEqual("TOGGLE CHOSEN CARD");
    expect(actions[0].isAdd).toEqual(false);
    expect(actions[0].payload).toEqual(data[0]);

    expect(actions[1].type).toEqual("TOGGLE CHOSEN CARD");
    expect(actions[1].isAdd).toEqual(true);
    expect(actions[1].payload).toEqual(allCards[3]);
  });
});
