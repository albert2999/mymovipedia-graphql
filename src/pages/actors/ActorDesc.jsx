import React from "react";
import { useQuery } from "@apollo/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";

import { GET_ACTOR } from "../../gql/Query";

const ActorDesc = ({ actorId }) => {
  const { loading, error, data } = useQuery(GET_ACTOR, {
    variables: { actorId },
  });
  const centerClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <div className="p-6">
      {error && <> {error} </>}
      {loading && <> Loading... </>}
      {data && (
        <>
          <h1 className=" font-semibold text-2xl">{data.actor.name}</h1>
          <h1 className="font-medium text-sm flex items-center">
            {data.actor.age} Year old
          </h1>

          <p className="my-4 text-xs indent-10 text-justify">
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

          <h1 className="font-medium text-base flex items-center mb-2">
            Movies
          </h1>

          <Swiper
            slidesPerView={2}
            grabCursor={true}
            cache={false}
            spaceBetween={20}
            centeredSlides={true}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="mySwiper h-fit"
          >
            {data.actor.movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative mx-auto sm:mx-0 rounded-md ">
                  <img
                    src={`https://source.unsplash.com/random/?movie,${movie.name}1`}
                    alt="No_Image"
                    className="object-cover h-60 w-48 rounded-md"
                  />
                  <div className="absolute left-0 top-0 right-0 bottom-0 opacity-40 bg-slate-800 rounded-md"></div>
                  <div className="bg-amber-500 bg-opacity-50 absolute top-0 right-0 p-1 rounded-md z-10 text-white md:text-black">
                    <h2 className="font-semibold text-sm ">
                      {movie.genre}
                    </h2>
                  </div>
                  <h1
                    className={`absolute text-white font-semibold text-xl text-center ${centerClass}`}
                  >
                    {movie.name}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
            
          </Swiper>
        </>
      )}
    </div>
  );
};

export default ActorDesc;
