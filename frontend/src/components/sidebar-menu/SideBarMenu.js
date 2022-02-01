import React from "react";
import { Link } from "react-router-dom";
import "./side-bar-menu.style.css";

export const SideBarMenu = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-top text-center">
				<i className="fas fa-user"></i>
			</div>
			<hr />
			<div className="sidebar-main">
				<ul>
					<li>
						<Link className="menu-item" to="/dashboard">
							<i className="fas fa-tachometer-alt"></i> Dashboard
						</Link>
					</li>
					<li>
						<Link className="menu-item" to="/categories">
							<i className="fas fa-sitemap"></i> Categories
						</Link>
					</li>
					<li>
						<Link className="menu-item" to="/products">
							<i className="fas fa-box-open"></i> Products
						</Link>
					</li>
					<li>
						<Link className="menu-item" to="/orders">
							<i className="fas fa-sort-amount-up-alt"></i> Orders
						</Link>
					</li>
					<li>
						<Link className="menu-item" to="/customers">
							<i className="fas fa-users"></i> Customers
						</Link>
					</li>

					<li>
						<Link className="menu-item" to="/payments">
							<i className="far fa-credit-card"></i> Payments
						</Link>
					</li>
				</ul>

				<hr />

				<ul>
					<li>
						<Link className="menu-item" to="/registration">
							<i className="fas fa-users"></i> Admin Users
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
