import SwiperSlider from "@/components/commons/SwiperSlider/SwiperSlider";
import SWImages from "@/components/reuseComponents/SWImages";
import { H4, H6 } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Import Swiper React components
import HeaderTitle from "@/components/commons/HeaderTitle";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { baseUrl, imageUrl } from "@/api/apiConfig";

// Home Page BrandSwiper
export const BrandSwiper = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([])

  const getBrands = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getBrands`);
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBrands()
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <section className="sw__brand">
        <Container>
          <Row>
            <Col lg={12}>
              <HeaderTitle title="Brands" name="View All" url="/brand" />
            </Col>

            <Col lg={12}>
              <SwiperSlider>
                <Swiper
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
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Navigation, Autoplay]}
                  className="sw__swiper__slider"
                >
                  {brands?.map((data, i) => (
                    <SwiperSlide key={i}>
                      {loading ? (
                        <>
                          <Skeleton height={150} />
                        </>
                      ) : (
                        <div className="sw__brand__item">
                          <H6 h6={data.date} />
                          <div className="sw__brand__item__img">
                            <Link href={`/brand/brand-product?brand=${data.slug}`}>
                              <SWImages
                                image={`${imageUrl}/uploads/${data.logo}`}
                                alt="Brand-image"
                                width="150"
                                height="80"
                              />
                            </Link>
                          </div>
                          <div className="sw__brand__item__text">
                            <Link href={`/brand/brand-product?brand=${data.slug}`}>
                              <H4 h4={data.title} />
                              <H6 h6={`${data.total_product??0} Items`} />
                            </Link>
                          </div>
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

export const Brand = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([])

  const getBrands = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getBrands`);
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBrands()
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="sw__brand">
        <Container>
          <Row>
            {brands?.map((data, i) => (
              <Col xs={6} sm={4} lg={2} key={i}>
                {loading ? (
                  <Col>
                    <Skeleton height={150} />
                  </Col>
                ) : (
                  <div className="sw__brand__item">
                    <H6 h6={data.date} />
                    <div className="sw__brand__item__img">
                      <Link href={`/brand/brand/brand-product?brand=${data.slug}`}>
                        <SWImages
                          image={`${imageUrl}/uploads/${data.logo}`}
                          alt="Brand-image"
                          width="150"
                          height="80"
                        />
                      </Link>
                    </div>
                    <div className="sw__brand__item__text">
                      <Link href={`/brand/brand/brand-product?brand=${data.slug}`}>
                        <H4 h4={data.title} />
                        {/* <H6 h6={`${data.item} Items`} /> */}
                      </Link>
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};
