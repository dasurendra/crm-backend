import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { PageNotFound } from "./components/page-not-found/PageNotFound";
import Registration from "./pages/admin-registration/Registration";
import Category from "./pages/category/Category";
import Customer from "./pages/customer/Customer";
import Dashboard from "./pages/dashboard/Dashboard";
import EmailVerification from "./pages/email-verification/EmailVerification";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import Payment from "./pages/payment/Payment";
import Product from "./pages/product/Product";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import ResetPassword from "./pages/reset-password/ResetPassword";
import AddProduct from "./pages/product/AddProduct";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<PrivateRoute path="/dashboard" children={<Dashboard />} />

					<PrivateRoute path="/registration">
						<Registration />
					</PrivateRoute>

					<PrivateRoute path="/categories">
						<Category />
					</PrivateRoute>

					<PrivateRoute exact path="/products">
						<Product />
					</PrivateRoute>

					<PrivateRoute exact path="/product/new">
						<AddProduct />
					</PrivateRoute>

					<PrivateRoute path="/orders">
						<Order />
					</PrivateRoute>

					<PrivateRoute path="/customers">
						<Customer />
					</PrivateRoute>

					<PrivateRoute path="/payments">
						<Payment />
					</PrivateRoute>

					<PrivateRoute path="/admin-profile">
						<AdminProfile />
					</PrivateRoute>

					<Route path="/email-verification">
						<EmailVerification />
					</Route>

					<Route exact path="/reset-password">
						<ResetPassword />
					</Route>

					<Route exact path="/">
						<Login />
					</Route>

					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
