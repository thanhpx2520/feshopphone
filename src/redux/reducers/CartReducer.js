import { createSlice } from "@reduxjs/toolkit";

const CartReducer = createSlice({
  name: "CartReducer",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      let isProductExists = false;
      state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += action.payload.qty;
          isProductExists = true;
        }
        return item;
      });
      if (!isProductExists) {
        state.items.push(action.payload);
      }
    },
    updateItemCart: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty = action.payload.qty;
        }
        return item;
      });
    },
    deleteItemCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateItemCart, deleteItemCart, clearCart } = CartReducer.actions;
export default CartReducer.reducer;
