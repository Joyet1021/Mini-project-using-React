import React, { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const [previousImageUrl, setPreviousImageUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const reader = new FileReader();
    reader.readAsDataURL(product.image);
    reader.onloadend = () => {
      const base64Image = reader.result;
      const updatedProduct = { ...product, image: base64Image };
      setProducts([...products, updatedProduct]);
    };
    reader.onerror = () => {
      console.error("Error loading image.");
    };
  };

  const editProduct = (editedProduct, previousImageUrl) => {
    const updatedProduct = { ...editedProduct };

    // Check if a new image is selected
    if (editedProduct.image instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(editedProduct.image);
      reader.onloadend = () => {
        updatedProduct.image = reader.result;
        updateProductData(updatedProduct);
      };
      reader.onerror = () => {
        console.error("Error loading image.");
      };
    } else {
      // No new image selected, update product data without changing the image
      // Restore previous image URL
      updateProductData(updatedProduct);
    }
  };

  const updateProductData = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        setProducts,
        editProduct,
        previousImageUrl,
        setPreviousImageUrl,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContextProvider };
