import React, { createContext, useState, useContext, useEffect } from "react";

const RatingContext = createContext();

export const useRatingContext = () => useContext(RatingContext);

const RatingContextProvider = ({ children }) => {
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem("productRating");
    return storedRating !== null ? JSON.parse(storedRating) : [];
  });

  useEffect(() => {
    localStorage.setItem("productRating", JSON.stringify(rating));
  }, [rating]);

  return (
    <RatingContext.Provider value={{ rating, setRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContextProvider;
