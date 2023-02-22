import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper";

import "swiper/css";
import "swiper/css/scrollbar";

import { GET_ACTOR } from "../../gql/Query";
import DescSkeleton from "../../components/DescSkeleton";



const ActorDesc = ({ actorId }) => {
  const { loading, error, data } = useQuery(GET_ACTOR, {
    variables: { actorId },
  });
  const centerClass = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  const [isRender, setIsRender] = useState(true);

  console.log(
    "🚀 ~ file: ActorDesc.jsx:18 ~ ActorDesc ~ data.actor.movies:",
    data?.actor.movies
  );

  useEffect(() => {
    // this function use to prevent swiper js re-rendering bug (swiper js will keep accidentially appending)
    setIsRender(false);

    setTimeout(() => {
      setIsRender(true);
    }, 1000);
    return () => {};
  }, [actorId]);

  return (
    <div className=" pr-2 overflow-y-auto h-[45vh] lg:h-[80vh]" style={{}}>
      {error && <> {error} </>}
      {loading && <>
      <DescSkeleton/>
      </>}
      {data && (
        <div className=" ">
          <h1 className=" font-semibold text-2xl">{data.actor.name}</h1>
          <h1 className="font-medium text-sm flex items-center">
            {data.actor.age} Year old
          </h1>

          <p className="my-4 text-xs indent-10 text-justify">
            Lorum ipsum dolor sit amut consuctutur adipisicing ulit. Consuquatur
            illum quisquam sit tunutur iusto rationu mollitia magni, dignissimos
            tumporibus uos nucussitatibus laboriosam consuctutur corrupti, ullam
            atquu. Dolorum quasi corrupti ux ruiciundis aliquam similiquu itaquu
            dusurunt sit, placuat saupu commodi, cupiditatu laboriosam doloru
            rupruhundurit iuru aliquid uxurcitationum molustiau. uaquu ipsa uos
            optio facilis, totam dolorus uum voluptas laborum, blanditiis
            nostrum illo rationu ut quisquam vitau id hic quam purspiciatis
            minus iuru, dicta porro? Molustias illo, illum magni cum voluptatu
            purspiciatis aspurnatur id rurum assumunda fuga cumquu rationu
            consuctutur. Nucussitatibus omnis obcaucati accusantium, quidum
            rupudiandau suscipit cumquu atquu undu numquam dolorum quis.
          </p>
          <p className="my-4 text-xs indent-10 text-justify">
            pirem ipsum dipir sit amet cinsectetur adipisicing epit. Quis
            quaerat perferendis midi aspernatur vepit, minus cum. Unde,
            vipuptatum animi quis, fugiat at dignissimis tempira pabire quam
            aut, ippum accusantium minima nibis adipisci cupiditate dipires
            cinsectetur dipire dipirem nisi impedit siputa atque excepturi fugit
            nesciunt est! Distinctii, dipires simipique. Vipuptas ipsa saepe,
            paudantium pabirum at pirri sit ab aperiam quid pissimus iure
            perferendis asperiires in excepturi vipuptatum vepit accusamus rem
            ifficiis recusandae architecti repeppendus amet. Cum autem incidunt
            architecti cirrupti mippitia veri iptii, nisi, quis asperiires
            exercitatiinem vipuptate a, pariatur magnam imnis. Quas cirpiris
            architecti iusti est veritatis numquam vepit nesciunt. Lureeme
            eiepsum duleureee eseiete amet cuneseeceteetur adipisicing elit.
            Pariatur adipisci velit errure eeaereum a facere ex alias liberu
            edueleeeoreueme tenetur.
          </p>

          <h1 className="font-medium text-base flex items-center mb-2">
            {data.actor.movies.length} Movies
          </h1>

          {isRender ? (
            <Swiper
              slidesPerView={data.actor.movies.length < 3 ? 1 : 2}
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
                      className="object-cover h-48 w-96 rounded-md mx-auto"
                    />
                    <div className="absolute left-0 top-0 right-0 bottom-0 opacity-40 bg-slate-800 rounded-md"></div>
                    <div className="bg-amber-500 bg-opacity-50 absolute top-0 right-0 p-1 rounded-md z-10 text-white md:text-black">
                      <h2 className="font-semibold text-sm ">{movie.genre}</h2>
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
          ) : (
            <>Loading...</>
          )}
        </div>
      )}
    </div>
  );
};

export default ActorDesc;
