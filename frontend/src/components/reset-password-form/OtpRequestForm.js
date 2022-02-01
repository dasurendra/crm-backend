import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import { requestOTPAction } from "../../pages/admin-user/userAction";

export const OtpRequestForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const { isPending, userResp } = useSelector(state => state.user);

	const [email, setEmail] = useState("");

	// useEffect(() => {
	// 	!isLoggedIn && dispatch(autoLoginAction());

	// 	isLoggedIn && history.replace(from);
	// }, [isLoggedIn, history, from, dispatch]);

	const handleOnChange = e => {
		const { value } = e.target;
		setEmail(value);
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		email && dispatch(requestOTPAction(email));
	};

	return (
		<div style={{ width: "500px" }}>
			<Card className="p-5 mt-4">
				<h1>Request OTP</h1>

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
								// value={loginInfo.email}
								placeholder="your@email.com"
								required
								onChange={handleOnChange}
							/>
						</Col>
					</Form.Group>

					<div className="d-grid gap-2">
						<Button type="submit" variant="primary" size="lg">
							Request OTP
						</Button>
					</div>
				</Form>

				<a className="mt-2 text-end" href="/">
					Login now
				</a>
			</Card>
		</div>
	);
};
