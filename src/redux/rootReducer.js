import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import { data, userData } from './reducer';

const userPersistConfig = {
  key: 'userData',
  storage: AsyncStorage,
};

const userDataConfig = {
  key: 'users',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  users: persistReducer(userDataConfig, data),
  userData: persistReducer(userPersistConfig, userData),
});

export default rootReducer;
