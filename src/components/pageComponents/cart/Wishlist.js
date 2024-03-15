import { baseUrl, imageUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import SWButton from "@/components/reuseComponents/SWButton";
import SWImages from "@/components/reuseComponents/SWImages";
import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";
import SWLink from "@/components/reuseComponents/SWLink";
import SWList from "@/components/reuseComponents/SWList";
import { H3, H4, H5, P } from "@/components/reuseComponents/Tags";
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/cart.slice";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, InputGroup, Row, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useConfirmationDialog from "@/components/hook/useConfirmationDialog";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [count, setCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({})
  const router = useRouter();
  const language = router.locale;
  const handleConfirmationDialog = useConfirmationDialog(
    language === 'en' ? 'Delete the Product?' : 'ট্যাগ মুছবেন?',
    language === 'en' ? 'Are you sure you want to delete?' : 'আপনি মুছে ফেলতে চান?',
    language === 'en' ? 'Yes, delete' : 'হ্যাঁ, মুছে দিন'
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      setUserData(user);
      checkLogin(user);
    }
  }, []);

  const checkLogin = (user) => {
    if (user === null || Object.keys(user).length === 0) {
      router.push('/login')
    }
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.sale_price,
      0
    );
  };
  const getTotal = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + eval(item.quantity),
      0
    );
  };
  const getTotalVat = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + eval(item.vat), 0
    );
  };
  // const getTotalVat = () => {
  //   return cart.reduce(
  //     (accumulator, item) => {
  //       console.log('item.vat !== 0',item.vat !=='0', 0)
  //       if (item.vat !== '0') {
  //        return accumulator + item.vat
  //       }else{
  //         return 0;
  //       }
  //     },
  //     0
  //   );
  // };
  const getTotalDiscount = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + eval(item.discount),
      0
    );
  };

  const increment = async (data) => {
    const formData = new FormData();
    formData.append('product_id', data.id ?? '');
    formData.append('user_id', userData.id ?? '');
    formData.append('qty', 1 ?? '');
    formData.append('price', data.sale_price ?? '');
    formData.append('discount', data.discount ?? '');
    formData.append('vat', data.vat ?? '');
    formData.append('type', 'increment');
    await axios.post(`${baseUrl}/updateCart`, formData, { headers: headers });
    dispatch(incrementQuantity(data.id))
  }
  const descrement = async (data) => {
    const formData = new FormData();
    formData.append('product_id', data.id ?? '');
    formData.append('user_id', userData.id ?? '');
    formData.append('qty', 1 ?? '');
    formData.append('price', data.sale_price ?? '');
    formData.append('discount', data.discount ?? '');
    formData.append('vat', data.vat ?? '');
    formData.append('type', 'decrement');
    await axios.post(`${baseUrl}/updateCart`, formData, { headers: headers });
    dispatch(decrementQuantity(data.id))
  }
  const removeCart = async (data) => {
    const confirmed = await handleConfirmationDialog();
    if (confirmed) {
      const formData = new FormData();
      formData.append('product_id', data.id ?? '');
      formData.append('user_id', userData.id ?? '');
      formData.append('type', 'remove');
      await axios.post(`${baseUrl}/updateCart`, formData, { headers: headers });
      dispatch(removeFromCart(data.id))
      toast.success('Item deleted Successfully')
    }
  }
  return (
    <>
      <section className="sw__wishlist__page sw__top__gaps">
        <Container>
          <Row>
            {/* left */}
            <Col lg={8}>
              <div className="sw__wishlist__left">
                <H3 h3="Cart" />

                <div className="sw__wishlist__table">
                  {cart.length === 0 ? (
                    <h1>Your Cart is Empty!</h1>
                  ) : <Table responsive="sm">
                    <tbody>
                      {/* item */}
                      {cart.map((item, i) => {
                        return (<tr key={i}>
                          <td>
                            <SWInput type="checkbox" name="" />
                          </td>
                          <td>
                            <div className="d_flex">
                              <SWImages
                                image={`${imageUrl}/uploads/${item.thumbnail_image}`}
                                width="65"
                                height="65"
                                alt="product"
                              />
                              <p>{item.product_name}</p>
                            </div>
                          </td>
                          <td>
                            <div className="d_flex">
                              <i className="flaticon-taka"></i>
                              <H4 h4={item.sale_price} />
                            </div>
                          </td>
                          <td>
                            {/* sw__quintity */}
                            <div className="sw__quintity">
                              <button
                                onClick={() => { descrement(item) }}
                                className="sw__decrement"
                              >
                                -
                              </button>
                              <SWInput
                                name={count}
                                // placeholder={count + 1}
                                value={item.quantity}
                                type="number"
                              />
                              <button
                                onClick={() => { increment(item) }}
                                className="sw__increment"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <button>
                              <MdDelete onClick={() => removeCart(item)} />
                            </button>
                          </td>
                        </tr>)
                      }
                      )}

                    </tbody>
                  </Table>}
                </div>
              </div>
            </Col>

            {/* right */}
            <Col lg={4}>
              <div className="sw__checkout__right">
                <H4 h4="Order Summary" />

                <SWList>
                  <li>
                    <H5 h5={`Subtotal (${getTotal()} items)`} />
                    <P p={`৳ ${getTotalPrice()?.toFixed(2) ?? 0}`} />
                  </li>

                  <li>
                    <H5 h5="Vat" />
                    <P p={`৳ ${getTotalVat().toFixed(2)}`} />
                  </li>
                  <li>
                    <H5 h5="Discount" />
                    <P p={`৳ ${getTotalDiscount()?.toFixed(2)}`} />
                  </li>

                  <li>
                    <H5 h5="Payable Total" />
                    <P p={`৳ ${((getTotalPrice() + getTotalVat()) - getTotalDiscount())?.toFixed(2)}`} />
                  </li>
                </SWList>

                <div className="sw__payment__method">
                  <SWLink
                    name={`Proceed to checkout (${getTotal()})`}
                    url="/check-out"
                    className="bg"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
