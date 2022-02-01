import React from "react";
import { useDispatch } from "react-redux";
import { Navbar, Container, Nav } from "react-bootstrap";
import { userLogOut } from "../../pages/admin-user/userAction";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export const Header = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<Navbar collapseOnSelect bg="primary" variant="dark" expand="md">
				<Container>
					<Navbar.Brand href="/dashboard">Eshop Admin</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/admin-profile">
								<Nav.Link>
									<i className="fas fa-user-tie"></i>
								</Nav.Link>
							</LinkContainer>

							<Nav.Link
								href="#"
								onClick={() => {
									dispatch(userLogOut());
								}}
							>
								Logout
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
