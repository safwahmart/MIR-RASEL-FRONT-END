import Layout from "@/components/layout/Layout";
import { SessionProvider } from "next-auth/react";

// Css
import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/common.css";
import "@/styles/globals.css";
import "@/styles/media.css";

// Icons
import "../../public/icons/flaticon_safwah.css";

// Components
import MetaHead from "@/utilities/MetaHead";

// Skeleton for loading
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import store from "../redux/store";



const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Toaster />
          {/* <MetaHead metaTitle="" /> */}
          <Layout>
            {loading ? (
              <div className="sw__form__data__item">
                <Skeleton height={300} />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
            <ScrollToTop
              smooth
              component={<i className="flaticon-caret-arrow-up"></i>}
            />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default appWithTranslation(App);
