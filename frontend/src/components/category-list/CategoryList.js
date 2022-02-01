import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { categoryDelete } from "../../pages/category/categoryAction";
import { onCategorySelect } from "../../pages/category/categorySlice";
import { EditCategoryForm } from "../edit-category-form/EditCategoryForm";

export const CategoryList = () => {
	const dispatch = useDispatch();
	const { catList } = useSelector(state => state.category);

	const parentCatOnly = catList.filter(row => !row.parentCat);

	const childCat = catList.filter(row => row.parentCat);

	const handleOnDelete = _id => {
		const hasChildCat = childCat.some(item => item.parentCat === _id);

		if (hasChildCat) {
			return alert(
				"This category has some child categories. Remove them or reassign them to another category before deleting."
			);
		}

		if (window.confirm("Are you sure, you want to delete his category?")) {
			dispatch(categoryDelete(_id));
		}
	};

	return (
		<div>
			<EditCategoryForm />
			<ListGroup>
				{parentCatOnly &&
					parentCatOnly.map(row => (
						<div key={row._id}>
							<ListGroup.Item className="d-flex justify-content-between">
								<span>{row.name}</span>
								<span>
									<Button
										variant="primary"
										onClick={() => dispatch(onCategorySelect(row))}
									>
										Edit
									</Button>
									<Button
										variant="danger"
										style={{ marginLeft: "1rem" }}
										onClick={() => handleOnDelete(row._id)}
									>
										Delete
									</Button>
								</span>
							</ListGroup.Item>

							{childCat &&
								childCat.map(
									item =>
										item.parentCat === row._id && (
											<ListGroup.Item
												key={item._id}
												className="d-flex justify-content-between"
											>
												<span> = &gt; {item.name}</span>
												<span>
													<Button
														variant="primary"
														onClick={() => dispatch(onCategorySelect(item))}
													>
														Edit
													</Button>
													<Button
														variant="danger"
														style={{ marginLeft: "1rem" }}
														onClick={() => handleOnDelete(item._id)}
													>
														Delete
													</Button>
												</span>
											</ListGroup.Item>
										)
								)}
						</div>
					))}
			</ListGroup>
		</div>
	);
};
