import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../gql/Query";
import { useEffect, useState } from "react";
import MovieDesc from "./MovieDesc";

const Movies = () => {
  const Access_Key = "Ikji6ii2qlUEdVpTnQB22JcEJrLG83AkgFagnfQ3XXI";
  const { loading, error, data } = useQuery(GET_MOVIES);

  const [movies, setMovies] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const fetchRequest = async (keyword) => {
    const datas = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&per_page=1&client_id=${Access_Key}`
    );
    const dataJ = await datas.json();
    let result = dataJ.results;
    return result[0]?.urls.regular ? result[0].urls.regular : "";
  };

  useEffect(() => {
    if (data) {
      (async () => {
        setMovies(
          await Promise.all(
            data?.movies.map(async (e) => {
              return {
                ...e,
                url: await fetchRequest(e.name),
              };
            })
          )
        );
      })();
    }
  }, [data]);
  const centerClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  return (
    <div className="container mx-auto flex  ">
      <div className="grid grid-cols-1 xl:grid-cols-2 overflow-y-auto mx-auto">
        {movies?.map((movie) => (
          <div className="relative" onClick={() => setIsSelected(movie.id)}>
            <div className="bg-amber-500 bg-opacity-50 absolute top-6 right-6 p-1 rounded-md z-10 text-white md:text-black">
              <h2 className="font-semibold text-sm ">{movie.genre}</h2>
            </div>
            <div className="flex   space-x-6 p-6" key={movie.id}>
              <div className="relative bg-slate-100 mx-auto sm:mx-0 rounded-md ">
                <img
                  src={movie.url}
                  alt=""
                  className="object-cover h-60 w-44 rounded-md"
                />
                <div className="absolute left-0 top-0 right-0 bottom-0 opacity-40 bg-slate-800 rounded-md"></div>
                <h1
                  className={`absolute text-white font-semibold text-xl text-center ${centerClass}`}
                >
                  {movie.name}
                </h1>
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-amber-600 "
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p> {movie.actor.name} </p>
                </div>
              </div>

              <div className="relative  space-y-2 hidden sm:block ">
                <h2 className="font-semibold text-2xl mx-5 my-8">{movie.name}</h2>
                <div className="absolute bottom-2">
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-amber-600 "
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-sm"> {movie.actor.name} </p>
                  </div>
                </div>
              </div>
            </div>
            {isSelected === movie.id ? (
              <div className="absolute left-0 top-0 right-0 bottom-0 opacity-30 bg-slate-800 rounded-md"></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      {/* side section popup information */}

      <div className="h-full bg-slate-200 rounded-md sticky top-6 overflow-y-auto mx-4 max-w-md">
        {isSelected ? (
          <MovieDesc movieId={isSelected} />
        ) : (
          <div className="p-6">
            <h1>Pilihlah salah satu movie untuk melihat informasi detail</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
