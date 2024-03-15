import SWImages from "@/components/reuseComponents/SWImages";
import { SWInput, SWLabel } from "@/components/reuseComponents/SWInput";
import { H3, H4, H5, P } from "@/components/reuseComponents/Tags";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/router';
import useConfirmationDialog from "@/components/hook/useConfirmationDialog";
import { baseUrl, imageUrl } from "@/api/apiConfig";
import axios from "axios";
import { headers } from "@/api/auth";
import { removeFromWishlist } from "@/redux/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({})
  // const [wishLists, setWishlists] = useState([]);
  const wishLists = useSelector((state) => state.wishlist);
  const router = useRouter();
  const dispatch = useDispatch();
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
      // getWishList(user);
    }
  }, []);

  
  // const getWishList = async (user) => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/wishLists/${user.id}`,{headers: headers});
  //     setWishlists(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching settings:", error);
  //   }
  // };

  const checkLogin = (user) => {
    if (user === null || Object.keys(user).length === 0) {
      router.push('/login')
    }
  }

  function increment() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  const removeWishList = async (data) => {
    const confirmed = await handleConfirmationDialog();
    if (confirmed) {
      const formData = new FormData();
      formData.append('product_id', data.id ?? '');
      formData.append('user_id', userData.id ?? '');
      formData.append('type', 'remove');
      await axios.post(`${baseUrl}/updateWishList`, formData, { headers: headers });
      dispatch(removeFromWishlist(data.id))
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
                <H3 h3="My Wishlist" />

                <div className="sw__wishlist__table">
                {wishLists.length === 0 ? (
                    <h1>Your Wishlist is Empty!</h1>
                  ) :<Table responsive="sm">
                    <tbody>
                      {/* item */}
                      {wishLists.map((item, i) => {
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
                          <button>
                            <MdDelete onClick={() => removeWishList(item)}  />
                          </button>
                        </td>
                      </tr>)})}
                    </tbody>
                  </Table>}
                </div>
              </div>
            </Col>

            {/* right */}
            {/* <Col lg={4}>
              <div className="sw__checkout__right">
                <H4 h4="Order Summary" />

                <SWList>
                  <li>
                    <H5 h5="Subtotal (2 items)" />
                    <P p="৳ 456" />
                  </li>

                  <li>
                    <H5 h5="Vat" />
                    <P p="৳ 0" />
                  </li>

                  <li>
                    <H5 h5="Payable Total" />
                    <P p="৳ 456" />
                  </li>
                </SWList>

                <div className="sw__payment__method">
                  <SWLink
                    name="Proceed to checkout (3)"
                    url="/check-out"
                    className="bg"
                  />
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
