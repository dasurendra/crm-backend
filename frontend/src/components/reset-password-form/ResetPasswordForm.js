import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
	Card,
	Col,
	Form,
	Row,
	Button,
	Spinner,
	Alert,
	ListGroup,
} from "react-bootstrap";
import { resetPasswordAction } from "../../pages/admin-user/userAction";

const initialState = {
	otp: undefined,
	password: "",
	confirmPassword: "",
};

const initialError = {
	isMatched: false,
	hasNumber: false,
	hasUpper: false,
	hasLower: false,
	isLengthy: false,
	hasSymbol: false,
};
export const ResetPasswordForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const [userPassword, setUserPassword] = useState(initialState);
	const [passError, setPassError] = useState(initialError);

	const { isPending, userResp, passResetEmail } = useSelector(
		state => state.user
	);

	const handleOnChange = e => {
		const { name, value } = e.target;
		const { password, confirmPassword } = userPassword;

		let isMatched = false;
		if (name === "password") {
			isMatched = confirmPassword === value;

			setPassError({
				...passError,
				isMatched,
			});
		}

		if (name === "confirmPassword") {
			isMatched = password === value;
			const isLengthy = value.length > 6;
			const hasUpper = /[A-Z]/.test(value);
			const hasLower = /[a-z]/.test(value);
			const hasNumber = /[0-9]/.test(value);
			const hasSymbol = /[!, @, #, $, %, ^, (, *, &]/.test(value);

			setPassError({
				...passError,
				isMatched,
				isLengthy,
				hasUpper,
				hasLower,
				hasNumber,
				hasSymbol,
			});
		}

		setUserPassword({
			...userPassword,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		const { otp, password } = userPassword;

		const obj = {
			otp,
			email: passResetEmail,
			password,
		};

		dispatch(resetPasswordAction(obj));
	};

	return (
		<div style={{ width: "500px" }}>
			<Card className="p-5 mt-4">
				<h1 className="text-danger">Reset password 🤐</h1>

				{isPending && <Spinner variant="primary" animation="border" />}
				{userResp?.message && (
					<Alert variant={userResp.status === "success" ? "success" : "danger"}>
						{userResp.message}
					</Alert>
				)}
				<hr />
				<Form onSubmit={handleOnSubmit}>
					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							Email *
						</Form.Label>
						<Col sm="9">
							<Form.Control
								type="email"
								name="email"
								value={passResetEmail}
								required
								disabled
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							OTP *
						</Form.Label>
						<Col sm="9">
							<Form.Control
								type="number"
								name="otp"
								placeholder="154523"
								required
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							New password *
						</Form.Label>
						<Col sm="9">
							<Form.Control
								name="password"
								type="password"
								// value={userPassword.password}
								placeholder="*****"
								required
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							Confirm Password *
						</Form.Label>
						<Col sm="9">
							<Form.Control
								name="confirmPassword"
								type="password"
								// value={userPassword.confirmPassword}
								placeholder="****"
								required
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							Must follow the following validation
						</Form.Label>
						<Col sm="9">
							<ListGroup>
								<ListGroup.Item
									variant={passError.isMatched ? "success" : "danger"}
								>
									Password does not match
								</ListGroup.Item>
								<ListGroup.Item
									variant={passError.isLengthy ? "success" : "danger"}
								>
									Minimum 6 characters
								</ListGroup.Item>
								<ListGroup.Item
									variant={passError.hasUpper ? "success" : "danger"}
								>
									Uppercase
								</ListGroup.Item>
								<ListGroup.Item
									variant={passError.hasLower ? "success" : "danger"}
								>
									Lowercase
								</ListGroup.Item>
								<ListGroup.Item
									variant={passError.hasNumber ? "success" : "danger"}
								>
									number
								</ListGroup.Item>
								<ListGroup.Item
									variant={passError.hasSymbol ? "success" : "danger"}
								>
									One of the following ! @ # $ % ^ ( * &
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Form.Group>

					<div className="d-grid gap-2">
						<Button
							type="submit"
							variant="primary"
							size="lg"
							disabled={Object.values(passError).includes(false)}
						>
							Update password
						</Button>
					</div>
				</Form>

				<a className="mt-2 text-end" href="/">
					Login Now
				</a>
			</Card>
		</div>
	);
};
