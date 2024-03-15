import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Data from "./Data";
import { H4, P } from "@/components/reuseComponents/Tags";

const ShopInfo = () => {
  return (
    <>
      <section className="sw__shop__info">
        <Container>
          <Row>
            {Data?.map((data, i) => (
              <Col sm={6} lg={3} key={i}>
                <div className="sw__shop__info__item d_flex">
                  <div className="sw__shop__info__img">
                    <i className={data.image}></i>
                  </div>
                  <div className="sw__shop__info__text">
                    <H4 h4={data.title} />
                    <P p={data.description} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ShopInfo;
