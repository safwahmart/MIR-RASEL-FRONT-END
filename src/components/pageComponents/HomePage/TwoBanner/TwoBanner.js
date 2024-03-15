import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Data from "./Data";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SWImages from "@/components/reuseComponents/SWImages";
import { imageUrl } from "@/api/apiConfig";

const TwoBanner = ({banners}) => {
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
      <div className="sw__home__two__banner">
        <Container>
          <Row>
            {banners?.map((data, i) => (
              i<2 &&<Col sm="6" lg="6" key={i}>
                {loading ? (
                  <>
                    <Skeleton height={300} />
                  </>
                ) : (
                  <SWImages
                    image={`${imageUrl}/uploads/${data.image}`}
                    alt="image"
                    width="1500"
                    height="300"
                  />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TwoBanner;
