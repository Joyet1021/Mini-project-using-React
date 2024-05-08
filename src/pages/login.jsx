import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import cover_image from "../assets/movie1.jpeg";
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector hook

const Login = ({ setUsers, setAdmin, setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [exists, setExists] = useState("");

  // Dispatch action to retrieve user data when component mounts
  useEffect(() => {
    dispatch({ type: "retrieve" });
  }, [dispatch]);

  const usersData = useSelector((state) => state.usersData);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the input fields are empty
    const emptyFields = Object.values(inputs).some((value) => value === "");
    if (emptyFields) {
      setError("All fields are required");
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    }

    const emailExists = usersData.find((user) => user.email === inputs.email);
    setExists(emailExists ? emailExists : "");
    if (!emailExists) {
      setError("User doesn't Exist");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    const passwordExists =
      emailExists && emailExists.password === inputs.password;
    if (!passwordExists) {
      setError("Incorrect password");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    if (exists.role === "user") {
      // Store userid and email in setUsers state
      setUsers(exists);
      setIsAuthenticated(true);
      return <Redirect to="/home" />;
    } else {
      // Store userid and email in setUsers state
      setAdmin(exists);
      setIsAuthenticated(true);
      return <Redirect to="/admin/products" />;
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div
        className={`w-[60%] h-[30rem] lg:w-[70%] md:w-[50%] sm:w-[55%] flex overflow-hidden rounded-lg shadow-2xl`}
      >
        <div className="hidden lg:flex w-1/2 h-full ">
          <img
            src={cover_image}
            className="w-full h-full object-cover lg:object-fill"
            alt="Cover"
          />
        </div>
        <div className="w-1/2 h-full flex-grow flex flex-col  bg-gray-200 items-center ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 items-center justify-center w-[80%] h-full flex-col"
          >
            <div className="font-bold text-2xl">Login</div>
            <br />
            <div className="w-4/5">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <br />
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="w-full h-8 bg-green-600 flex justify-center text-white hover:bg-green-800 font-bold"
                type="submit"
              >
                Login
              </button>
              <p>
                Don't have an account ?{" "}
                <Link to="/signup" className="text-blue-700 underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
