import {
	reqPending,
	fetchCategoriesSuccess,
	addCatSuccess,
	updateCatSuccess,
	deleteCatSuccess,
	reqFails,
} from "./categorySlice";
import {
	fetchCategory,
	addCategory,
	deleteCategory,
	updateCategory,
} from "../../apis/categoryApi";
import { newAccessJWT } from "../../apis/tokenApi";
import { userLogOut } from "../admin-user/userAction";

export const getCategories = () => async dispatch => {
	dispatch(reqPending());

	const result = await fetchCategory();

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(getCategories());
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result?.status === "success") {
		return dispatch(fetchCategoriesSuccess(result));
	}

	dispatch(reqFails(result));
};

export const addNewCat = catObj => async dispatch => {
	dispatch(reqPending());

	const result = await addCategory(catObj);

	console.log(result);
	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(addNewCat(catObj));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		dispatch(addCatSuccess(result));
		dispatch(getCategories());
		return;
	}
	dispatch(reqFails(result));
};

export const categoryUpdate = catObj => async dispatch => {
	dispatch(reqPending());

	const result = await updateCategory(catObj);

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(categoryUpdate(catObj));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		dispatch(updateCatSuccess(result));
		dispatch(getCategories());
		return;
	}
	dispatch(reqFails(result));
};

export const categoryDelete = id => async dispatch => {
	dispatch(reqPending());

	const result = await deleteCategory(id);

	//=== re auth
	if (result.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(categoryDelete(id));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	if (result.status === "success") {
		dispatch(deleteCatSuccess(result));
		dispatch(getCategories());
		return;
	}
	dispatch(reqFails(result));
};
