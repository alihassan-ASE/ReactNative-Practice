import { Add_TO_CART, REMOVE_FROM_CART, DATA_FROM_API_CALL, USER_DATA } from "./constants";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = () => {
    return async (dispatch, getState) => {
        const res = await axios.get('https://facebook.github.io/react-native/movies.json');
        dispatch({
            type: DATA_FROM_API_CALL,
            payload: res.data,
        })
    }
}

export const userCredentials = (userData) => {
    return {
        type: USER_DATA,
        data: userData
    }
}

export const addToCart = (item) => {
    return async (dispatch, getState) => {
        dispatch({
            type: Add_TO_CART,
            data: item,
        });

        const updatedCart = getState().cart.cart;
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };
}

export const removeFromCart = (item) => {
    return async (dispatch, getState) => {
        dispatch({
          type: REMOVE_FROM_CART,
          data: item.title,
        });
    
        const updatedCart = getState().cart.cart;
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      };
}