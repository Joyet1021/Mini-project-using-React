// Products.jsx
import React from "react";
import Navbar from "../../components/admin/navbar";
import Sidebar from "../../components/admin/sidebar";
import { useHistory } from "react-router-dom";
import { useProductContext } from "../../context/productContext";

const Products = () => {
  const { products, setProducts } = useProductContext();
  const history = useHistory();

  const handleEditClick = (productId) => {
    history.push(`/admin/editproduct/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <table className="w-full h-full flex justify-center flex-col ">
          <thead>
            <tr className="w-full h-14  flex flex-row items-center justify-center text-lg font-semibold gap-[15%]">
              <th>Movie Image</th>
              <th>Movie Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="flex flex-row pb-5 pt-5 border-2 m-2 border-black"
              >
                <td className="h-24 w-20 bg-slate-500 flex justify-center items-center ml-[13%]">
                  <img className="w-20 h-full" src={product.image} alt="" />
                </td>
                <td className="h-20 w-44 font-semibold flex items-center ml-[17%]">
                  {product.moviename}
                </td>
                <td className=" w-32 flex justify-center items-center ml-[3%]">
                  <button
                    className="h-7 w-16 border border-black rounded-md"
                    onClick={() => handleEditClick(product.id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="flex justify-center items-center ml-[9%]">
                  <button
                    className="h-7 w-16 border border-black rounded-md"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
