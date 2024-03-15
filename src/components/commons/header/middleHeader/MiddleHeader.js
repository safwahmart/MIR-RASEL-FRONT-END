import SWImages from "@/components/reuseComponents/SWImages";
import SearchSvg from "@/svgs/SearchSvg";
import React, { useEffect, useState } from "react";
import Data from "./Data";
import { P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { SWInput } from "@/components/reuseComponents/SWInput";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, imageUrl } from "@/api/apiConfig";
import { toBengaliNumber } from "bengali-number";
import axios from "axios";
import { headers } from "@/api/auth";

const MiddleHeader = ({ settings }) => {
  const [totalShop, setTotalShop] = useState(0);
  const [totalBrand, setTotalBrand] = useState(0);
  const [totalWishList, setTotalWishList] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userlocal = localStorage.getItem('user');
      const user = JSON.parse(userlocal);
      if (user) {
        getTotalWishList(user);
      }
    }
    getTotalShop();
    getTotalBrand();
  }, [])

  const getTotalShop = async () => {
    try {
      const response = await axios.get(`${baseUrl}/totalProduct`);
      setTotalShop(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  const getTotalBrand = async () => {
    try {
      const response = await axios.get(`${baseUrl}/totalBrand`);
      setTotalBrand(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  // const getTotalWishList = async (user) => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/totalWishList/${user.id}`, { headers: headers });
  //     setTotalWishList(response.data);
  //   } catch (error) {
  //     console.error("Error fetching settings:", error);
  //   }
  // }
  const router = useRouter();
  const language = router.locale;
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  // const dispatch = useDispatch();
  const { t } = useTranslation('blog')
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
  const getTotalWishList = () => {
    return wishlist.reduce(
      (accumulator, item) => accumulator + eval(item.quantity),
      0
    );
  };
  return (
    <>
      <div className="sw__middle__header d_flex d_justify">
        {/* logo */}
        <div className="sw__logo">
          <Link href="/">
            <SWImages
              image={`${imageUrl}/uploads/${settings?.company_logo}`}
              width="250"
              height="80"
              alt="logo"
            />
          </Link>
        </div>
        {/* search */}
        <div className="sw__search">
          <SWInput
            type="text"
            placeholder={t("Search for products (e.g. eggs, milk, potato)")}
          />
          <button>
            <SearchSvg />
          </button>
        </div>
        {/* right */}
        <div className="sw__right">
          {settings?.shop_on_top === "1" && <div
            className={
              router.pathname == "/shop"
                ? "active sw__right__item"
                : "sw__right__item"
            }
          >
            <Link href={"/shop"}>
              <i className="flaticon-shop"></i>
              <P p={t('Shops')} />
              <span>{language === 'bn' ? toBengaliNumber(totalShop) : totalShop}</span>
            </Link>
          </div>}
          {settings?.brand_on_top === "1" && <div
            className={
              router.pathname == "/brand"
                ? "active sw__right__item"
                : "sw__right__item"
            }
          >
            <Link href={"/brand"}>
              <i className="flaticon-price"></i>
              <P p={t('Brands')} />
              <span>{language === 'bn' ? toBengaliNumber(totalBrand) : totalBrand}</span>
            </Link>
          </div>}
          {settings?.wishlist_on_top === "1" && <div
            className={
              router.pathname == "/wishlist"
                ? "active sw__right__item"
                : "sw__right__item"
            }
          >
            <Link href={"/wishlist"}>
              <i className="flaticon-heart"></i>
              <P p={t('Wishlist')} />
              <span>{language === 'bn' ? toBengaliNumber(getTotalWishList()) : getTotalWishList()}</span>
            </Link>
          </div>}
          {settings?.cart_on_top === "1" && <div
            className={
              router.pathname == "/cart"
                ? "active sw__right__item"
                : "sw__right__item"
            }
          >
            <Link href={"/cart"}>
              <i className="flaticon-online-shopping"></i>
              <P p={`৳ ${language === 'bn' ? toBengaliNumber(getTotalPrice().toFixed(2)) : getTotalPrice().toFixed(2)}`} />
              <span>{language === 'bn' ? toBengaliNumber(getTotal()) : getTotal()}</span>
            </Link>
          </div>}
        </div>
      </div>
    </>
  );
};

export default MiddleHeader;
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["highlights"])),
  },
});
