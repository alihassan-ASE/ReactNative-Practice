import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './features/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import ProductsSlice from './features/ProductsSlice';
import CartSlice from './features/CartSlice';

const reducers = combineReducers({
  auth: AuthSlice,
  products: ProductsSlice,
  cartItems: CartSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};
