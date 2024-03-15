import { baseUrl } from "@/api/apiConfig";
import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import { H3, H4, P } from "@/components/reuseComponents/Tags";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Index = () => {
  const router = useRouter();
  const pages = router.query.pages;
  const [pageData, setPageData] = useState({})
  useEffect(() => {
    getPageBySlug();
  }, [pages]);
  const getPageBySlug = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getPageBySlug/${pages}`);
      if (response) {
        setPageData(response.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  return (
    <>
      <section className="sw__privecy__policy">
        {/* MetaTag */}
        <MetaHead metaTitle={pageData?.page_name} />
        {/* OthersBanner */}
        <OthersBanner
          title={pageData?.page_name}
          name="Home"
          subName={pageData?.page_name}
        />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <div className="sw__privecy__policy__content">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <div dangerouslySetInnerHTML={{ __html: pageData.page_text }} />
                {/* {pageData?.page_text} */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* sw__gaps */}
      <div className="sw__gaps"></div>
    </>
  );
};

export default Index;
