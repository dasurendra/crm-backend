import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000";
const productAPI = rootUrl + "/api/v1/product";

export const fetchProduct = async slug => {
	try {
		const apiEndpoint = slug ? productAPI + "/" + slug : productAPI;
		const { data } = await axios.get(apiEndpoint, {
			headers: {
				Authorization: window.localStorage.getItem("refreshJWT"),
			},
		});

		return data;
	} catch (error) {
		return error.response?.data || { status: "error", message: error.message };
	}
};

export const deleteProduct = async _id => {
	try {
		const { data } = await axios.delete(productAPI + "/" + _id, {
			headers: {
				Authorization: window.localStorage.getItem("refreshJWT"),
			},
		});

		return data;
	} catch (error) {
		return error.response?.data || { status: "error", message: error.message };
	}
};

export const addProduct = async prodInfo => {
	try {
		const { data } = await axios.post(productAPI, prodInfo, {
			headers: {
				Authorization: window.localStorage.getItem("refreshJWT"),
			},
		});

		return data;
	} catch (error) {
		return error.response?.data || { status: "error", message: error.message };
	}
};
