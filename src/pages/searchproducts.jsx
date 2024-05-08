import React from "react";
import Navbar from "../components/user/navbar";
import Button from "../components/user/button";
import { useParams, useHistory } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import StarIcon from "@mui/icons-material/Star";

function Search() {
  const { products } = useProductContext();
  const { id } = useParams();
  const history = useHistory();

  const movie = products.filter((movie) =>
    movie.moviename.toLowerCase().includes(id.toLowerCase())
  );

  const handleViewClick = (movieId) => {
    history.push(`/viewmovie/${movieId}`);
  };

  if (!movie) {
    return <div className="notfound">Movie Not Found</div>;
  }

  let total = 0;
  movie[0].rating.forEach((rate) => {
    total += rate;
  });
  const avg = movie[0].rating.length > 0 ? total / movie[0].rating.length : 0;

  return (
    <div>
      <Navbar />
      <div className="grid sm:grid-cols-4 grid-cols-3 gap-4 p-7 bg-white">
        <div
          key={movie[0].id}
          className="xl:h-80 xl:w-64 lg:h-72 lg:w-52 md:h-64 md:w-48 sm:h-52 sm:w-36 w-28 h-44 rounded-lg border border-b-slate-600 flex items-center justify-center flex-col gap-2"
        >
          <div className="w-[50%] h-[40%] sm:h-[50%] overflow-hidden">
            <img src={movie[0].image} alt="" />
          </div>
          <div className="w-[80%] h-[30%] sm:text-[10px] md:text-sm lg:text-lg text-[10px] flex items-center flex-col">
            <p className="font-semibold">{movie[0].moviename}</p>
            <div className="h-10 w-10 bg-green-600 flex flex-row items-center justify-center text-white text-xs font-semibold rounded-sm">
              {avg.toFixed(1)}{" "}
              <StarIcon style={{ color: "white", fontSize: "1rem" }} />
            </div>
            <hr className="w-[90%] h-8 mt-1" />
            <Button
              className="md:h-11 md:w-24 xl:h-11 xl:w-32 h-10 w-20 mt-2 bg-blue-600 border rounded-md"
              onClick={() => handleViewClick(movie[0].id)}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
