import { Button } from "react-bootstrap";
import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { ListTable } from "../../components/tables/ListTable";
import { Link } from "react-router-dom";

const Product = () => {
	return (
		<AdminLayout>
			<div className="p-2">
				<h1>Product</h1>
				<hr />
				<div className="text-end">
					<Link to="/product/new">
						<Button variant="primary" className="text-end">
							<i class="fas fa-plus"></i> Add new product
						</Button>
					</Link>
				</div>

				<hr />
				<div className="product-list">
					<ListTable />
				</div>
			</div>
		</AdminLayout>
	);
};

export default Product;
