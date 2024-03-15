import { useEffect, useState } from "react";
// Import Swiper React components
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperSlider from "@/components/commons/SwiperSlider/SwiperSlider";
import SWImages from "@/components/reuseComponents/SWImages";
import { H4 } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Data from "./Data";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { baseUrl, imageUrl } from "@/api/apiConfig";

const SummerOffer = ({offers}) => {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  return (
    <>
      <section className="sw__summer__offer">
        <Container>
          <Row>
            <Col lg={12}>
              <SwiperSlider>
                <Swiper
                  navigation={{
                    nextEl: ".arrow-left",
                    prevEl: ".arrow-right",
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 2.2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 20,
                    },
                    1600: {
                      slidesPerView: 6,
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Navigation, Autoplay]}
                  className="sw__swiper__slider"
                >
                  {offers?.map((data, i) => (
                    <SwiperSlide key={i}>
                      {loading ? (
                        <>
                          <div className="sw__summer__offer__item">
                            <Skeleton height={180} />
                          </div>
                        </>
                      ) : (
                        <div className="sw__summer__offer__item">
                          <Link href={`offer/${data.slug}`}>
                            <SWImages
                              image={`${imageUrl}/uploads/${data.logo}`}
                              width="240"
                              height="230"
                              alt="summer offer"
                            />
                            <H4 h4={data.name} />
                          </Link>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button className="arrow-left arrow">
                  <i className="flaticon-left-arrow"></i>
                </button>
                <button className="arrow-right arrow">
                  <i className="flaticon-right-arrow"></i>
                </button>
              </SwiperSlider>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SummerOffer;
