import React from "react";
import { QUESTIONS } from "../../data/questions";
import { render } from "../../test-utils";
import SummaryItemScreen from "../SummaryItemScreen";
import configureStore from "redux-mock-store";

describe("<SummaryItemScreen />", () => {
  const INITIAL_STATE = {
    cards: {
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "",
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

  const route = {
    params: {
      summaryItemId: "123",
    },
  };

  const mockStore = configureStore([]);

  it("should match snapshot", () => {
    expect(render(<SummaryItemScreen route={route} />)).toMatchSnapshot();
  });

  it("should render content when route.params.summaryItemId matches real record", async () => {
    const component = render(
      <SummaryItemScreen route={route} />,
      undefined,
      mockStore(INITIAL_STATE)
    );

    expect(component.queryByText("niinpä niin")).toBeTruthy();
  });

  it("should render content when route not defined but activeSummaryItemId is", async () => {
    const component = render(
      <SummaryItemScreen />,
      undefined,
      mockStore(INITIAL_STATE)
    );

    expect(component.queryByText("niinpä niin")).toBeTruthy();
  });
});
