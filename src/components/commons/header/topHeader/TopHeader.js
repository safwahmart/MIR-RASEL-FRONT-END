// TopHeader.js
import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import SWList from "@/components/reuseComponents/SWList";
import { H6 } from "@/components/reuseComponents/Tags";
import { getCart } from "@/redux/cart.slice";
import UserSvg from "@/svgs/UserSvg";
import axios from "axios";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../../sidebar/Sidebar";
import { DataMobile } from "./Data";
import { getWishlist } from "@/redux/wishlist.slice";

const TopHeader = ({ offers }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [userData, setUserData] = useState({});
  const [settings, setSettings] = useState({});
  const language = router.locale;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const handleClose = () => setShow(false);
  const handleCloseCategory = () => setShowCategory(false);
  const handleShow = () => setShow(true);
  const handleShowCategory = () => setShowCategory(true);
  const { i18next } = useTranslation("footer");
  const handleChange = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userlocal = localStorage.getItem("user");
      const user = JSON.parse(userlocal);
      setUserData(user);
    }
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getSettings`);
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  useEffect(() => {
    console.log("userData", userData);
    if (userData !== null) {
      if (Object.keys(userData).length > 0) {
        getCartData(userData);
        getWishData(userData);
      }
    }
  }, [userData]);
  const getWishData = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/wishLists/${user.id}`, { headers: headers });
      dispatch(getWishlist(response.data?.data));
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  const getCartData = async (user) => {
    try {
      const response = await axios.get(`${baseUrl}/carts/${user.id}`, {
        headers: headers,
      });
      dispatch(getCart(response.data?.data));
    } catch (err) {
      console.log('error', err)
    }
  };
  console.log("settings", settings);
  return (
    <section className="sw__top__header d_flex d_justify">
      {/* left */}
      <div className="sw_left d_flex">
        {/* desktop */}
        <div className="sw__desktop__menu">
          <SWList>
            {/* {Data?.map((data, i) => (
              <li
                key={i}
                className={router.pathname == data?.url ? "active" : ""}
              >
                <Link href={data?.url} className="d_flex gap-2">
                  <i className={data.icon}></i> {data?.title}
                </Link>
              </li>
            ))} */}
            {settings?.header_home === "1" && (
              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href={"/"} className="d_flex gap-2">
                  <i className={"flaticon-home-1"}></i> Home
                </Link>
              </li>
            )}
            {settings?.header_help === "1" && (
              <li className={router.pathname == "/help" ? "active" : ""}>
                <Link href={"/help"} className="d_flex gap-2">
                  <i className={"flaticon-support"}></i> Help
                </Link>
              </li>
            )}
            {settings?.header_track_order === "1" && (
              <li className={router.pathname == "/track-order" ? "active" : ""}>
                <Link href={"/track-order"} className="d_flex gap-2">
                  <i className={"flaticon-placeholder"}></i> Track your order
                </Link>
              </li>
            )}
            {settings?.header_supply_product === "1" && (
              <li
                className={router.pathname == "/supply-product" ? "active" : ""}
              >
                <Link href={"/supply-product"} className="d_flex gap-2">
                  <i className={"flaticon-demand"}></i> Supply your product
                </Link>
              </li>
            )}
            {settings?.header_app === "1" && (
              <li className={router.pathname == "/app" ? "active" : ""}>
                <Link href={"/app"} className="d_flex gap-2">
                  <i className={"flaticon-mobile-development"}></i> App
                </Link>
              </li>
            )}
          </SWList>
        </div>
        {/* mobile */}
        <div className="sw__mobile__menu">
          {/* left */}
          <div className="sw__left">
            <Button className="bg" onClick={handleShow}>
              <i className="flaticon-menu"></i> <H6 h6="Menu" />
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="sw__mobile__menu">
                <SWList className="sw__top__header__list">
                  {DataMobile?.map((data, i) => (
                    <li
                      key={i}
                      className={router.pathname == data?.url ? "active" : ""}
                    >
                      <Link href={data?.url} className="d_flex gap-2">
                        <i className={data?.icon}></i> {data?.title}
                      </Link>
                    </li>
                  ))}

                  <Link href="login" className="login">
                    Login
                  </Link>
                </SWList>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          {/* right */}
          <div className="sw__left">
            <Button className="bg" onClick={handleShowCategory}>
              <i className="flaticon-menu"></i> <H6 h6="Category" />
            </Button>
            <Offcanvas show={showCategory} onHide={handleCloseCategory}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="sw__mobile__menu sw__mobile__sidebar">
                <SidebarMenu />
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="sw_right d_flex">
        {/* <SWDropdown title="Language" onChange={handleChange} value={language}>
          <li>English</li>
          <li>Bangla</li>
        </SWDropdown> */}
        <Form.Select
          aria-label="Language"
          value={language}
          onChange={handleChange}
          style={{ width: "112px" }}
        >
          <option value={"en"}>English</option>
          <option value={"bn"}>Bangla</option>
        </Form.Select>
        <div className="sw__sign__in">
          <Link
            href={userData ? "/client-dashboard" : "/login"}
            className="d_flex"
          >
            <UserSvg />
            {userData && `Hello ${userData.name},`} {!userData && "sign in"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
