import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTORS } from "../../gql/Query";
import { useEffect, useState } from "react";
import ActorDesc from "./ActorDesc";

const Actors = () => {
  const Access_Key = "Ikji6ii2qlUEdVpTnQB22JcEJrLG83AkgFagnfQ3XXI";
  const { loading, error, data } = useQuery(GET_ACTORS);

  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isSelected, setIsSelected] = useState();

  const fetchRequest = async (keyword) => {
    const datas = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword},person&per_page=2&client_id=${Access_Key}`
    );
    const dataJ = await datas.json();
    let result = dataJ.results;
    console.log("🚀 ~ file: index.jsx:20 ~ fetchRequest ~ result:", result);
    return result[0]?.urls.regular ? result[0].urls.regular : "";
  };

  useEffect(() => {
    
    if (data) {
      (async () => {
        let appendUrl = await Promise.all(
          data?.actors.map(async (e) => {
            return {
              ...e,
              url: await fetchRequest(e.name),
            };
          })
        );
        setActors([...appendUrl]);
        setFiltered([...appendUrl]);
      })();
    } 
  }, [data]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const filtering = actors.filter((obj) =>
        JSON.stringify(Object.values(obj))
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFiltered(filtering);
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search, actors]);

  return (
    <>
      {data && (
        <div className="container mx-auto lg:flex">
          <div className="grid grid-cols-2 w-full overflow-y-auto  my-2 px-10">
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

            {filtered?.map((actor) => (
              <div
                className="relative col-span-2 cursor-pointer hover:bg-slate-200 rounded-md "
                onClick={() => setIsSelected(actor.id)}
                key={actor.id}
              >
                <div className="flex items-center space-x-6 p-6">
                  <div className="relative bg-slate-500 rounded-full ">
                    <img
                      src={actor.url}
                      alt={"No_Image"}
                      className="object-cover h-24 w-24 rounded-full"
                    />
                  </div>
                  <div className="relative mx-auto sm:mx-0 rounded-md ">
                    <h2 className="font-semibold text-xl">{actor.name}</h2>
                  </div>
                </div>

                {isSelected === actor.id ? (
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
              <ActorDesc actorId={isSelected} />
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

export default Actors;
