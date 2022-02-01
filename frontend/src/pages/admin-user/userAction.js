import {
	resPending,
	registrationSuccess,
	emailVerificationSuccess,
	logInSuccess,
	autoLogin,
	logOutUserSuccess,
	getAdminProfile,
	updateAdminProfile,
	updateAdminPassword,
	requestOTPSuccess,
	resFail,
} from "./userSlice";
import {
	createNewUser,
	verifyNewUserEmail,
	loginAdmin,
	fetchUserProfile,
	updateUserProfile,
	updateUserPassword,
	resetUserPassword,
} from "../../apis/userApi";

import { newAccessJWT, requestPasswordResetOTP } from "../../apis/tokenApi";
import { reqFails } from "../category/categorySlice";

export const createUser = userInfo => async dispatch => {
	dispatch(resPending());

	//call api
	const result = await createNewUser(userInfo);

	result.status === "success"
		? dispatch(registrationSuccess(result))
		: dispatch(resFail(result));
};

export const verifyUserEmail = userInfo => async dispatch => {
	dispatch(resPending());

	//call api
	const result = await verifyNewUserEmail(userInfo);
	dispatch(emailVerificationSuccess(result));
};

export const adminLogin = loginInfo => async dispatch => {
	dispatch(resPending());

	//call api
	const result = await loginAdmin(loginInfo);

	if (result.status === "success") {
		window.sessionStorage.setItem("accessJWT", result.tokens?.accessJWT);
		window.localStorage.setItem("refreshJWT", result.tokens?.refreshJWT);
		return dispatch(logInSuccess(result.user));
	}

	dispatch(resFail(result));
};

export const autoLoginAction = () => async dispatch => {
	const accessJWT = window.sessionStorage.getItem("accessJWT");
	const refreshJWT = window.localStorage.getItem("refreshJWT");
	//1. auto login when we have both the jwt
	if (accessJWT && refreshJWT) {
		return dispatch(autoLogin());
	}

	//2. auto login when we have refreshJWT only
	if (!accessJWT && refreshJWT) {
		const data = await newAccessJWT();

		if (data) {
			return dispatch(autoLogin());
		}
	}

	dispatch(userLogOut());
};

export const userLogOut = () => dispatch => {
	window.sessionStorage.removeItem("accessJWT");
	window.localStorage.removeItem("refreshJWT");

	//log out from server by removing tokens from database

	dispatch(logOutUserSuccess());
};

export const getUserProfile = () => async dispatch => {
	dispatch(resPending());
	const result = await fetchUserProfile();

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(getUserProfile());
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		return dispatch(getAdminProfile(result.user));
	}

	dispatch(resFail(result));
};

export const updateUserProfileAction = obj => async dispatch => {
	dispatch(resPending());
	const result = await updateUserProfile(obj);

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(updateUserProfileAction(obj));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		dispatch(updateAdminProfile(result));
		dispatch(getUserProfile());
		return;
	}

	dispatch(resFail(result));
};

export const updateUserPasswordAction = obj => async dispatch => {
	dispatch(resPending());
	const result = await updateUserPassword(obj);

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(updateUserPasswordAction(obj));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		dispatch(updateAdminPassword(result));
		return;
	}

	dispatch(resFail(result));
};

export const requestOTPAction = email => async dispatch => {
	dispatch(resPending());

	const data = await requestPasswordResetOTP({ email });

	data.status === "success"
		? dispatch(requestOTPSuccess({ data, email }))
		: dispatch(resFail(data));
};

export const resetPasswordAction = obj => async dispatch => {
	dispatch(resPending());

	const data = await resetUserPassword(obj);

	data.status === "success"
		? dispatch(updateAdminPassword(data))
		: dispatch(resFail(data));
};
