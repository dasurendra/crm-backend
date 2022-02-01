import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPending: false,
	categoryResp: {},
	catList: [],
	selectedCat: {},
};
const catSlice = createSlice({
	name: "catSlice",
	initialState,
	reducers: {
		reqPending: state => {
			state.isPending = true;
		},
		fetchCategoriesSuccess: (state, { payload }) => {
			state.isPending = false;
			state.catList = payload.categories;
		},

		addCatSuccess: (state, { payload }) => {
			state.isPending = false;
			state.categoryResp = payload;
		},

		deleteCatSuccess: (state, { payload }) => {
			state.isPending = false;
			state.categoryResp = payload;
		},
		updateCatSuccess: (state, { payload }) => {
			state.isPending = false;
			state.categoryResp = payload;
		},

		onCategorySelect: (state, { payload }) => {
			state.selectedCat = payload;
		},
		onDeSelectCategory: state => {
			state.selectedCat = {};
		},
		reqFails: (state, { payload }) => {
			state.isPending = false;
			state.categoryResp = payload;
		},
	},
});

const { reducer, actions } = catSlice;
export const {
	reqPending,
	fetchCategoriesSuccess,
	deleteCatSuccess,
	addCatSuccess,
	updateCatSuccess,
	onCategorySelect,
	onDeSelectCategory,
	reqFails,
} = actions;

export default reducer;
