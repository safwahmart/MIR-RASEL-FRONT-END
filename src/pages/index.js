import PopupModalLocation from "@/components/commons/PopupModalLocation";
import PopupModalOffer from "@/components/commons/PopupModalOffer";
import { BlogSwiper } from "@/components/pageComponents/BlogPage/Blog/Blog";
import { BrandSwiper } from "@/components/pageComponents/BrandPage/Brand";
import BannerSlider from "@/components/pageComponents/HomePage/BannerSlider/BannerSlider";
import Category from "@/components/pageComponents/HomePage/Category/Category";
import CustomerFeedback from "@/components/pageComponents/HomePage/CustomerFeedback/CustomerFeedback";
import FormData from "@/components/pageComponents/HomePage/FormData/FormData";
import HomeProduct from "@/components/pageComponents/HomePage/HomeProduct/HomeProduct";
import PromoBanner from "@/components/pageComponents/HomePage/HomeProduct/PromoBanner";
import SummerOffer from "@/components/pageComponents/HomePage/SummerOffer/SummerOffer";
import TwoBanner from "@/components/pageComponents/HomePage/TwoBanner/TwoBanner";
import MetaHead from "@/utilities/MetaHead";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "./../../next-i18next.config";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import { useEffect, useState } from "react";
import { t } from "i18next";


export default function Pages() {
  const [settings, setSettings] = useState({});
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);

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
    getBanner();
  }, []);

  const getOffer = async () => {
    console.log('offers main', offers)
    try{
    if (offers.length === 0) {
      const response = await axios.get(`${baseUrl}/getOffers`);
      if (response) {
        setOffers(response.data?.data);
      }
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
  }
  const getBanner = async () => {
    try {
      if (banners.length === 0) {
        const response = await axios.get(`${baseUrl}/getBanners`);
        if (response) {
          setBanners(response.data?.data);
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="sw__home__page sw__top__gaps">
      {/* MetaTag */}
      {/* <MetaHead settings={settings} metaTitle="Home" /> */}
      {/* <p>{t("Search for products (e.g. eggs, milk, potato)")}</p> */}

      {/* banner */}
      {settings?.home_page_slider_section === "1" && <BannerSlider />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* two banner */}
      {settings?.advertise_two_section === "1" && <TwoBanner banners={banners}/>}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* bdr */}
      <div className="sw_bdr"></div>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      <SummerOffer offers={offers} />

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* bdr */}
      <div className="sw_bdr"></div>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* category */}
      {settings?.product_category_section === "1" && <Category />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* form Data */}
      {settings?.three_forms_photos === "1" && <FormData />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* HomeProduct */}
      {settings?.highlighted_product_section === "1" && <HomeProduct />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* PromoBanner */}
      <PromoBanner image={banners.length > 2 && banners[2].image} />

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* HomeProduct */}
      {settings?.highlighted_product_section === "1" && <HomeProduct />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>

      {/* PromoBanner */}
      <PromoBanner image={banners.length > 3 && banners[3].image} />

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
      {settings?.article_section === "1" && <BlogSwiper />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
      {settings?.subscriber_section === "1" && <CustomerFeedback />}

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
      {settings?.highlighted_brand_section === "1" && <BrandSwiper />}

      {/* <PopupModalLocation /> */}
    </div>
    // <>
    // <PopupModalOffer />
    // </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["common", "footer", "blog"],
      nextI18NextConfig
    )),
  },
});
