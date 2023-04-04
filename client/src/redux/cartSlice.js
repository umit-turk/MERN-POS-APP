import { createSlice } from "@reduxjs/toolkit";

let cartItems = [];
let total = 0;
let cart = localStorage.getItem("cart");
if(cart) {
  console.log(localStorage.getItem("cart"))
  try {
    cartItems = JSON.parse(cart).cartItems
    total = JSON.parse(cart).total
  } catch (error) {
    console.log(error)
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItems,
    total: total,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.total += action.payload.price;
      state.total.toFixed(2);
    },
    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.total -= action.payload.price * action.payload.quantity;
    },
    increase: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      findCartItem.quantity += 1;
      state.total += findCartItem.price;
    },
    decrease: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      findCartItem.quantity -= 1;
      if (findCartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= findCartItem.price;
    },
    clearCart:(state) => {
      state.cartItems = [];
      state.total = 0;
    }
  },
});

export const { addProduct, deleteCart, increase, decrease, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
