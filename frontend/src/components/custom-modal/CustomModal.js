import React from "react";
import { Modal, Button } from "react-bootstrap";

export const CustomModal = ({ title, children, ...rest }) => {
	return (
		<Modal
			{...rest}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button onClick={rest.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
