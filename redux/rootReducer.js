import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import { cart, data, userData } from './reducer';

const userPersistConfig = {
  key: 'userData',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cart,
  data,
  userData: persistReducer(userPersistConfig, userData),
});

export default rootReducer;
