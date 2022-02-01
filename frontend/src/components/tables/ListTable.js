import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductsAction,
	deleteProductAction,
} from "../../pages/product/productAction";

export const ListTable = () => {
	const dispatch = useDispatch();
	const { productList } = useSelector(state => state.product);

	useEffect(() => {
		dispatch(getProductsAction());
	}, [dispatch]);

	const handOnDelete = _id => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			dispatch(deleteProductAction(_id));
		}
	};

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Status</th>
						<th>Title</th>
						<th>Price</th>
						<th>Qty</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{productList?.length ? (
						productList.map((row, i) => (
							<tr key={row._id}>
								<td>{i + 1}</td>
								<td>{row.status === true ? "Online" : "Offline"}</td>
								<td>{row.title}</td>
								<td>$ {row.price}</td>
								<td>{row.qty}</td>
								<td>
									<Button variant="info">Edit</Button>
								</td>
								<td>
									<Button
										variant="danger"
										onClick={() => handOnDelete(row._id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="7" className="text-center">
								No product to show
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};
