import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";
import { H3, H4 } from "@/components/reuseComponents/Tags";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormSubmit = () => {
  return (
    <>
      <section className="sw__checkout__page sw__top__gaps">
        <Container>
          <Row className="justify-content-center">
            {/* left */}
            <Col lg={8}>
              <div className="sw__checkout__left">
                <H4 h4="This is a corporate order from. You have to fillup our from so that we can contact with you or your company to fulfill your company needs. We will contact with you soon." />

                <Row>
                  <Col lg={12}>
                    <SWLabel name="Name" star="*" />
                    <SWInput type="text" value="" placeholder="" />
                  </Col>

                  <Col sm={6} lg={6}>
                    <SWLabel name="Institute Name" star="*" />
                    <SWInput type="text" value="" placeholder="" />
                  </Col>

                  <Col sm={6} lg={6}>
                    <SWLabel name="Email" star="*" />
                    <SWInput type="email" value="" placeholder="" />
                  </Col>

                  <Col sm={6} lg={6}>
                    <SWLabel name="Phone" star="*" />
                    <SWInput type="text" value="" placeholder="" />
                  </Col>

                  <Col sm={6} lg={6}>
                    <SWLabel name="Address" star="*" />
                    <SWInput type="text" value="" placeholder="" />
                  </Col>

                  <Col sm={12} lg={12}>
                    <SWLabel name="Zip Code" star="*" />
                    <SWInput type="file" value="" placeholder="" />
                  </Col>

                  <Col lg={12}>
                    <SWLabel name="Corporate order note" star="*" />
                    <div className="sw__custom__input">
                      <textarea name="" rows="5" placeholder=""></textarea>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <SWLabel name="Corporate order note" star="*" />
                    <div className="sw__custom__input">
                      <textarea name="" rows="5" placeholder=""></textarea>
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="sw__custom__input">
                      <button className="bg">Submit</button>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="sw__custom__input"></div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FormSubmit;
