import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000";
const tokenAPI = rootUrl + "/api/v1/token";

export const newAccessJWT = async () => {
	try {
		//remove old token
		window.sessionStorage.removeItem("accessJWT");

		// request new token form server
		const { data } = await axios.get(tokenAPI, {
			headers: {
				Authorization: window.localStorage.getItem("refreshJWT"),
			},
		});

		// set new token in the session
		data && window.sessionStorage.setItem("accessJWT", data.accessJWT);

		return window.sessionStorage.getItem("accessJWT");
	} catch (error) {
		return false;
	}
};

export const requestPasswordResetOTP = async email => {
	try {
		const { data } = await axios.post(tokenAPI + "/request-otp", email);

		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};
