import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import cover_image from "../assets/movie2.png";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function

const Signup = ({ users, setUsers }) => {
  const id = uuidv4(10); //generate a random unique id for each user
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [inputs, setInputs] = useState({
    userid: id,
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("usersData")) || []; // Parse the JSON data and provide an empty array if userData is null
    // Check if any of the input fields are empty
    const emptyFields = Object.values(inputs).some((value) => value === "");
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password regex validation (at least 8 characters, at least one uppercase letter, one lowercase letter, and one number)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // Check if the user already exists
    const userExists = userData.find(
      (user) => user.email === inputs.email || user.username === inputs.username
    );

    if (emptyFields) {
      setError("All fields are required");
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    } else if (!emailRegex.test(inputs.email)) {
      setError("Invalid email address");
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    } else if (!passwordRegex.test(inputs.password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    } else if (inputs.password !== inputs.confirmpassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    } else if (userExists) {
      setError("User already exists");
      setTimeout(() => {
        setError(null);
      }, 2000); // Clear error message after 2 seconds
      return;
    } else {
      // Redirect to login page
      setRedirectToLogin(true);
      dispatch({ type: "addUser", payload: inputs });
      setSuccess("Account created successfully! Please log in now.");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }

    // Add the signup to the users array
    setUsers((prevUsers) => [...prevUsers, inputs]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  if (redirectToLogin) {
    return <Redirect to="/" />;
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
        <div className="w-1/2 h-full flex-grow flex flex-col  bg-gray-200 items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 items-center justify-center w-[80%] h-full flex-col"
          >
            <div className="font-bold text-2xl ">Signup</div>
            <br />
            <div className="w-4/5">
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <label htmlFor="phone-number">Phone Number</label>
              <br />
              <input
                type="text"
                name="phonenumber"
                value={inputs.phonenumber}
                onChange={handleChange}
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                value={inputs.confirmpassword}
                onChange={handleChange}
                className="bg-white w-full rounded-lg h-8 px-3"
              />
              <br />
              <br />
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="w-full h-8 bg-green-600 flex justify-center text-white hover:bg-green-800 font-bold"
              >
                Signup
              </button>
              <p>
                Already have an account ?{" "}
                <Link to="/" className="text-blue-700 underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
