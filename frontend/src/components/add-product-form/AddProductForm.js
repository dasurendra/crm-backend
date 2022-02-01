import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import { FormGroup } from "../form-group/FormGroup";
import { addProductAction } from "../../pages/product/productAction";

const initialState = {
	status: false,
	title: "dSamsungrc Mobile",
	price: 500,
	qty: 50,
	description: "cAwesomevr TV",
	categories: "slfjsl345808",
	salePrice: 0,
	saleStartDate: "",
	saleEndDate: "",
	brand: "samsung",
};

const inputFields = [
	{
		label: "Title",
		name: "title",
		placeholder: "Samsung TV",
		required: true,
	},
	{
		label: "Price",
		type: "number",
		name: "price",
		placeholder: "20",
		required: true,
	},
	{
		label: "QTY",
		name: "qty",
		type: "number",
		placeholder: "18",
		required: true,
	},
	{
		label: "Description",
		name: "description",
		as: "textarea",
		rows: 4,
		placeholder: "Full product description",
		required: true,
	},

	{
		label: "Sale Price",
		type: "number",
		name: "salePrice",
		placeholder: "20",
	},
	{
		label: "Sale Start Date",
		type: "date",
		name: "saleStartDate",
	},
	{
		label: "Sale End Date",
		type: "date",
		name: "saleEndDate",
	},
	{
		label: "Brand",
		name: "brand",
		placeholder: "Samsung",
	},
];
export const AddProductForm = () => {
	const dispatch = useDispatch();
	const { isPending, productResp } = useSelector(state => state.product);
	const [product, setProduct] = useState(initialState);

	const handleOnSubmit = e => {
		e.preventDefault();
		dispatch(addProductAction(product));
	};

	const handleOnChange = e => {
		const { checked, name, value } = e.target;

		if (name === "status") {
			return setProduct({
				...product,
				status: checked,
			});
		}

		setProduct({
			...product,
			[name]: value,
		});
	};

	return (
		<div className="px-3">
			{isPending && <Spinner variant="info" animation="border" />}
			{productResp?.message && (
				<Alert
					variant={productResp.status === "success" ? "success" : "danger"}
				>
					{productResp.message}
				</Alert>
			)}
			<Form onSubmit={handleOnSubmit}>
				<Form.Group as={Row} className="mb-3">
					<Form.Check
						type="switch"
						name="status"
						id="custom-switch"
						label="Status"
						onChange={handleOnChange}
					/>
				</Form.Group>

				{inputFields.map((row, i) => (
					<FormGroup {...row} onChange={handleOnChange} />
				))}

				<Button variant="success" type="submit">
					Add new product
				</Button>
			</Form>
		</div>
	);
};
