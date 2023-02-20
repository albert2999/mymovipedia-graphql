import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTORS } from "../../gql/Query";
import { useEffect, useState } from "react";
import ActorDesc from "./ActorDesc";

const Actors = () => {
  const Access_Key = "Ikji6ii2qlUEdVpTnQB22JcEJrLG83AkgFagnfQ3XXI";
  const { loading, error, data } = useQuery(GET_ACTORS);

  const [actors, setActors] = useState([]);
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
        setActors(
          await Promise.all(
            data?.actors.map(async (e) => {
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
 

  return (
    <>
      {data && (
        <div className="container mx-auto lg:flex">
          <div className="grid grid-cols-1 overflow-y-auto mx-auto my-2 px-10">
            {actors?.map((actor) => (
              <div
                className="relative cursor-pointer hover:bg-slate-200 rounded-md "
                onClick={() => setIsSelected(actor.id)}
              >
                <div className="flex items-center space-x-6 p-6" key={actor.id}>
                  <div className="relative bg-slate-500 rounded-full ">
                    <img
                      src={actor.url}
                      alt={"No_Image"}
                      className="object-cover h-24 w-24 rounded-full"
                    />
                  </div>
                  <div className="relative mx-auto sm:mx-0 rounded-md ">
                    <h2 className="font-semibold text-xl">
                      {actor.name}
                    </h2>
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
          <div className="h-fit max-h-96 lg:max-h-screen bg-slate-200 rounded-md sticky bottom-0 left-0 lg:top-6 overflow-y-auto mx-4 pr-2 max-w-full lg:max-w-md z-20">
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
