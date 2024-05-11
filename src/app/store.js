import { configureStore } from '@reduxjs/toolkit';
import { authDataReducer } from '../Modules/Auth/features/AuthSlice';
import { productReducer } from '../Modules/Product/ProductSlice';
import { orderReducer } from '../Modules/Order/OrderSlice';

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    product:productReducer,
    order:orderReducer
  },
});
