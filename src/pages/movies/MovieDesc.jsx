import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MOVIE } from "../../gql/Query";

const MovieDesc = ({ movieId }) => {
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });
  console.log("🚀 ~ file: MovieDesc.jsx:9 ~ MovieDesc ~ data", data);

  return (
    <div className="p-5">
      {data ? (
        <>
          <h1 className=" font-semibold text-2xl">{data.movie.name}</h1>
          <h1 className="font-medium text-sm flex items-center">
            {data.movie.genre} -
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-amber-600 mx-1"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            {data.movie.actor.name}
          </h1>
          <hr className=" text-black" />

          <p className="mt-1 text-xs indent-10"> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            quaerat perferendis modi aspernatur velit, minus cum. Unde,
            voluptatum animi quos, fugiat at dignissimos tempora labore quam
            aut, illum accusantium minima nobis adipisci cupiditate dolores
            consectetur dolore dolorem nisi impedit soluta atque excepturi fugit
            nesciunt est! Distinctio, dolores similique. Voluptas ipsa saepe,
            laudantium laborum at porro sit ab aperiam quod possimus iure
            perferendis asperiores in excepturi voluptatum velit accusamus rem
            officiis recusandae architecto repellendus amet. Cum autem incidunt
            architecto corrupti mollitia vero optio, nisi, quis asperiores
            exercitationem voluptate a, pariatur magnam omnis. Quas corporis
            architecto iusto est veritatis numquam velit nesciunt.
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDesc;
