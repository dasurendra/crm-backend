import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPending: false,
	productResp: {},
	productList: [],
	selectedProduct: {},
};

const productSlice = createSlice({
	name: "productSlice",
	initialState,
	reducers: {
		resPending: state => {
			state.isPending = true;
		},
		getProducts: (state, { payload = [] }) => {
			state.isPending = false;
			state.productList = payload;
		},
		getSingleProduct: (state, { payload = {} }) => {
			state.isPending = false;
			state.selectedProduct = payload;
		},
		deleteProdSuccess: (state, { payload = {} }) => {
			state.isPending = false;
			state.productResp = payload;
		},
		addProdSuccess: (state, { payload = {} }) => {
			state.isPending = false;
			state.productResp = payload;
		},

		resFail: (state, { payload }) => {
			state.isPending = false;
			state.productResp = payload;
		},
	},
});

const { reducer, actions } = productSlice;

export const {
	resPending,
	getProducts,
	getSingleProduct,
	deleteProdSuccess,
	addProdSuccess,
	resFail,
} = actions;

export default reducer;
