import { baseUrl, imageUrl } from "@/api/apiConfig";
import SWImages from "@/components/reuseComponents/SWImages";
import { H2, H3, H4, H5, H6, P } from "@/components/reuseComponents/Tags";
import FormattedDate from "@/utilities/FormattedDate";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const BlogDetails = ({ articles }) => {
  const [title, content] = (
    articles?.description?.replace(/<\/?(h[1-6]|p)>/g, "") ?? ""
  ).split("\r\n") ?? ["", ""];
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getArticlesRandom();
  }, [articles])

  const getArticlesRandom = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getArticlesRandom/${articles.id}`);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }

  }

  return (
    <section className="sw__blog__details">
      <Container>
        <Row>
          {/* left */}
          <Col lg={9}>
            <div className="sw__blog__details__left">
              {/* header */}
              <div className="sw__blog__details__header">
                <H3 h3={articles.name} />
                <div className="sw__blog__details__header__box">
                  <div className="sw__blog__details__header__item">
                    <i className="flaticon-user-1"></i>
                    <P p="By Admin" />
                  </div>
                  <div className="sw__blog__details__header__item">
                    <i className="flaticon-bubble-chat"></i>
                    <P p="16 Comments" />
                  </div>
                  <div className="sw__blog__details__header__item">
                    <i className="flaticon-view"></i>
                    <P p="345" />
                  </div>
                </div>

                <div className="sw__blog__details__header__create">
                  <i className="flaticon-writing"></i>
                  <P p={FormattedDate(articles?.created_at)} />
                </div>
              </div>

              {/* sw__blog__details__contnent */}
              <div className="sw__blog__details__contnent">
                <SWImages
                  image={`${imageUrl}/uploads/${articles?.image}`}
                  width="1400"
                  height="300"
                  alt="blog-details"
                />

                <H4 h4={title} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: articles.description,
                  }}
                />
                {/* <P p={content} /> */}

              </div>
            </div>
          </Col>

          {/* right */}
          <Col lg={3}>
            <div className="sw__blog__details__right">
              {/* sw__header__img */}
              <div className="sw__header__img">
                <SWImages
                  image="/images/blogs/details/2.webp"
                  height="300"
                  width="200"
                  alt="alt"
                />
              </div>

              {/* sw__blog__details__right__box */}
              <div className="sw__blog__details__right__box">
                <H5 h5="আপনি আরও দেখতে পারেন" />
                {/* item */}
                {blogs.length > 0 && blogs.map((res, i) => <div key={i} className="sw__blog__details__right__item">
                  <div className="img">
                    <SWImages
                      image={`${imageUrl}/uploads/${res?.image}`}
                      height="300"
                      width="200"
                      alt="alt"
                    />
                  </div>
                  <div className="text">
                    <H6 h6={res.name} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: res.description,
                      }}
                    />
                  </div>
                </div>)}

              </div>

              {/* sw__blog__details__right__box */}
              <div className="sw__blog__details__right__box">
                <H5 h5="View Our Facebook Post" />

                <div className="sw__blog__details__right__item sw__fb">
                  {/* item */}
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSachinTendulkar&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2444654125642087"
                    width={340}
                    height={500}
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder={0}
                    allowFullScreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />

                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogDetails;
