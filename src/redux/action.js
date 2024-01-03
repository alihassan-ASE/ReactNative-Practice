import { Add_TO_CART, REMOVE_FROM_CART, DATA_FROM_API_CALL, USER_DATA } from "./constants";
import { getData } from "../services/apicalls";

export const fetchUsersData = () => async (dispatch) => {
  try {
    const users = await getData();
    dispatch({
      type: DATA_FROM_API_CALL,
      payload: users,
    });
  } catch (error) {
    console.log('Error getting Users Data', error);
  }
};

export const userCredentials = (userData) => ({
  type: USER_DATA,
  data: userData,
});

export const addToCart = (item) => ({
  type: Add_TO_CART,
  data: item,
});

export const removeFromCart = (itemTitle) => ({
  type: REMOVE_FROM_CART,
  data: itemTitle,
});
