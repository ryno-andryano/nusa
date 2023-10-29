import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.items.push({
        menu: action.payload,
        quantity: 1,
        subtotal: action.payload.price,
      });
      state.totalPrice += action.payload.price;
    },
    removeCartItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.menu.id === action.payload.id,
      );
      state.totalPrice -= state.items[index].subtotal;
      state.items.splice(index, 1);
    },
    increaseQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.menu.id === action.payload.id,
      );
      state.items[index].quantity += 1;
      state.items[index].subtotal += action.payload.price;
      state.totalPrice += action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.menu.id === action.payload.id,
      );
      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        state.items[index].subtotal -= action.payload.price;
        state.totalPrice -= action.payload.price;
      }
    },
    emptyCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
