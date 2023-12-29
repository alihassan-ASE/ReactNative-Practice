import { 
  Add_TO_CART, 
  DATA_FROM_API_CALL, 
  REMOVE_FROM_CART, 
  USER_DATA
} from "./constants";

const initialState = {
  cart: [],
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case Add_TO_CART:
      const updatedCart = [...state.cart, action.data];
      return { cart: updatedCart };

    case REMOVE_FROM_CART:
      const indexToRemove = state.cart.findIndex(item => item.title === action.data);
      if (indexToRemove !== -1) {
        const updatedCart = [
          ...state.cart.slice(0, indexToRemove),
          ...state.cart.slice(indexToRemove + 1)
        ];
        return {
          ...state,
          cart: updatedCart
        };
      }
      return state;

    default:
      return state;
  }
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case DATA_FROM_API_CALL:
      const newData = action.payload || state;
      return [newData];
    default:
      return state;
  }
};

export const userData = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        credentials: action.data
      };
    default:
      return state;
  }
}

