import {
	resPending,
	getProducts,
	getSingleProduct,
	addProdSuccess,
	deleteProdSuccess,
	resFail,
} from "./productSlice";
import { fetchProduct, deleteProduct, addProduct } from "../../apis/productApi";
import { newAccessJWT } from "../../apis/tokenApi";

import { userLogOut } from "../admin-user/userAction";

export const getProductsAction = () => async dispatch => {
	dispatch(resPending());

	const data = await fetchProduct();

	//=== re auth
	if (data.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(getProductsAction());
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth

	data.status === "success"
		? dispatch(getProducts(data.result))
		: dispatch(resFail(data));
};

export const deleteProductAction = _id => async dispatch => {
	dispatch(resPending());

	const data = await deleteProduct(_id);

	//=== re auth
	if (data.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(deleteProductAction(_id));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth
	if (data.status === "success") {
		dispatch(deleteProdSuccess(data));
		dispatch(getProductsAction());
		return;
	}

	dispatch(resFail(data));
};
export const addProductAction = prodInf => async dispatch => {
	dispatch(resPending());

	const data = await addProduct(prodInf);

	//=== re auth
	if (data.message === "jwt expired") {
		const token = await newAccessJWT();

		if (token) {
			dispatch(addProductAction(prodInf));
		} else {
			dispatch(userLogOut());
		}
	}
	//====== re auth
	if (data.status === "success") {
		dispatch(addProdSuccess(data));
		dispatch(getProductsAction());
		return;
	}

	dispatch(resFail(data));
};
