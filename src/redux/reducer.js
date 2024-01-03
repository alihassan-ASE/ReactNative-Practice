import { 
  DATA_FROM_API_CALL, 
  USER_DATA
} from "./constants";

const initialState = {
  data: [],
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case DATA_FROM_API_CALL:
      const users = action.payload;
      return { ...state, data: users };
    default:
      return state;
  }
};

export const userData = (state = [], action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        credentials: action.data
      };
    default:
      return state;
  }
}