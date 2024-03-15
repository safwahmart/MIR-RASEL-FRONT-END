import HeaderTitle from "@/components/commons/HeaderTitle";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// Import Swiper React components
import SwiperSlider from "@/components/commons/SwiperSlider/SwiperSlider";
import SWImages from "@/components/reuseComponents/SWImages";
import { H5, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { baseUrl, imageUrl } from '@/api/apiConfig';

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { t } from "i18next";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPurchaseInfo();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

const getPurchaseInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getCategories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <section className="sw__category">
        <Container>
          <Row>
            <Col lg={12}>
              {/* header */}
              <HeaderTitle title={t("Category")} url="/category" name="View All" />

              <div className="sw__category__slider">
                <SwiperSlider>
                  <Swiper
                    navigation={{
                      nextEl: ".arrow-left",
                      prevEl: ".arrow-right",
                    }}
                    autoplay={{
                      delay: 2800,
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
                    {categories?.map((data, i) => (
                      <SwiperSlide key={i}>
                        {loading ? (
                          <>
                            <div className="sw__category__item">
                              <Skeleton height={180} />
                            </div>
                          </>
                        ) : (
                          <div className="sw__category__item">
                            <Link href={`/category/sub-category?sub=${data.slug}`}>
                              <div className="sw__category__img">
                                <SWImages
                                  image={`${imageUrl}/uploads/${data.image}`}
                                  width="75"
                                  height="75"
                                  tel="category"
                                />
                              </div>
                              <div className="sw__category__text">
                                <H5 h5={data.name} />
                                <P p={data.total_product??0  + " " + "Item"} />
                              </div>
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Category;
