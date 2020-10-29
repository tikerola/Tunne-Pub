import "@testing-library/jest-native/extend-expect";
import { fireEvent } from "@testing-library/react-native";
import React from "react";
import configureStore from "redux-mock-store";
import { QUESTIONS } from "../../data/questions";
import {
  act,
  store,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test-utils";
import SecondScreen from "../SecondScreen";

describe("<SecondScreen />", () => {
  const INITIAL_STATE = {
    cards: {
      activeSummaryItemId: "",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "123",
          cards: [],
          feelingsWords: ["pahoillaan", "yskä"],
          feelingsYouMissWords: [],
          needs: ["hei"],
          needsBehindAFeeling: [],
          sentences: [],
          questions: { [QUESTIONS[0]]: "niinpä niin" },
          itemSaved: true,
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
            [QUESTIONS[4]]: "niinpä niin",
            [QUESTIONS[5]]: "pahoillaan, yskä",
            [QUESTIONS[6]]: "diipadaapa",
          },
          itemSaved: true,
        },
      },
      screenNumber: 1,
      numOfItems: 0,
      initialLoadFinished: false,
    },
  };

  const INITIAL_STATE3 = {
    cards: {
      activeSummaryItemId: "123",
      summaryOfChosenItems: {},
      screenNumber: 41,
      numOfItems: 0,
      initialLoadFinished: false,
    },
  };

  const navigation = {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  };

  route = {
    params: {
      name: "Hei",
    },
  };

  const mockStore = configureStore([]);

  it("should match snapshot", () => {
    const result = render(
      <SecondScreen navigation={navigation} route={route} />
    ).toJSON();
    expect(result).toMatchSnapshot();
  });

  it("should set navigation options when name provided by route params", async () => {
    const component = render(
      <SecondScreen navigation={navigation} route={route} />,
      undefined,
      mockStore(INITIAL_STATE2)
    );

    expect(navigation.setOptions).toHaveBeenCalled();
  });

  it("should prepopulate 5. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <SecondScreen navigation={navigation} route={route} />,
      undefined,
      store
    );
    expect(component.queryByText(QUESTIONS[4])).toBeTruthy();
    expect(
      component.queryByPlaceholderText("Kirjoita omin sanoin...")
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("niinpä niin");
  });

  it("should prepopulate 6. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <SecondScreen navigation={navigation} route={route} />,
      undefined,
      store
    );

    fireEvent.press(component.getByText("Seuraava"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[5]))
    ).toBeTruthy();

    expect(
      component.queryByPlaceholderText(
        "Paina minua lisätäksesi sanoja sanalistasta..."
      )
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("pahoillaan, yskä");

    fireEvent.press(input);
    const actions = await waitFor(() => store.getActions());
    expect(actions[0].type).toEqual("SET SCREEN NUMBER");

    expect(navigation.navigate).toHaveBeenCalledWith("WordScreen", {
      navigateBackTo: "SecondScreen",
      question: 5,
      wordType: "needsBehindAFeeling",
    });
  });

  it("should prepopulate 7. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <SecondScreen navigation={navigation} route={route} />,
      undefined,
      store
    );

    fireEvent.press(component.getByText("Seuraava"));
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[6]))
    ).toBeTruthy();

    expect(
      component.queryByPlaceholderText(
        "Paina minua lisätäksesi sanoja sanalistasta..."
      )
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("diipadaapa");

    fireEvent.press(input);

    expect(navigation.navigate).toHaveBeenCalledWith("WordScreen", {
      navigateBackTo: "SecondScreen",
      question: 6,
      wordType: "feelingsYouMissWords",
    });
  });

  it("should go to next index after having saved an answer", async () => {
    const component = render(
      <SecondScreen navigation={navigation} route={route} />
    );

    expect(component.queryByText(QUESTIONS[4])).toBeTruthy();
    const input = component.getByTestId("custom-input");
    fireEvent.changeText(input, "");
    fireEvent.press(component.getByText("Tallenna"));
    expect(
      component.queryByText("Et voi tallentaa tyhjää sisältöä!")
    ).toBeTruthy();

    await waitForElementToBeRemoved(() =>
      component.getByText("Et voi tallentaa tyhjää sisältöä!")
    );

    fireEvent.changeText(input, "Some Answer");
    fireEvent.press(component.getByText("Tallenna"));

    expect(component.queryByText(QUESTIONS[4])).toBeFalsy();
    expect(component.queryByText(QUESTIONS[5])).toBeTruthy();

    const input2 = component.getByTestId("custom-input");
    expect(input2.props.editable).toEqual(false);

    const toggle = component.queryByTestId("switch");
    await waitFor(() => fireEvent.press(toggle));

    expect(input2.props.editable).toEqual(true);

    fireEvent.changeText(input2, "Some Answer");
    fireEvent.press(component.getByText("Tallenna"));

    expect(component.queryByText(QUESTIONS[5])).toBeFalsy();
    expect(component.queryByText(QUESTIONS[6])).toBeTruthy();

    const input3 = component.getByTestId("custom-input");
    fireEvent.changeText(input3, "Some Answer");
    fireEvent.press(component.getByText("Tallenna"));

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "SET SCREEN NUMBER",
      screenNumber: 3,
    });
    expect(navigation.navigate).toHaveBeenCalledWith("ThirdScreen", {
      name: "Hei",
    });
  });

  it("should test next and previous buttons", async () => {
    const component = render(
      <SecondScreen navigation={navigation} route={route} />
    );

    expect(component.queryByText(QUESTIONS[4])).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[5]))
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[6]))
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(navigation.navigate).toHaveBeenCalledWith("ThirdScreen", {
      name: "Hei",
    });

    fireEvent.press(component.getByText("Edellinen"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[5]))
    ).toBeTruthy();

    fireEvent.press(component.getByText("Edellinen"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[4]))
    ).toBeTruthy();

    fireEvent.press(component.getByText("Edellinen"));
    expect(navigation.navigate).toHaveBeenCalledWith("MainScreen");
  });

  it("should show activityIndicator if summaryItem has not loaded", async () => {
    const component = render(
      <SecondScreen navigation={navigation} route={route} />,
      undefined,
      mockStore(INITIAL_STATE3)
    );

    expect(component.queryByTestId("activity-indicator")).toBeTruthy();
  });
});
