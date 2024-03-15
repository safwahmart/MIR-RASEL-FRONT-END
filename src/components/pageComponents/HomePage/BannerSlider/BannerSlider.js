import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SWImages from "@/components/reuseComponents/SWImages";
import axios from "axios";
import { baseUrl, imageUrl } from "@/api/apiConfig";

const BannerSlider = () => {
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const getBannes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getSliders`);
      setBanners(response.data.data);
      console.log("Banner", response)
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBannes();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="sw__home__banner__slider">
        <Container className="sw__container">
          <Row>
            <Col lg={12}>
              <Swiper
                effect={"fade"}
                pagination={{
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay, EffectFade]}
                className="sw__banner__slider"
              >
                {banners?.map((data, i) => (
                  <SwiperSlide key={i}>
                    {loading ? (
                      <>
                        <div className="sw__banner__slider__item">
                          <Skeleton height={500} />
                        </div>
                      </>
                    ) : (
                      <div className="sw__banner__slider__item">
                        <SWImages
                          image={`${imageUrl}/uploads/${data.logo}`}
                          alt="banner-image"
                          width="1500"
                          height="300"
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BannerSlider;
