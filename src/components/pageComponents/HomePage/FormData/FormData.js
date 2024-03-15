import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Data from "./Data";
import { H4 } from "@/components/reuseComponents/Tags";
import Link from "next/link";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SWImages from "@/components/reuseComponents/SWImages";

const FormData = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <section className="sw__form__data">
        <Container>
          <Row>
            {Data?.map((data, i) => (
              <Col sm={4} lg={4} key={i}>
                {loading ? (
                  <div className="sw__form__data__item">
                    <Skeleton height={200} />
                  </div>
                ) : (
                  <div className="sw__form__data__item">
                    <Link href={data.url}>
                      <div className="sw__form__data__img">
                        <SWImages
                          image={data.image}
                          alt="form-img"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="sw__form__data__text d_flex d_center">
                        <H4 h4={data.name} />
                        <i className="flaticon-right-arrow" />
                      </div>
                    </Link>
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

export default FormData;
