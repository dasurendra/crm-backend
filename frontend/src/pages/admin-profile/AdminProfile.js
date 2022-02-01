import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import { getUserProfile } from "../admin-user/userAction";
import { EditAdminProfile } from "../../components/edit-admin-profile/EditAdminProfile";
import { UpdateAdminPassword } from "../../components/edit-admin-profile/UpdatePassword";

const AdminProfile = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		!user?._id && dispatch(getUserProfile());
	}, [dispatch, user]);

	return (
		<AdminLayout>
			<div className="admin-profile-page p-2">
				<h1 className="text-center">welcome {user?.fname}</h1>
				<hr />
				<div className="edit-profile-form">
					<h2>Update Profile</h2>
					<EditAdminProfile />
				</div>

				<hr />
				<div className="update-password-form">
					<h2>Update Password</h2>
					<UpdateAdminPassword />
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminProfile;
