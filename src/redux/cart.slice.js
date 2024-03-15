import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		getCart: (state, action) => {
			if (state.length === 0) {
				state.push(...action.payload);
			}
		},
		addToCart: (state, action) => {
			const itemExists = state.find((item) => item.id === action.payload.id);
			if (itemExists) {
				itemExists.quantity++;
			} else {
				const discount = action.payload.sale_price - ((action.payload.sale_price * action.payload.discount) / 100);
				debugger;
				if (discount) {
					action.payload.sale_price = discount
				}
				state.push({ ...action.payload, quantity: 1 });
			}
		},
		addToCartDetail: (state, action) => {
			const itemExists = state.find((item) => item.id === action.payload.id);
			debugger;
			if (itemExists) {
				itemExists.quantity++;
			} else {
				state.push({ ...action.payload, quantity: action.quantity ?? 1 });
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
		removeFromCart: (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload);
			state.splice(index, 1);
		},
	},
});

export const cartReducer = cartSlice.reducer;

export const {
	getCart,
	addToCart,
	addToCartDetail,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} = cartSlice.actions;