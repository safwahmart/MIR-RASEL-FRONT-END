import { baseUrl, imageUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import HeaderTitle from "@/components/commons/HeaderTitle";
import SWImages from "@/components/reuseComponents/SWImages";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    getFeedback();
  }, [])
  const getFeedback = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/getFeedbacks`, { headers: headers });
      setFeedbacks(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  return (
    <>
      <section className="sw__customer__feedback">
        <Container>
          <Row>
            <Col lg={12}>
              <HeaderTitle title="Customer Feedback" name="" url="#" />
              {feedbacks.length > 0 && feedbacks.map(res => 

                // eslint-disable-next-line react/jsx-key
                <SWImages
                  image={`${imageUrl}/uploads/${res?.image}`}
                  alt="feedback"
                  width={1500}
                  height={500}
                />
              )
              }
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CustomerFeedback;
