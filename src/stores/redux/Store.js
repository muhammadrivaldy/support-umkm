import {configureStore} from '@reduxjs/toolkit';
import CreateOrderItems from './CreateOrderItems';

export default configureStore({
  reducer: {
    createOrderItems: CreateOrderItems,
  },
});
