import { baseUrl } from "@/api/apiConfig";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LastHeader from "./lastHeader/LastHeader";
import MiddleHeader from "./middleHeader/MiddleHeader";
import Noticebar from "./noticebar/Noticebar";
import TopHeader from "./topHeader/TopHeader";

const Header = () => {
  const [settings, setSettings] = useState({});
  const [offers, setOffers] = useState([]);
  const router = useRouter();
  const language = router.locale;

  const getOffer = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getOffers`);
      if (response) {
        setOffers(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const getSettings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getSettings`);
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    getSettings();
    getOffer();
  }, []);

  return (
    <>
      <div className="sw__all_header">
        <Noticebar offers={offers} />
        <TopHeader offers={offers} />
        <MiddleHeader settings={settings} offers={offers} />
        <LastHeader />
      </div>
    </>
  );
};

export default Header;
