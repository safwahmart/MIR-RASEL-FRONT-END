import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import { H3, H4, P } from "@/components/reuseComponents/Tags";
import MetaHead from "@/utilities/MetaHead";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const index = () => {
  return (
    <>
      <section className="sw__privecy__policy">
        {/* MetaTag */}
        <MetaHead metaTitle="Terms & Condition" />
        {/* OthersBanner */}
        <OthersBanner
          title="Terms & Condition"
          name="Home"
          subName="Terms & Condition"
        />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <div className="sw__privecy__policy__content">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <H3 h3="Terms & Condition" />
                <P p="Once our system receives your order, your order is inspected thoroughly to ensure they are in perfect condition and go through the final round of quality check before dispatch. Before starting our delivery process we would confirm your order and payment details over the phone. This usually takes 1 working day from the time you place the order and your response time to receive our phone. If there is any delay in receiving our phone, we will try for up to 2 working days and if still we failed to reach you over the phone, your order will be canceled. Our delivery time starts right after we have confirmed your order over the phone. Your order is then packed and handed over to our trusted delivery partner. Our delivery partner then bring the package to you at the earliest possible time. In case, they are unable to reach you, at your provided address or at a suitable time, they will contact you to resolve the issue. We deliver all over Bangladesh." />

                <H4 h4="Delivery inside Dhaka:" />
                <P p="Sweep Cool Silver across your eyelids for a striking, metallic look. The silver glitters will instantly brighten your eyes, creating a captivating gaze that is perfect for a night out or special occasions. Pair it with bold eyeliner or blend it with other shades to create a unique, customized eye look." />

                <H4 h4="Delivery inside Dhaka:" />
                <P p="Sweep Cool Silver across your eyelids for a striking, metallic look. The silver glitters will instantly brighten your eyes, creating a captivating gaze that is perfect for a night out or special occasions. Pair it with bold eyeliner or blend it with other shades to create a unique, customized eye look." />

                <H4 h4="Delivery inside Dhaka:" />
                <P p="Sweep Cool Silver across your eyelids for a striking, metallic look. The silver glitters will instantly brighten your eyes, creating a captivating gaze that is perfect for a night out or special occasions. Pair it with bold eyeliner or blend it with other shades to create a unique, customized eye look." />

                <H4 h4="Delivery inside Dhaka:" />
                <P p="Sweep Cool Silver across your eyelids for a striking, metallic look. The silver glitters will instantly brighten your eyes, creating a captivating gaze that is perfect for a night out or special occasions. Pair it with bold eyeliner or blend it with other shades to create a unique, customized eye look." />
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
    </>
  );
};

export default index;
