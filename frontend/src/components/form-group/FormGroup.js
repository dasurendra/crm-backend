import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const FormGroup = ({ label, ...rest }) => {
	return (
		<Form.Group as={Row} className="mb-3">
			<Form.Label column sm="3">
				{label}
			</Form.Label>
			<Col sm="9">
				<Form.Control {...rest} />
			</Col>
		</Form.Group>
	);
};
