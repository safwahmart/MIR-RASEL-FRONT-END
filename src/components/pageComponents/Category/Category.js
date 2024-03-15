import SWImages from "@/components/reuseComponents/SWImages";
import { H5, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// Skeleton for loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Data from "./Data";
import { useState } from "react";
import { useEffect } from "react";
import { imageUrl } from "@/api/apiConfig";

const Category = ({ categories }) => {
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
      <div className="sw__category__page">
        <Container>
          <Row className="sw__category">
            {categories?.map((data, i) => (
              <Col lg={2} key={i}>
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
                        <P p={data.total_product ?? 0 + " " + "Item"} />
                      </div>
                    </Link>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="sw__gaps"></div>
    </>
  );
};

export default Category;
