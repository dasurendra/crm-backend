import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import { adminLogin, autoLoginAction } from "../../pages/admin-user/userAction";

const initialState = {
	email: "test2@a.com",
	password: "DaA3$1234s",
};
export const LoginForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const { isPending, userResp, isLoggedIn } = useSelector(state => state.user);

	const [loginInfo, setLoginInfo] = useState(initialState);
	const from = location?.state?.from?.pathname || "/dashboard";

	useEffect(() => {
		!isLoggedIn && dispatch(autoLoginAction());

		isLoggedIn && history.replace(from);
	}, [isLoggedIn, history, from, dispatch]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		setLoginInfo({
			...loginInfo,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		if (!loginInfo.email || !loginInfo.password) {
			return alert("Please input both email and password");
		}

		dispatch(adminLogin(loginInfo));
	};

	return (
		<div style={{ width: "500px" }}>
			<Card className="p-5 mt-4">
				<h1>Admin User Login</h1>

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
								value={loginInfo.email}
								placeholder="your@email.com"
								required
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3 mt-3">
						<Form.Label column sm="3">
							Password *
						</Form.Label>
						<Col sm="9">
							<Form.Control
								type="password"
								name="password"
								placeholder="Password"
								value={loginInfo.password}
								required
								minLength="6"
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<div className="d-grid gap-2">
						<Button type="submit" variant="primary" size="lg">
							Login
						</Button>
					</div>
				</Form>

				<a className="mt-2 text-end" href="/reset-password">
					Forgot password?
				</a>
			</Card>
		</div>
	);
};
