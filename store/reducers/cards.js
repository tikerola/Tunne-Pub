import CART_DATA from "../../data/cards";
import WORD_DATA from "../../data/words";
import NEEDS_DATA from "../../data/needs";
import { QUESTIONS } from "../../data/questions";

import {
  TOGGLE_CHOSEN_CARD,
  ADD_SUMMARY_ITEM,
  DELETE_SUMMARY_ITEM,
  ADD_ANSWER_TO_A_QUESTION,
  LOAD_SUMMARY_ITEMS,
  SET_ACTIVE_SUMMARY_ITEM_ID,
  SET_SCREEN_NUMBER,
  ADD_SUMMARY_ITEM_NAME,
  ITEM_SAVED,
  SET_NUM_OF_ITEMS,
  TOGGLE_WORD,
} from "../actions/cards";
import { SENTENCES_DATA } from "../../data/sentences";

const initialState = {
  cards: CART_DATA,
  words: WORD_DATA,
  needs: NEEDS_DATA,
  sentences: SENTENCES_DATA,
  activeSummaryItemId: "",
  summaryOfChosenItems: {},
  screenNumber: 1,
  numOfItems: 0,
  initialLoadFinished: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUM_OF_ITEMS:
      return {
        ...state,
        numOfItems: action.num,
      };

    case ITEM_SAVED: {
      const summaryItems = { ...state.summaryOfChosenItems };
      summaryItems[action.id].itemSaved = true;

      return {
        ...state,
        summaryOfChosenItems: summaryItems,
      };
    }

    case ADD_SUMMARY_ITEM_NAME: {
      const summaryItems = { ...state.summaryOfChosenItems };
      summaryItems[action.id].name = action.name;

      return {
        ...state,
        summaryOfChosenItems: summaryItems,
      };
    }

    case SET_SCREEN_NUMBER:
      return {
        ...state,
        screenNumber: action.screenNumber,
      };

    case SET_ACTIVE_SUMMARY_ITEM_ID:
      return {
        ...state,
        activeSummaryItemId: action.id,
      };

    case TOGGLE_CHOSEN_CARD: {
      const itemToEdit = {
        ...state.summaryOfChosenItems[state.activeSummaryItemId],
      };

      if (action.isAdd)
        itemToEdit.cards = [...itemToEdit.cards, action.payload];
      else
        itemToEdit.cards = itemToEdit.cards.filter(
          (card) => card.id !== action.payload.id
        );

      return {
        ...state,
        summaryOfChosenItems: {
          ...state.summaryOfChosenItems,
          [state.activeSummaryItemId]: itemToEdit,
        },
      };
    }

    case TOGGLE_WORD: {
      const itemToEdit = {
        ...state.summaryOfChosenItems[state.activeSummaryItemId],
      };

      if (action.isAdd) {
        itemToEdit[action.typeOfWord] = [
          ...itemToEdit[action.typeOfWord],
          action.payload,
        ];
      } else
        itemToEdit[action.typeOfWord] = itemToEdit[action.typeOfWord].filter(
          (word) => word !== action.payload
        );

      if (action.typeOfWord === "sentences")
        itemToEdit.questions[QUESTIONS[action.question]] = itemToEdit[
          action.typeOfWord
        ].join(" ");
      else
        itemToEdit.questions[QUESTIONS[action.question]] = itemToEdit[
          action.typeOfWord
        ].join(", ");

      return {
        ...state,
        summaryOfChosenItems: {
          ...state.summaryOfChosenItems,
          [state.activeSummaryItemId]: itemToEdit,
        },
      };
    }

    case ADD_SUMMARY_ITEM:
      return {
        ...state,
        activeSummaryItemId: action.id,
        summaryOfChosenItems: {
          ...state.summaryOfChosenItems,
          [action.id]: {
            id: action.id,
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
      };

    case DELETE_SUMMARY_ITEM:
      const newSummaryItems = { ...state.summaryOfChosenItems };
      delete newSummaryItems[action.id];
      return {
        ...state,
        activeSummaryItemId:
          state.activeSummaryItemId === action.id
            ? ""
            : state.activeSummaryItemId,
        summaryOfChosenItems: newSummaryItems,
      };

    case ADD_ANSWER_TO_A_QUESTION:
      const newSummaryItem = { ...state.summaryOfChosenItems[action.id] };
      newSummaryItem.questions[action.question] = action.answer;

      if (!action.listMode && action.wordType) {
        newSummaryItem[action.wordType] = [];
      }

      return {
        ...state,
        summaryOfChosenItems: {
          ...state.summaryOfChosenItems,
          [action.id]: newSummaryItem,
        },
      };

    case LOAD_SUMMARY_ITEMS:
      return {
        ...state,
        initialLoadFinished: true,
        summaryOfChosenItems: action.items,
        numOfItems: Object.keys(action.items).length,
      };

    default:
      return state;
  }
};

export default reducer;
