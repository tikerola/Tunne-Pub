import "@testing-library/jest-native/extend-expect";
import { fireEvent } from "@testing-library/react-native";
import React from "react";
import configureStore from "redux-mock-store";
import { QUESTIONS } from "../../data/questions";
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test-utils";
import MainScreen from "../MainScreen";

describe("<MainScreen />", () => {
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
            [QUESTIONS[0]]: "niinpä niin",
            [QUESTIONS[1]]: "pahoillaan, yskä",
            [QUESTIONS[3]]: "diipadaapa",
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
            [QUESTIONS[0]]: "niinpä niin",
            [QUESTIONS[1]]: "pahoillaan, yskä",
            [QUESTIONS[3]]: "diipadaapa",
          },
          itemSaved: true,
        },
      },
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
    const result = render(<MainScreen navigation={navigation} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  it("should set navigation options when name provided by route params", async () => {
    const component = render(
      <MainScreen navigation={navigation} route={route} />
    );

    expect(navigation.setOptions).toHaveBeenCalled();
  });

  it("should fire setScreenNumber if coming from screenNumber of 41", async () => {
    const store = mockStore(INITIAL_STATE3);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );

    const actions = await waitFor(() => store.getActions());
    expect(actions[0].type).toEqual("SET SCREEN NUMBER");
  });

  it("should not render modal when name provided by route params", async () => {
    const component = render(
      <MainScreen navigation={navigation} route={route} />
    );

    const text = await waitFor(() =>
      component.queryByText("Aloita antamalla istunnolle nimi")
    );
    expect(text).toBeFalsy();

    expect(component.queryByText(QUESTIONS[0])).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[1]))
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() =>
        component.queryByText(" ne kuvat, jotka parhaiten kuvaavat tunteitasi.")
      )
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[3]))
    ).toBeTruthy();
  });

  it("should test next and previous buttons", async () => {
    const component = render(
      <MainScreen navigation={navigation} route={route} />
    );

    expect(component.queryByText(QUESTIONS[0])).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[1]))
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() =>
        component.queryByText(" ne kuvat, jotka parhaiten kuvaavat tunteitasi.")
      )
    ).toBeTruthy();
    fireEvent.press(component.getByText("Seuraava"));

    expect(
      await waitFor(() => component.queryByText(QUESTIONS[3]))
    ).toBeTruthy();

    fireEvent.press(component.getByText("Seuraava"));
    expect(navigation.navigate).toHaveBeenCalled();

    fireEvent.press(component.getByText("Edellinen"));
    expect(
      await waitFor(() =>
        component.queryByText(" ne kuvat, jotka parhaiten kuvaavat tunteitasi.")
      )
    ).toBeTruthy();

    fireEvent.press(component.getByText("Edellinen"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[1]))
    ).toBeTruthy();

    fireEvent.press(component.getByText("Edellinen"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[0]))
    ).toBeTruthy();
  });

  it("should go to next index after having saved an answer", async () => {
    const component = render(
      <MainScreen navigation={navigation} route={route} />
    );

    expect(component.queryByText(QUESTIONS[0])).toBeTruthy();
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

    expect(component.queryByText(QUESTIONS[0])).toBeFalsy();
    expect(component.queryByText(QUESTIONS[1])).toBeTruthy();

    fireEvent.press(component.getByText("Seuraava"));
    fireEvent.press(component.getByText("Seuraava"));

    const input2 = component.getByTestId("custom-input");
    fireEvent.changeText(input2, "Some Answer");
    fireEvent.press(component.getByText("Tallenna"));

    expect(navigation.navigate).toHaveBeenCalled();
  });

  it("should show modal when name is not provided through params and theres no active id", async () => {
    const store = mockStore(INITIAL_STATE);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );
    const text = await component.findByText("Aloita antamalla istunnolle nimi");
    expect(text).toBeDefined();

    const input = component.getByTestId("input");
    fireEvent.changeText(input, "123");

    const button = component.getByText("Tallenna");
    fireEvent.press(button);

    expect(component.queryByText("Nimi on varattu!")).toBeTruthy();

    fireEvent.changeText(input, "");
    fireEvent.press(button);

    expect(component.queryByText("Nimi ei voi olla tyhjä!")).toBeTruthy();

    fireEvent.changeText(input, "sdfsd");

    fireEvent.press(button);

    const text1 = await waitFor(() =>
      component.queryByText("Aloita antamalla istunnolle nimi")
    );
    expect(text1).toBeFalsy();

    const actions = store.getActions();
    expect(actions[1].type).toEqual("ADD SUMMARY ITEM");
    expect(actions[2].type).toEqual("ADD SUMMARY ITEM NAME");

    expect(navigation.setOptions).toHaveBeenCalled();
  });

  it("should allow cancel modal", async () => {
    const store = mockStore(INITIAL_STATE);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );
    const text = await component.findByText("Aloita antamalla istunnolle nimi");
    expect(text).toBeDefined();

    const button = component.getByText("Peruuta");
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith("Ohjeet");
  });

  it("should prepopulate 1. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );
    expect(component.queryByText(QUESTIONS[0])).toBeTruthy();
    expect(
      component.queryByPlaceholderText("Kirjoita omin sanoin...")
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("niinpä niin");
  });

  it("should prepopulate 2. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );

    fireEvent.press(component.getByText("Seuraava"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[1]))
    ).toBeTruthy();

    expect(
      component.queryByPlaceholderText(
        "Paina minua lisätäksesi sanoja sanalistasta..."
      )
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("pahoillaan, yskä");
  });

  it("should prepopulate 4. field when updating a record", async () => {
    const store = mockStore(INITIAL_STATE2);

    const component = render(
      <MainScreen navigation={navigation} />,
      undefined,
      store
    );

    fireEvent.press(component.getByText("Seuraava"));
    fireEvent.press(component.getByText("Seuraava"));
    fireEvent.press(component.getByText("Seuraava"));
    expect(
      await waitFor(() => component.queryByText(QUESTIONS[3]))
    ).toBeTruthy();

    expect(
      component.queryByPlaceholderText("Kirjoita omin sanoin...")
    ).toBeTruthy();

    let input = component.queryByTestId("custom-input");
    expect(input.props.value).toEqual("diipadaapa");
  });
});
