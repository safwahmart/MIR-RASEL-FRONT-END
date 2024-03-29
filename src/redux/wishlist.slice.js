import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    getWishlist: (state, action) => {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
    addToWishlist: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    addToWishlistDetail: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      debugger;
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: action.quantity??1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromWishlist: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;

export const {
  getWishlist,
  addToWishlist,
  addToWishlistDetail,
  incrementQuantity,
  decrementQuantity,
  removeFromWishlist,
} = wishlistSlice.actions;