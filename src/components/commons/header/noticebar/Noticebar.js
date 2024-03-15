import { baseUrl } from "@/api/apiConfig";
import SWImages from "@/components/reuseComponents/SWImages";
import { P } from "@/components/reuseComponents/Tags";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Noticebar = () => {
  const [settings, setSettings] = useState({});
  useEffect(() => {
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
  return (
    <>
      <section className="sw__noticebar">
        {settings?.notice_on_top === "1" && <Marquee pauseOnHover={true} speed={40}>
          <div className="sw__noticebar__content d_flex">
            <SWImages
              image="/images/special-offer.webp"
              width="20"
              height="20"
              alt="special-offer"
            />
            <P p={settings?.top_advertisement} />
          </div>
        </Marquee>}
      </section>
    </>
  );
};

export default Noticebar;
