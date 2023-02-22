import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../gql/Query";
import { useEffect, useState } from "react";
import MovieDesc from "./MovieDesc";

const Movies = () => {
  const Access_Key = "Ikji6ii2qlUEdVpTnQB22JcEJrLG83AkgFagnfQ3XXI";
  const { loading, error, data } = useQuery(GET_MOVIES);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isSelected, setIsSelected] = useState();

  const fetchRequest = async (keyword) => {
    const datas = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&per_page=2&client_id=${Access_Key}`
    );
    const dataJ = await datas.json();
    let result = dataJ.results;
    console.log("🚀 ~ file: index.jsx:20 ~ fetchRequest ~ result:", result);
    return result[1]?.urls.regular ? result[1].urls.regular : "";
  };

  useEffect(() => {
    if (data) {
      (async () => {
        let appendUrl = await Promise.all(
          data?.movies.map(async (e) => {
            return {
              ...e,
              url: await fetchRequest(e.name),
            };
          })
        );
        setMovies([...appendUrl]);
        setFiltered([...appendUrl]);
      })();
    }
  }, [data]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const filtering = movies.filter((obj) =>
        JSON.stringify(Object.values(obj))
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFiltered(filtering);
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search, movies]);

  const centerClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  return (
    <>
      {data && (
        <div className="container mx-auto lg:flex">
          <div className="grid grid-cols-1 xl:grid-cols-2 overflow-y-auto mx-auto my-2 px-10">
            {/* search bar */}
            <div className="h-fit col-span-2 p-3 lg:max-h-screen bg-slate-200 rounded-md  mb-3 max-w-full">
              <div className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  placeholder="Cari sesuatu yang anda inginkan!"
                  className="w-full h-10 p-2 rounded-md bg-slate-100 outline-none  block pl-10"
                  type="text"
                  name="search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>

            {filtered?.map((movie) => (
              <div
                className=" col-span-2 xl:col-span-1 relative cursor-pointer hover:bg-slate-200 rounded-md "
                onClick={() => setIsSelected(movie.id)}
                key={movie.id}
              >
                <div className="bg-amber-500 bg-opacity-50 hidden sm:block absolute top-6 right-6 p-1 rounded-md z-10 text-white md:text-black">
                  <h2 className="font-semibold text-sm ">{movie.genre}</h2>
                </div>

                <div className="flex space-x-6 p-6">
                  <div className="relative mx-auto sm:mx-0 rounded-md ">
                    <img
                      src={movie.url}
                      alt="No_Image"
                      className="object-cover h-60 w-44 rounded-md"
                    />
                    <div className="absolute left-0 top-0 right-0 bottom-0 opacity-40 bg-slate-800 rounded-md"></div>
                    <div className="bg-amber-500 bg-opacity-50 absolute sm:hidden top-0 right-0 p-1 rounded-md z-10 text-white md:text-black">
                      <h2 className="font-semibold text-sm ">{movie.genre}</h2>
                    </div>
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
                        className="w-5 h-5 text-amber-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p> {movie.actor.name} </p>
                    </div>
                  </div>

                  <div className="relative space-y-2 hidden px-5 py-14 sm:block ">
                    <h2 className="font-semibold text-2xl  ">{movie.name}</h2>
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-amber-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p className="text-xs font-semibold">
                        {movie.actor.name}
                      </p>
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
          <div className="h-fit p-3 lg:max-h-screen bg-slate-200 rounded-md sticky bottom-0 left-0 lg:top-6 mx-4 max-w-full lg:max-w-md z-20">
            {isSelected ? (
              <MovieDesc movieId={isSelected} />
            ) : (
              <div className="p-6">
                <h1>
                  Pilihlah salah satu movie untuk melihat informasi detail
                </h1>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && <div>Loading...</div>}
      {error && <div>Something Wrong...</div>}
    </>
  );
};

export default Movies;
