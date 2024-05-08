import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function
import { useProductContext } from "../../context/productContext";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const history = useHistory();
  const { addProduct } = useProductContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object().shape({
    moviename: Yup.string().required("Movie name is required"),
    description: Yup.string().required("Movie description is required"),
    cast: Yup.string()
      .required("Cast member(s) are required")
      .min(1, "At least one Cast member must be added"),
    crew: Yup.string()
      .required("Crew member(s) are required")
      .min(1, "At least one Crew member must be added"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Generate a unique ID for the product
    const id = uuidv4();

    // Add the product with the unique ID
    addProduct({
      id,
      image: values.image,
      moviename: values.moviename,
      description: values.description,
      cast: values.cast.split(";").map((item) => item.trim()), // Convert to array here
      crew: values.crew.split(";").map((item) => item.trim()), // Convert to array here
      rating: [],
    });

    // Reset the form and show success message
    resetForm();
    setSuccessMessage("Product added successfully");

    // Hide success message after a few seconds
    setTimeout(() => {
      setSuccessMessage("");
      history.push("/admin/products");
    }, 1000);

    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className=" flex flex-row">
        <Sidebar />
        <div className="w-full h-full flex justify-center bg-slate-300">
          <div className="w-2/4 h-3/4 mb-10 flex flex-col mt-10 items-center p-10 bg-white ">
            <p className=" w-full flex justify-center text-xl font-semibold">
              Add Movie
            </p>
            <Formik
              initialValues={{
                image: null,
                moviename: "",
                description: "",
                cast: "",
                crew: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="w-3/4 h-full mt-5 ">
                  <div className="flex flex-col items-center">
                    <div className="w-2/4 h-40 bg-white border-2 border-solid border-gray-900 ">
                      {values.image && (
                        <img
                          src={URL.createObjectURL(values.image)}
                          alt="Selected Image"
                          className="w-full h-40"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      className="h-10 w-[100px] mt-5 overflow-hidden"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      className="text-sm text-red-700"
                      name="image"
                      component="div"
                    />
                  </div>
                  <br />
                  <div>
                    <label>Movie Name</label>
                    <br />
                    <Field
                      className="w-full bg-white border-2 border-solid border-gray-900"
                      type="text"
                      name="moviename"
                    />
                    <ErrorMessage
                      className="text-sm text-red-700"
                      name="moviename"
                      component="div"
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <br />
                    <Field
                      as="textarea"
                      className="w-full bg-white border-2 border-solid border-gray-900"
                      type="text"
                      name="description"
                    />
                    <ErrorMessage
                      className="text-sm text-red-700"
                      name="description"
                      component="div"
                    />
                  </div>
                  <div>
                    <label>Cast</label>
                    <br />
                    <Field
                      className="w-full bg-white border-2 border-solid border-gray-900"
                      type="text"
                      name="cast"
                    />
                    <ErrorMessage
                      className="text-sm text-red-700"
                      name="cast"
                      component="div"
                    />
                  </div>
                  <div>
                    <label>Crew</label>
                    <br />
                    <Field
                      className="w-full bg-white border-2 border-solid border-gray-900"
                      type="text"
                      name="crew"
                    />
                    <ErrorMessage
                      className="text-sm text-red-700"
                      name="crew"
                      component="div"
                    />
                  </div>
                  <button
                    className="w-full h-8 mt-5 bg-blue-500"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div className="text-green-500 mt-2">{successMessage}</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
