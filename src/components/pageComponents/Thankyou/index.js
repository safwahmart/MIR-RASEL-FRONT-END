import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import SWList from "@/components/reuseComponents/SWList";
import { H3, H4, H5, H6, P } from "@/components/reuseComponents/Tags";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Thankyou = () => {
  const [transactionId, setTransactionId] = useState("")
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('transaction_id');
      const transaction = userlocal;
      setTransactionId(transaction);
      if(transaction){
        updatePayment(transaction);
      }
    }
  }, [])

  const updatePayment = async(transaction)=>{
    const update = await axios.post(`${baseUrl}/updatePayment`,{transaction_id:transaction},{headers:headers});
    if(update){
      localStorage.removeItem('transaction_id')
    }
  }
  return (
    <>
      <section className="sw__thankyou__page sw__top__gaps">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="sw__header">
                <SWImages
                  image="/images/thank you.png"
                  height="100"
                  width="100"
                  alt="thankyou"
                />
                <H3 h3="Your Order is Successful!" />
                <P p="Thank you. Your order has been received." />
              </div>

              {/* <div className="sw__checkout__right">
                <H4 h4="Order Summary" />

                <SWList>
                  <li>
                    <div className="thankyou__product">
                      <H5 h5="Product" />
                      <H6 h6="Silver Heinz Ketchup" />
                    </div>
                    <P p="৳ 456" />
                  </li>

                  <li>
                    <H5 h5="Subtotal" />
                    <P p="৳ 144" />
                  </li>

                  <li>
                    <H5 h5="Shipping" />
                    <P p="৳ 144" />
                  </li>

                  <li>
                    <H5 h5="Payment Method" />
                    <P p="Cash on Delivery" />
                  </li>

                  <li>
                    <H5 h5="Total" />
                    <P p="৳ 456" />
                  </li>
                </SWList>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Thankyou;
