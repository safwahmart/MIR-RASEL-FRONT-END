import SWImages from "@/components/reuseComponents/SWImages";
import SWLink from "@/components/reuseComponents/SWLink";
import { H5, P } from "@/components/reuseComponents/Tags";
import { Col, Container, Row } from "react-bootstrap";
import ClientSidebar from "../ClientSidebar";

const ClientMyOrder = ({totalOrder}) => {
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
                  <i className="flaticon-shopping-cart"></i> My Order
                </h3>
                <div className="sw__client__dashboard__my__order">
                  <table>
                    {/* head */}
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Order No & Date</th>
                        <th>Total Price</th>
                        <th>Grand total</th>
                        <th>Quantity</th>
                        <th>Payment type</th>
                        {/* <th>Track Order</th> */}
                        <th>Status</th>
                      </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                      {/* item */}
                     {totalOrder?.map((res,i)=>{
                      return(<tr key={i}>
                        <td>{i+1}</td>
                        <td>
                          <H5 h5={`#${res.invoice_no}`} />
                          <P p="Jun 27, 2023" />
                        </td>
                        <td>
                          <h6>
                            <i className="flaticon-taka"></i>
                            {res.sub_total}
                          </h6>
                        </td>
                        <td>
                          <h6>
                            <i className="flaticon-taka"></i>
                            {res.payable}
                          </h6>
                        </td>
                        <td>
                          <P p={res.total_qty} />
                        </td>
                        <td>
                          {res.payment_type==="2"?<SWImages
                            image="/images/cash-on.svg"
                            height="50"
                            width="180"
                            alt="img"
                          />:<SWImages
                          image="/images/online-payment.svg"
                          height="50"
                          width="180"
                          alt="img"
                        />}
                        </td>
                        {/* <td>
                          <SWLink url="" name="Where My Prduct" />
                        </td> */}
                        <td>
                          <span className="panding"> {res.status===0 &&'Pending'} </span>
                          {/* <span className="confirm"> Confirm </span> */}
                        </td>
                      </tr>)
                     })} 
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClientMyOrder;
