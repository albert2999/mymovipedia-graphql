import { useQuery } from "@apollo/client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper";

import 'swiper/css'; 
import "swiper/css/scrollbar";

import { GET_MOVIE } from "../../gql/Query";

const MovieDesc = ({ movieId }) => {
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });
  console.log("🚀 ~ file: MovieDesc.jsx:9 ~ MovieDesc ~ data", data);

  return (
    <div className="p-6">
      {error && <> {error} </>}
      {loading && <> Loading... </>}
      {data && (
        <>
          <h1 className=" font-semibold text-2xl">{data.movie.name}</h1>
          <h1 className="font-medium text-sm flex items-center">
            {data.movie.genre} -
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-amber-500 mx-1"
            >
              <path
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clip-rule="evenodd"
              />
            </svg>
            {data.movie.actor.name}
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

          <Swiper
            slidesPerView={2}
            grabCursor={true}
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
            <SwiperSlide>
              <div className="relative bg-slate-500 rounded-md ">
                <img
                  src={`https://source.unsplash.com/random/?movie,${data.movie.name}1`}
                  alt={"No_Image"}
                  className="object-cover h-48 w-72 rounded-md"
                /> 
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-slate-500 rounded-md ">
                <img
                  src={`https://source.unsplash.com/random/?movie,${data.movie.name}2`}
                  alt={"No_Image"}
                  className="object-cover h-48 w-72 rounded-md"
                /> 
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-slate-500 rounded-md ">
                <img
                  src={`https://source.unsplash.com/random/?movie,${data.movie.name}3`}
                  alt={"No_Image"}
                  className="object-cover h-48 w-72 rounded-md"
                /> 
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-slate-500 rounded-md ">
                <img
                  src={`https://source.unsplash.com/random/?movie,${data.movie.name}4`}
                  alt={"No_Image"}
                  className="object-cover h-48 w-72 rounded-md"
                /> 
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      )}
    </div>
  );
};

export default MovieDesc;
