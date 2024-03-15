import SwiperSlider from "@/components/commons/SwiperSlider/SwiperSlider";
import SWImages from "@/components/reuseComponents/SWImages";
import SWLink from "@/components/reuseComponents/SWLink";
import { H4, H6, P } from "@/components/reuseComponents/Tags";
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
import { baseUrl, imageUrl } from "@/api/apiConfig";
import FormattedDate from "@/utilities/FormattedDate";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Home Page BlogSwiper
export const BlogSwiper = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getArticles`);
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  console.log("articles", articles);

  useEffect(() => {
    setLoading(true);
    getArticles();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="sw__blog">
        <Container>
          <Row>
            <Col lg={12}>
              <HeaderTitle title="Articles" name="View All" url="/blog" />
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
                      slidesPerView: 1.2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 2.1,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Navigation, Autoplay]}
                  className="sw__swiper__slider"
                >
                  {articles?.map((data, i) => (
                    <SwiperSlide key={i}>
                      {loading ? (
                        <>
                          <Skeleton height={500} />
                        </>
                      ) : (
                        <div className="sw__blog__item">
                          <H6 h6={FormattedDate(data?.created_at)} />
                          <div className="sw__blog__item__img">
                            <Link href={`/blog/blog-details?blog=${data.slug}`}>
                              <SWImages
                                image={`${imageUrl}/uploads/${data.image}`}
                                alt={data.img}
                                width="300"
                                height="200"
                              />
                            </Link>
                          </div>
                          <div className="sw__blog__item__text">
                            <H4 h4={data.name} />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.description,
                              }}
                            />
                            <SWLink
                              url={`/blog/blog-details?blog=${data.slug}`}
                              name="Read more"
                            />
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

// Home Page Blog
export const Blog = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("blog");
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getArticles`);
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getArticles();
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <section className="sw__blog">
        <Container>
          <Row>
            {articles?.map((data, i) => (
              <Col sm={6} lg={4} key={i}>
                <h1></h1>
                {loading ? (
                  <>
                    <Skeleton height={500} />
                  </>
                ) : (
                  <div className="sw__blog__item">
                    <H6 h6={FormattedDate(data?.created_at)} />
                    <div className="sw__blog__item__img">
                      <Link href={`/blog/blog-details?blog=${data.slug}`}>
                        <SWImages
                          image={`${imageUrl}/uploads/${data.image}`}
                          alt={data.img}
                          width="300"
                          height="200"
                        />
                      </Link>
                    </div>
                    <div className="sw__blog__item__text">
                      <H4 h4={data.name} />
                      <P p={data.description} />
                      <SWLink
                        url={`/blog/blog-details?blog=${data.slug}`}
                        name="Read more"
                      />
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
