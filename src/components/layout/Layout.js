import Link from "next/link";
import { useState } from "react";
import Footer from "../commons/Footer/Footer";
import ShopInfo from "../commons/ShopInfo/ShopInfo";
import Header from "../commons/header/Header";
import SWImages from "../reuseComponents/SWImages";
import { P } from "../reuseComponents/Tags";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowSticky = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Header />
      <div className="">
        <main>{children}</main>
        <ShopInfo />
        <Footer />
      </div>
      {/* sw__social__icon__stiky */}
      <div className="sw__social__icon__stiky" onClick={handleShowSticky}>
        <SWImages
          image="/images/chat.gif"
          height="50"
          width="50"
          alt="whats"
          className="sw__chat__gif"
        />
        {isOpen ? (
          <div className="sw__social__icon__stiky__item sw__show__sticky">
            <Link href="">
              <SWImages
                image="/images/whats-app.gif"
                height="40"
                width="40"
                alt="whats"
              />
            </Link>
            <Link href="">
              <SWImages
                image="/images/messanger.gif"
                height="40"
                width="40"
                alt="whats"
              />
            </Link>
            <Link href="">
              <SWImages
                image="/images/custom-chat.gif"
                height="40"
                width="40"
                alt="whats"
              />
              <P p="Custom Chat" />
            </Link>
            <Link href="">
              <SWImages
                image="/images/tawk-sitelogo.png"
                height="40"
                width="40"
                alt="whats"
              />
              <P p="Live Chat" />
            </Link>
          </div>
        ) : (
          <div className="sw__social__icon__stiky__item">
            <Link href="">
              <SWImages
                image="/images/whats-app.gif"
                height="40"
                width="40"
                alt="whats"
              />
            </Link>
            <Link href="">
              <SWImages
                image="/images/messanger.gif"
                height="40"
                width="40"
                alt="whats"
              />
            </Link>
            <Link href="">
              <SWImages
                image="/images/custom-chat.gif"
                height="40"
                width="40"
                alt="whats"
              />
              <P p="Custom Chat" />
            </Link>
            <Link href="">
              <SWImages
                image="/images/tawk-sitelogo.png"
                height="40"
                width="40"
                alt="whats"
              />
              <P p="Live Chat" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;

// <div className="sw__social__icon__stiky__chat__hand">
//   <SWImages image="/images/cahthand.svg" height="70" width="124" alt="whats" />
// </div>;
