import { Col, Container, Row } from "react-bootstrap";

export default function TrackOrder() {
  return (
    <>
      <section className="sw__track__order">
        <Container>
          <Row className="justify-content-md-center">
            <Col lg={5}>
              <div className="sw__track__order__content">
                <h2>Track your order</h2>

                <form action="">
                  <div className="sw__custom__input">
                    <input type="text" placeholder="Enter your phone/email" />
                  </div>
                  <div className="sw__custom__input">
                    <input type="text" placeholder="Enter your order no" />
                  </div>

                  <div className="sw__custom__input">
                    <button className="bg">Submit</button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
