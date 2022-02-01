import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPending: false,
	userResp: {},
	emailVerificationResp: {},
	isLoggedIn: false,
	showResetPassForm: false,
	user: {},
	passResetEmail: "",
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		resPending: state => {
			state.isPending = true;
		},
		registrationSuccess: (state, { payload }) => {
			state.isPending = false;
			state.userResp = payload;
		},
		emailVerificationSuccess: (state, { payload }) => {
			state.isPending = false;
			state.emailVerificationResp = payload;
		},
		logInSuccess: (state, { payload }) => {
			state.isPending = false;
			state.userResp = {};
			state.isLoggedIn = true;
			state.user = payload;
		},
		autoLogin: state => {
			state.isLoggedIn = true;
		},

		logOutUserSuccess: state => {
			state.isLoggedIn = false;
			state.user = {};
		},

		getAdminProfile: (state, { payload = {} }) => {
			state.isPending = false;
			state.user = payload;
		},
		updateAdminProfile: (state, { payload = {} }) => {
			state.isPending = false;
			state.userResp = payload;
		},
		updateAdminPassword: (state, { payload = {} }) => {
			state.isPending = false;
			state.userResp = payload;
		},
		togglePasswordResetForm: state => {
			state.showResetPassForm = !state.showResetPassForm;
		},
		requestOTPSuccess: (state, { payload = {} }) => {
			state.isPending = false;
			state.userResp = payload.data;
			state.showResetPassForm = true;
			state.passResetEmail = payload.email;
		},

		resFail: (state, { payload }) => {
			state.isPending = false;
			state.userResp = payload;
		},
	},
});

const { reducer, actions } = userSlice;

export const {
	resPending,
	registrationSuccess,
	emailVerificationSuccess,
	logInSuccess,
	autoLogin,
	logOutUserSuccess,
	getAdminProfile,
	updateAdminProfile,
	updateAdminPassword,
	togglePasswordResetForm,
	requestOTPSuccess,
	resFail,
} = actions;

export default reducer;
