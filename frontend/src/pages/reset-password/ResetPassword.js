import React from "react";
import { useSelector } from "react-redux";
import { OtpRequestForm } from "../../components/reset-password-form/OtpRequestForm";
import { ResetPasswordForm } from "../../components/reset-password-form/ResetPasswordForm";

const Login = () => {
	const { showResetPassForm } = useSelector(state => state.user);
	return (
		<div className="d-flex justify-content-center mt-5">
			{showResetPassForm ? <ResetPasswordForm /> : <OtpRequestForm />}
		</div>
	);
};

export default Login;
