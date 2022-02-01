import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Col,
	Form,
	Row,
	Button,
	FloatingLabel,
	Spinner,
	Alert,
} from "react-bootstrap";
import { categoryUpdate } from "../../pages/category/categoryAction";
import { CustomModal } from "../custom-modal/CustomModal";
import { onDeSelectCategory } from "../../pages/category/categorySlice";

export const EditCategoryForm = () => {
	const dispatch = useDispatch();
	const { isPending, catList, selectedCat, categoryResp } = useSelector(
		state => state.category
	);

	const [updateCat, setUpdateCat] = useState({});

	useEffect(() => {
		setUpdateCat(selectedCat);
	}, [selectedCat]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		setUpdateCat({
			...updateCat,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		const { _id, name, parentCat } = updateCat;

		if (name !== selectedCat.name || parentCat !== selectedCat.parentCat) {
			dispatch(categoryUpdate({ _id, name, parentCat }));
			return;
		}

		alert("Nothing has changed");
	};
	//parent cat only
	const parentCatOnly = catList.filter(row => !row.parentCat);

	return (
		<CustomModal
			show={selectedCat._id}
			onHide={() => dispatch(onDeSelectCategory())}
			title="Edit Category"
		>
			<div>
				{isPending && <Spinner variant="primary" animation="border" />}
				{categoryResp.message && (
					<Alert
						variant={categoryResp.status === "success" ? "success" : "danger"}
					>
						{categoryResp.message}
					</Alert>
				)}

				<Form onSubmit={handleOnSubmit}>
					<Row>
						<Col md={5} className="mt-2">
							<FloatingLabel
								controlId="floatingSelect"
								label="Enter Category Name"
							>
								<Form.Control
									name="name"
									value={updateCat.name}
									placeholder="Category name"
									onChange={handleOnChange}
									required
								/>
							</FloatingLabel>
						</Col>
						<Col md={5} className="mt-2">
							<FloatingLabel
								controlId="floatingSelect"
								label="Select Parent Category"
							>
								<Form.Select
									name="parentCat"
									onChange={handleOnChange}
									aria-label="Select Parent Category"
								>
									<option value="">Select Parent Category</option>
									{parentCatOnly.map((row, i) => (
										<option
											key={row._id}
											value={row._id}
											selected={row._id === updateCat.parentCat}
										>
											{row.name}
										</option>
									))}
								</Form.Select>
							</FloatingLabel>
						</Col>
						<Col className="mt-2">
							<Button type="submit" size="lg">
								Update Category
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</CustomModal>
	);
};
