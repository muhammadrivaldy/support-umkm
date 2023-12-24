import {createSlice} from '@reduxjs/toolkit';

export const CreateOrderItems = createSlice({
  name: 'createOrderItems',
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter(idx => {
        return idx.id !== action.payload;
      });
    },
    resetItems: state => {
      state.value = [];
    },
  },
});

export const {addItem, deleteItem, resetItems} = CreateOrderItems.actions;
export const SelectCreateOrderItems = state => state.createOrderItems.value;
export default CreateOrderItems.reducer;
