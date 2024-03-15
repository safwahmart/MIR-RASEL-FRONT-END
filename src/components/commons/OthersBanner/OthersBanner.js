import { H2, P } from "@/components/reuseComponents/Tags";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OthersBanner = ({ title, name, subName }) => {
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
      <section className="sw__others__banner">
        {loading ? (
          <Skeleton height={400} />
        ) : (
          <Container>
            <Row>
              <Col lg={12}>
                <H2 h2={title} />
                <div className="d_flex">
                  <P p={name} />
                  <span> / {subName}</span>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default OthersBanner;
