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
} from "react-bootstrap";
import { updateUserProfileAction } from "../../pages/admin-user/userAction";

export const EditAdminProfile = () => {
	const dispatch = useDispatch();

	const { isPending, userResp, user } = useSelector(state => state.user);
	const [userInfo, setUserInfo] = useState(user);

	useEffect(() => {
		setUserInfo(user);
	}, [user]);

	const handleOnSubmit = e => {
		e.preventDefault();
		const { fname, lname, dob, phone, address, gender } = userInfo;

		const obj = { fname, lname, dob, phone, address, gender };

		dispatch(updateUserProfileAction(obj));
	};

	const handleOnChange = e => {
		const { name, value } = e.target;
		setUserInfo({
			...userInfo,
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
						First Name *
					</Form.Label>
					<Col sm="9">
						<Form.Control
							name="fname"
							value={userInfo.fname}
							placeholder="Sam"
							required
							onChange={handleOnChange}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Last Name *
					</Form.Label>
					<Col sm="9">
						<Form.Control
							name="lname"
							value={userInfo.lname}
							placeholder="Smith"
							required
							onChange={handleOnChange}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						DOB
					</Form.Label>
					<Col sm="9">
						<Form.Control
							type="date"
							name="dob"
							value={userInfo.dob ? userInfo.dob.substr(0, 10) : undefined}
							onChange={handleOnChange}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Email *
					</Form.Label>
					<Col sm="9">
						<Form.Control
							type="email"
							name="email"
							value={userInfo.email}
							placeholder="your@email.com"
							required
							// onChange={handleOnChange}
							disabled
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Phone
					</Form.Label>
					<Col sm="9">
						<Form.Control
							name="phone"
							value={userInfo.phone}
							placeholder="0410000000"
							onChange={handleOnChange}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Address
					</Form.Label>
					<Col sm="9">
						<Form.Control
							name="address"
							value={userInfo.address}
							placeholder="Sydney, 2000"
							onChange={handleOnChange}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 mt-3">
					<Form.Label column sm="3">
						Gender
					</Form.Label>
					<Col sm="9">
						<InputGroup>
							<InputGroup.Radio
								name="gender"
								value="male"
								checked={userInfo.gender === "male"}
								aria-label="Male"
								onChange={handleOnChange}
							/>
							<Form.Label>Male</Form.Label>

							<InputGroup.Radio
								name="gender"
								value="female"
								checked={userInfo.gender === "female"}
								aria-label="Female"
								onChange={handleOnChange}
							/>
							<Form.Label>Female</Form.Label>
						</InputGroup>
					</Col>
				</Form.Group>
				<div className="d-grid gap-2">
					<Button type="submit" variant="primary" size="lg">
						Update Profile
					</Button>
				</div>
			</Form>
		</Card>
	);
};
