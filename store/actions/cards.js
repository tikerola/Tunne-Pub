export const TOGGLE_CHOSEN_CARD = "TOGGLE CHOSEN CARD";
export const ADD_SUMMARY_ITEM = "ADD SUMMARY ITEM";
export const DELETE_SUMMARY_ITEM = "DELETE SUMMARY ITEM";
export const ADD_ANSWER_TO_A_QUESTION = "ADD ANSWER TO A QUESTION";
export const LOAD_SUMMARY_ITEMS = "LOAD SUMMARY ITEMS";

export const SET_ACTIVE_SUMMARY_ITEM_ID = "SET ACTIVE SUMMARY ITEM ID";
export const SET_SCREEN_NUMBER = "SET SCREEN NUMBER";
export const ADD_SUMMARY_ITEM_NAME = "ADD SUMMARY ITEM NAME";
export const ITEM_SAVED = "ITEM SAVED";
export const SET_NUM_OF_ITEMS = "SET NUM OF ITEMS";
export const TOGGLE_WORD = "TOGGLE WORD";

export const toggleWord = (typeOfWord, word, isAdd, question) => ({
  type: TOGGLE_WORD,
  typeOfWord,
  payload: word,
  isAdd,
  question,
});

export const setNumOfItems = (num) => {
  return {
    type: SET_NUM_OF_ITEMS,
    num,
  };
};

export const itemSaved = (id) => {
  return {
    type: ITEM_SAVED,
    id,
  };
};

export const setScreenNumber = (screenNumber) => {
  return {
    type: SET_SCREEN_NUMBER,
    screenNumber,
  };
};

export const setActiveSummaryItemId = (id) => ({
  type: SET_ACTIVE_SUMMARY_ITEM_ID,
  id,
});

export const toggleChosenCard = (card, isAdd) => {
  return {
    type: TOGGLE_CHOSEN_CARD,
    payload: card,
    isAdd,
  };
};

export const addSummaryItem = (id) => {
  return {
    type: ADD_SUMMARY_ITEM,
    id,
  };
};

export const addSummaryItemName = (id, name) => {
  return {
    type: ADD_SUMMARY_ITEM_NAME,
    id,
    name,
  };
};

export const deleteSummaryItem = (id) => {
  return {
    type: DELETE_SUMMARY_ITEM,
    id,
  };
};

export const addAnswerToAQuestion = (
  summaryItemId,
  question,
  answer,
  listMode,
  wordType
) => {
  return {
    type: ADD_ANSWER_TO_A_QUESTION,
    id: summaryItemId,
    question,
    answer,
    listMode,
    wordType,
  };
};

export const loadSummaryItems = (items) => {
  return {
    type: LOAD_SUMMARY_ITEMS,
    items,
  };
};
