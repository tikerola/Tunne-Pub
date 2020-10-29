import { QUESTIONS } from "../../../data/questions";
import Card from "../../../models/card";
import {
  ADD_ANSWER_TO_A_QUESTION,
  ADD_SUMMARY_ITEM,
  ADD_SUMMARY_ITEM_NAME,
  DELETE_SUMMARY_ITEM,
  ITEM_SAVED,
  LOAD_SUMMARY_ITEMS,
  setNumOfItems,
  SET_ACTIVE_SUMMARY_ITEM_ID,
  SET_NUM_OF_ITEMS,
  SET_SCREEN_NUMBER,
  TOGGLE_CHOSEN_CARD,
  TOGGLE_WORD,
} from "../../actions/cards";
import reducer from "../cards";

const initialState = {
  activeSummaryItemId: "1",
  summaryOfChosenItems: {},
  screenNumber: 1,
  numOfItems: 0,
  initialLoadFinished: false,
};

const items = {
  1: {
    id: "1",
    name: "first",
    cards: [],
    feelingsWords: ["first", "second", "third"],
    feelingsYouMissWords: [],
    needs: ["voi vitsi"],
    needsBehindAFeeling: [],
    sentences: ["voi vitsi"],
    questions: {},
    itemSaved: true,
  },
  2: {
    id: "2",
    name: "second",
    cards: [],
    feelingsWords: [],
    feelingsYouMissWords: [],
    needs: ["kylläinen"],
    needsBehindAFeeling: [],
    sentences: [],
    questions: {},
    itemSaved: true,
  },
  3: {
    id: "3",
    name: "third",
    cards: [new Card("222", "sad", "yo")],
    feelingsWords: [],
    feelingsYouMissWords: [],
    needs: ["nothing"],
    needsBehindAFeeling: [],
    sentences: [],
    questions: {
      "What is your name": "Tim",
    },
    itemSaved: false,
  },
};

