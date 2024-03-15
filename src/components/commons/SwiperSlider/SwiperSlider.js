import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const SwiperSlider = ({ children }) => {
  return (
    <>
      <div className="sw__swiper__slider">{children}</div>
    </>
  );
};

export default SwiperSlider;

{
  /* <Swiper
  navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  }}
  modules={[Navigation, Autoplay]}
  className="sw__swiper__slider"
>
  <SwiperSlide></SwiperSlide>
</Swiper>; 
 <button className="arrow-left arrow">
<i className="flaticon-left-arrow"></i>
</button>
<button className="arrow-right arrow">
<i className="flaticon-right-arrow"></i>
</button>
*/
}
