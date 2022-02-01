import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Card,
	Form,
	Row,
	Col,
	InputGroup,
	Button,
	Spinner,
	Alert,
	ListGroup,
} from "react-bootstrap";
import { updateUserPasswordAction } from "../../pages/admin-user/userAction";

const initialState = {
	currentPassword: "",
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

export const UpdateAdminPassword = () => {
	const dispatch = useDispatch();

	const { isPending, userResp } = useSelector(state => state.user);
	const [userPassword, setUserPassword] = useState(initialState);
	const [passError, setPassError] = useState(initialError);

	const handleOnSubmit = e => {
		e.preventDefault();
		const { password, currentPassword } = userPassword;
		dispatch(updateUserPasswordAction({ password, currentPassword }));
	};

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

	return (
		<Card className="p-2">
			{isPending && <Spinner variant="primary" animation="border" />}
			{userResp.message && (
				<Alert variant={userResp.status === "success" ? "success" : "danger"}>
					{userResp.message}
				</Alert>
			)}

			<Form onSubmit={handleOnSubmit}>
				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Current Password *
					</Form.Label>
					<Col sm="9">
						<Form.Control
							name="currentPassword"
							type="password"
							// value={userPassword.currentPassword}
							placeholder="Sam"
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
							placeholder="Sam"
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
							placeholder="Sam"
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
								one of the following ! @ # $ % ^ ( * &
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Form.Group>

				<div className="d-grid gap-2">
					<Button
						type="submit"
						variant="warning"
						size="lg"
						disabled={Object.values(passError).includes(false)}
					>
						Update Password
					</Button>
				</div>
			</Form>
		</Card>
	);
};
