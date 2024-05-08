import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductContext } from "../../context/productContext";

const EditProduct = () => {
  const history = useHistory();
  const { id } = useParams();
  const { products, editProduct } = useProductContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const product = products.find((product) => product.id === id);
  const [previousImageUrl, setPreviousImageUrl] = useState(product.image || "");

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

  const handleSubmit = (values, { setSubmitting }) => {
    // If no new image is selected, set the image to the previous image URL
    const image =
      values.image instanceof File ? values.image : previousImageUrl;

    editProduct({
      id,
      image,
      moviename: values.moviename,
      description: values.description,
      cast: values.cast.split(",").map((item) => item.trim()),
      crew: values.crew.split(",").map((item) => item.trim()),
      rating: product.rating,
    });

    setSuccessMessage("Product edited successfully");

    setTimeout(() => {
      setSuccessMessage("");
      history.push("/admin/products"); // Redirect the user to the desired page
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
              Edit Movie
            </p>
            <Formik
              initialValues={{
                image: "",
                moviename: product.moviename,
                description: product.description,
                cast: product.cast.join(", "),
                crew: product.crew.join(", "),
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
                          onLoad={() => {
                            setPreviousImageUrl(
                              URL.createObjectURL(values.image)
                            );
                          }}
                        />
                      )}
                      {!values.image && (
                        <img
                          src={previousImageUrl}
                          alt="Previous Image"
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
                  <div>
                    <label>Movie Name</label>
                    <br />
                    <Field
                      className="w-full bg-white border-2 border-solid border-gray-900"
                      type="text"
                      name="moviename"
                      value={values.moviename}
                      onChange={(e) =>
                        setFieldValue("moviename", e.target.value)
                      }
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
                      value={values.description}
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
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
                      value={values.cast}
                      onChange={(e) => setFieldValue("cast", e.target.value)}
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
                      value={values.crew}
                      onChange={(e) => setFieldValue("crew", e.target.value)}
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

export default EditProduct;
