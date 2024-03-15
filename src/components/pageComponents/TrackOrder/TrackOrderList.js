import { Col, Container, Row } from "react-bootstrap";

export default function TrackOrderList() {
  return (
    <section className="sw__track__order__list">
      <Container>
        <Row>
          <Col lg={12}>
            <h2>All Orders</h2>

            <div className="sw__track__order__list__content">
              {/* item */}
              <div className="sw__track__order__list__item">
                <h5>Order no: 240313006</h5>
                <ul>
                  <li>
                    <p className="active">Pending</p>
                  </li>
                  <li>
                    <p>Accepted</p>
                  </li>
                  <li>
                    <p>Processing</p>
                  </li>
                  <li>
                    <p>On the way</p>
                  </li>
                  <li>
                    <p>Delivered</p>
                  </li>
                  <li>
                    <p>Cancelled</p>
                  </li>
                </ul>
              </div>

              {/* item */}
              <div className="sw__track__order__list__item">
                <h5>Order no: 240313006</h5>
                <ul>
                  <li>
                    <p className="active">Pending</p>
                  </li>
                  <li>
                    <p>Accepted</p>
                  </li>
                  <li>
                    <p>Processing</p>
                  </li>
                  <li>
                    <p>On the way</p>
                  </li>
                  <li>
                    <p>Delivered</p>
                  </li>
                  <li>
                    <p>Cancelled</p>
                  </li>
                </ul>
              </div>

              {/* item */}
              <div className="sw__track__order__list__item">
                <h5>Order no: 240313006</h5>
                <ul>
                  <li>
                    <p className="active">Pending</p>
                  </li>
                  <li>
                    <p>Accepted</p>
                  </li>
                  <li>
                    <p>Processing</p>
                  </li>
                  <li>
                    <p>On the way</p>
                  </li>
                  <li>
                    <p>Delivered</p>
                  </li>
                  <li>
                    <p>Cancelled</p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
