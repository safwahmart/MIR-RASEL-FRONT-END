import { imageUrl } from "@/api/apiConfig";
import SWImages from "@/components/reuseComponents/SWImages";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const PromoBanner = ({ image }) => {
  return (
    <>
      <section className="sw__promo__banner">
        <Container>
          <Row>
            <Col lg={12}>
              {image&& <SWImages
                image={`${imageUrl}/uploads/${image}`}
                alg="promo-image"
                width="1500"
                height="300"
              />}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PromoBanner;
