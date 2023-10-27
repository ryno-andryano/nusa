import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      menu: {
        id: 1,
        name: "Stuffed Tofu Parahyangan",
        category: "Appetizer",
        price: 69000,
        image:
          "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_C3D2F40C1F6B4219A5E70DF3D1B75EA2_1697015416.jpeg",
      },
      quantity: 1,
      subtotal: 69000,
    },
    {
      menu: {
        id: 15,
        name: "Malacca Nasi Lemak",
        category: "Rice & Noodle",
        price: 98000,
        image:
          "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_0F6DF9DF308849768BBE5D310EC8DEA6_1441771987.jpeg",
      },
      quantity: 1,
      subtotal: 98000,
    },
  ],
  totalPrice: 167000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    order: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    checkout: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { order, checkout } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

console.log(cartSlice);
