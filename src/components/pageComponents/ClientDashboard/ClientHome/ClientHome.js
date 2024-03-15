import { H4, H5 } from "@/components/reuseComponents/Tags";
import { Col, Container, Row } from "react-bootstrap";
import ClientSidebar from "../ClientSidebar";

const ClientHome = ({totalPrice,totalOrder}) => {
  return (
    <>
      <div className="sw__client__dashboard__gaps">
        <Container>
          <Row>
            <Col lg={3}>
              <ClientSidebar />
            </Col>
            <Col lg={9}>
              <div className="sw__client__dashboard__home">
                <h3>
                  <i className="flaticon-home"></i>
                  Dashboard
                </h3>
                <div className="sw__client__dashboard__home__content">
                  <Row>
                    {/* item */}
                    <Col sm={4} lg={4}>
                      <div className="sw__client__dashboard__home__item">
                        <H4 h4="Total Order" />
                        <H5 h5={totalOrder} />
                      </div>
                    </Col>
                    {/* item */}
                    <Col sm={4} lg={4}>
                      <div className="sw__client__dashboard__home__item">
                        <H4 h4="Wishlist" />
                        <H5 h5="20" />
                      </div>
                    </Col>
                    {/* item */}
                    <Col sm={4} lg={4}>
                      <div className="sw__client__dashboard__home__item">
                        <H4 h4="Total Price" />
                        <H5 h5={totalPrice} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClientHome;
