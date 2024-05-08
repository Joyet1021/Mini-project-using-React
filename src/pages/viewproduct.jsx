import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/user/navbar";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useRatingContext } from "../context/ratingContext";
import StarIcon from "@mui/icons-material/Star";

const ViewProduct = ({ users }) => {
  const { id } = useParams();
  const { products, setProducts } = useProductContext();
  const { rating, setRating } = useRatingContext();
  const product = products.find((product) => product.id === id);

  const [selectedRating, setSelectedRating] = useState(0);
  const [nouser, setNouser] = useState(null);

  const renderArrayWithLineBreaks = (arr) => {
    return arr.map((item, index) => (
      <React.Fragment key={index}>
        {item}
        {index < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };
  const avg = useMemo(() => {
    let total = 0;
    product.rating.forEach((rate) => {
      total += rate;
    });
    return product.rating.length > 0 ? total / product.rating.length : 0;
  }, [product.rating]);

  const handleStarClick = (index) => {
    setSelectedRating(index + 1);
  };

  const handleSubmit = () => {
    if (users.length == 0) {
      setNouser("Please login to leave a rating");
      setTimeout(() => {
        setNouser(null);
      }, 1000);
    } else {
      const userExist = rating.find(
        (userRating) => userRating.userid === users.userid
      );
      if (userExist) {
        const productExist = userExist.productsrating.find(
          (productrating) => productrating.productid === id
        );
        if (productExist) {
          setNouser("You have already rated this product");
          setTimeout(() => {
            setNouser(null);
          }, 1000);
        } else {
          const userIndex = rating.findIndex(
            (userRating) => userRating.userid === users.userid
          );
          const updatedUser = {
            ...userExist,
            productsrating: [
              ...userExist.productsrating,
              { productid: id, productrating: selectedRating },
            ],
          };
          const updatedRating = [...rating];
          updatedRating[userIndex] = updatedUser;
          setRating(updatedRating);

          const updatedProduct = {
            ...product,
            rating: [...product.rating, selectedRating],
          };
          const updatedProducts = products.map((p) =>
            p.id === id ? updatedProduct : p
          );
          setProducts(updatedProducts);
          setNouser("Added your rating");
          setTimeout(() => {
            setNouser(null);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col ">
      <Navbar />
      <div className="w-3/4 h-3/4 shadow-2xl shadow-black mt-20 mb-20 flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/4 h-[35rem] flex items-center justify-center">
          <img
            className="w-3/4 h-5/6"
            src={product.image}
            alt={product.moviename}
          ></img>
        </div>
        <div className="w-7/8 sm:w-2/4 h-[35rem] pt-14 ml-5 overflow-auto scrollbar-hide">
          <div className="text-4xl font-bold">{product.moviename}</div>
          <div className="text-xl font-semibold mt-8 mb-8">
            {avg.toFixed(1)}{" "}
            <StarIcon
              className="mb-1"
              style={{ color: "tomato", fontSize: "1.2rem" }}
            />{" "}
            <p className="text-sm"> Based on {product.rating.length} Reviews</p>{" "}
          </div>
          <div className="text-xl font-semibold pr-5">
            About:
            <p className="font-thin text-[1rem]">{product.description}</p>
          </div>
          <div className="mt-8 mb-8">
            <p className="font-semibold text-xl">Cast :</p>{" "}
            {product.cast.join(", ")}
          </div>
          <div className="mt-8 mb-8">
            <p className="font-semibold text-xl">Crew :</p>{" "}
            {renderArrayWithLineBreaks(product.crew)}{" "}
          </div>
        </div>
      </div>
      <div
        className={`w-5/6 h-[13rem] p-10 mb-10 flex flex-col justify-center items-center bg-slate-400 ${handleSubmit} `}
      >
        <p className="font-semibold text-2xl">Rate this Movie </p>
        <div className="mt-5 flex">
          {Array.from({ length: 5 }, (_, index) => (
            <StarRateIcon
              key={index}
              onClick={() => handleStarClick(index)}
              className={`cursor-pointer text-3xl ${
                selectedRating > index ? "text-yellow-500" : "text-gray-500"
              }`}
            />
          ))}
        </div>
        {nouser && <div className=" mt-2 text-red-700">{nouser}</div>}
        <button
          onClick={handleSubmit}
          className="w-28 h-8  rounded-lg border-2 border-black mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