describe("Reducer tests", () => {
  it("should load initial data", () => {
    const action = {
      type: LOAD_SUMMARY_ITEMS,
      items,
    };

    const newState = reducer(initialState, action);

    expect(newState.initialLoadFinished).toBe(true);
    expect(newState.summaryOfChosenItems["1"].sentences[0]).toEqual(
      "voi vitsi"
    );
    expect(newState.summaryOfChosenItems["2"].needs[0]).toEqual("kylläinen");
    expect(
      newState.summaryOfChosenItems["3"].questions["What is your name"]
    ).toEqual("Tim");
    expect(newState.numOfItems).toBe(3);
  });

  it("should add word successfully", () => {
    const action = {
      type: TOGGLE_WORD,
      typeOfWord: "feelingsWords",
      payload: "word",
      isAdd: true,
      question: 1,
    };

    const state = {
      ...initialState,
      activeSummaryItemId: "1",
      summaryOfChosenItems: items,
    };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["1"].feelingsWords.length).toBe(4);
    expect(newState.summaryOfChosenItems["1"].feelingsWords[3]).toEqual("word");
    expect(newState.summaryOfChosenItems["1"].questions[QUESTIONS[1]]).toEqual(
      "first, second, third, word"
    );
  });

  it("should remove word successfully", () => {
    const action = {
      type: TOGGLE_WORD,
      typeOfWord: "feelingsWords",
      payload: "third",
      isAdd: false,
      question: 1,
    };

    const state = {
      ...initialState,
      activeSummaryItemId: "1",
      summaryOfChosenItems: items,
    };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["1"].feelingsWords.length).toBe(2);
    expect(newState.summaryOfChosenItems["1"].feelingsWords).not.toContain(
      "third"
    );
    expect(newState.summaryOfChosenItems["1"].questions[QUESTIONS[1]]).toEqual(
      "first, second"
    );
  });

  it("should add sentences successfully", () => {
    const action = {
      type: TOGGLE_WORD,
      typeOfWord: "sentences",
      payload: "niinpä niin",
      isAdd: true,
      question: 8,
    };

    const state = {
      ...initialState,
      activeSummaryItemId: "1",
      summaryOfChosenItems: items,
    };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["1"].questions[QUESTIONS[8]]).toEqual(
      "voi vitsi niinpä niin"
    );
  });

  it("should add card successfully", () => {
    const action = {
      type: TOGGLE_CHOSEN_CARD,
      payload: new Card("123", "happy", "somefilename"),
      isAdd: true,
    };

    const state = {
      ...initialState,
      activeSummaryItemId: "2",
      summaryOfChosenItems: items,
    };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["2"].cards).toHaveLength(1);
    expect(newState.summaryOfChosenItems["2"].cards[0].filename).toEqual(
      "somefilename"
    );
  });

  it("should remove card successfully", () => {
    const action = {
      type: TOGGLE_CHOSEN_CARD,
      payload: new Card("222", "sad", "yo"),
      isAdd: false,
    };

    const state = {
      ...initialState,
      activeSummaryItemId: "3",
      summaryOfChosenItems: items,
    };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["3"].cards).toHaveLength(0);
  });

  it("should add summary item successfully", () => {
    const action = {
      type: ADD_SUMMARY_ITEM,
      id: "123",
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      activeSummaryItemId: "123",
      summaryOfChosenItems: {
        123: {
          id: "123",
          name: "",
          cards: [],
          feelingsWords: [],
          feelingsYouMissWords: [],
          needs: [],
          needsBehindAFeeling: [],
          sentences: [],
          questions: {},
          itemSaved: false,
        },
      },
    });
  });

  it("should remove summary item successfully", () => {
    const action = {
      type: DELETE_SUMMARY_ITEM,
      id: "3",
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect({
      3: {
        id: "3",
        name: "third",
        cards: [new Card("222", "sad", "yo")],
        feelingsWords: [],
        feelingsYouMissWords: [],
        needs: [],
        needsBehindAFeeling: [],
        sentences: [],
        questions: {
          "What is your name": "Tim",
        },
        itemSaved: true,
      },
    }).toEqual(expect.not.objectContaining(newState.summaryOfChosenItems));

    const action2 = {
      type: DELETE_SUMMARY_ITEM,
      id: "1",
    };

    const state2 = { ...initialState, summaryOfChosenItems: items };

    const newState2 = reducer(state2, action2);

    expect(newState2.activeSummaryItemId).toEqual("");
  });

  it("should add answer to a question", () => {
    const action = {
      type: ADD_ANSWER_TO_A_QUESTION,
      id: "3",
      question: "Who are you?",
      answer: "No one",
      listMode: false,
      wordType: "needs",
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["3"].questions).toHaveProperty(
      "Who are you?",
      "No one"
    );

    expect(newState.summaryOfChosenItems["3"].needs.length).toBe(0);

    const action2 = {
      type: ADD_ANSWER_TO_A_QUESTION,
      id: "3",
      question: "Who are you?",
      answer: "No one",
      listMode: true,
      wordType: "needs",
    };

    const state2 = { ...initialState, summaryOfChosenItems: items };

    const newState2 = reducer(state2, action2);

    expect(newState2.summaryOfChosenItems["3"].needs).toEqual(["nothing"]);
  });

  it("should add name to a summaryItem", () => {
    const action = {
      type: ADD_SUMMARY_ITEM_NAME,
      id: "3",
      name: "Veikko",
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["3"].name).toEqual("Veikko");
  });

  it("should mark item as being saved", () => {
    const action = {
      type: ITEM_SAVED,
      id: "3",
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.summaryOfChosenItems["3"].itemSaved).toEqual(true);
  });

  it("should set number of items", () => {
    const action = setNumOfItems(3);

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.numOfItems).toBe(3);
  });

  it("should set screen number", () => {
    const action = {
      type: SET_SCREEN_NUMBER,
      screenNumber: 3,
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.screenNumber).toBe(3);
  });

  it("should set active summary item id", () => {
    const action = {
      type: SET_ACTIVE_SUMMARY_ITEM_ID,
      id: 3,
    };

    const state = { ...initialState, summaryOfChosenItems: items };

    const newState = reducer(state, action);

    expect(newState.activeSummaryItemId).toBe(3);
  });
});
