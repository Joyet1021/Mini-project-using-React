import React, { useState, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
const Login = React.lazy(() => import("./pages/login"));
const Signup = React.lazy(() => import("./pages/signup"));
const Home = React.lazy(() => import("./pages/home"));
const Otp = React.lazy(() => import("./pages/otp"));
const AdminDashboard = React.lazy(() => import("./pages/admin/admindashboard"));
const Sidebar = React.lazy(() => import("./components/admin/sidebar"));
const userNavbar = React.lazy(() => import("./components/user/navbar"));
const adminNavbar = React.lazy(() => import("./components/admin/navbar"));
const AddProduct = React.lazy(() => import("./pages/admin/addproduct"));
const EditProduct = React.lazy(() => import("./pages/admin/editproduct"));
const AdminProducts = React.lazy(() => import("./pages/admin/adminproducts"));
const ViewProduct = React.lazy(() => import("./pages/viewproduct"));
const SearchProduct = React.lazy(() => import("./pages/searchproducts"));
import ProtectedRoute from "./components/protectedroute/protectedroute";

function App() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className=" h-full flex items-center justify-center mt-[20%] font-semibold text-lg">
            <img
              className="w-20 h-20 animate-spin mr-6"
              src="https://www.svgrepo.com/show/199956/loading-loader.svg"
              alt="Loading icon"
            />{" "}
            Loading
          </div>
        }
      >
        <Switch>
          <Route exact path="/" render={(props) => ( <Login {...props} setUsers={setUsers} setAdmin={setAdmin} setIsAuthenticated={setIsAuthenticated} /> )} />
          <Route exact path="/signup" render={(props) => ( <Signup {...props} users={users} setUsers={setUsers} />)}/>
          <Route exact path="/usernavbar" render={(props) => <userNavbar {...props} setUsers={setUsers} />}/>
          <Route exact path="/adminnavbar" render={(props) => <adminNavbar {...props} setAdmin={setAdmin} />}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/otp" component={Otp} />
          <Route exact path="/searchproduct/:id" component={SearchProduct} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <ProtectedRoute exact path="/admin/addproduct" component={AddProduct} isAuthenticated={isAuthenticated}  role={admin.role} />
          <ProtectedRoute exact path="/admin/editproduct/:id" component={EditProduct} isAuthenticated={isAuthenticated} role={admin.role}/>
          <ProtectedRoute exact path="/admin/products" component={AdminProducts} isAuthenticated={isAuthenticated} role={admin.role}/>
          <ProtectedRoute exact path="/viewproduct/:id" component={ViewProduct} isAuthenticated={isAuthenticated} role={users.role} users={users} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
