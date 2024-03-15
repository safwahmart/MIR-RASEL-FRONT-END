import SWImages from "@/components/reuseComponents/SWImages";
import { H4, H5, H6, P } from "@/components/reuseComponents/Tags";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FooterContact, FooterLink, SocialIcon } from "./Data";
import Link from "next/link";
import CashonDelivart from "@/svgs/CashonDelivart";
import SWList from "@/components/reuseComponents/SWList";
import SWLink from "@/components/reuseComponents/SWLink";
import PlayStore from "@/svgs/PlayStore";
import AppleStore from "@/svgs/AppleStore";
import { baseUrl, imageUrl } from "@/api/apiConfig";
import axios from "axios";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [settings, setSettings] = useState({});
  const [pages, setPages] = useState([]);

  const getSettings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getSettings`);
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  const getPages = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getPages`);
      setPages(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    getSettings();
    getPages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/getSocialLinks`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setSocialLinks(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <footer className="sw__fotter">
        <Container>
          <Row>
            <Col lg={3}>
              {/* logo */}
              <div className="sw__logo">
                <SWImages
                  image={`${imageUrl}/uploads/${settings?.company_logo}`}
                  width="300"
                  height="80"
                  alt="footer-logo"
                />
                <H6 h6="For an easy, healthy and happy living" />

                <div className="sw__social__icon">
                  <H4 h4="Join Us" />
                  <div className="sw__social__icon__group">
                    {socialLinks?.map((data, i) => (
                      <Link href={data.url} target="_blank" key={i}>
                        <i className={data.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={9}>
              <Row>
                <Col sm={4} lg={6}>
                  <div className="sw__fotter__link sw__contact__us">
                    <H4 h4="Contact us" />
                    <SWList>
                      <li>
                        <i className="flaticon-telephone"></i>
                        <P p={`${settings?.phone} (10:30am-4:30pm)`} />
                      </li>
                      <li>
                        <i className="flaticon-email"></i>
                        <P p={`${settings?.email}`} />
                      </li>
                      <li>
                        <i className="flaticon-placeholder"></i>
                        <P p={`${settings?.address}`} />
                      </li>
                    </SWList>
                  </div>
                </Col>

                <Col sm={4} lg={3}>
                  <div className="sw__fotter__link">
                    <H4 h4="Quick links" />
                    <SWList>
                    <li>
                          <SWLink url={"/"} name={'Home'} />
                        </li>
                      {pages?.map((data, i) => (
                        <li key={i}>
                          <SWLink url={`/${data.page_slug}`} name={data.page_name} />
                        </li>
                      ))}
                    </SWList>
                  </div>
                </Col>

                <Col sm={4} lg={3}>
                  <div className="sw__fotter__link">
                    <H4 h4="Download app" />
                    <div className="sw__cash__on__delivery">
                      <div className="img">
                        <Link href="">
                          <SWImages
                            image="/images/google-play.png"
                            width="100"
                            height="50"
                            alt="cash-on-delivery"
                          />
                        </Link>
                      </div>
                      <div className="img">
                        <Link href="">
                          <SWImages
                            image="/images/app-store.png"
                            width="100"
                            height="50"
                            alt="cash-on-delivery"
                          />
                        </Link>
                      </div>
                      <div className="img">
                        <SWImages
                          image="/images/cash-on-delivery.png"
                          width="100"
                          height="50"
                          alt="cash-on-delivery"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* all__bank__image */}
            <Col lg={12}>
              <div className="sw__all__bank__image">
                <SWImages
                  image="/images/bank-img.webp"
                  width="1500"
                  height="50"
                  alt="bank-img"
                />
              </div>
              <div className="sw__copy__right">
                <P p="Copyright ©2024" />
                <SWLink url="#" name="Safwah Mart" />
                <P p="& Product Develop By" />
                <SWLink url="#" name="Devs Tomorrow" />
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
