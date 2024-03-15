import { baseUrl } from "@/api/apiConfig";
import OthersBanner from "@/components/commons/OthersBanner/OthersBanner";
import BlogDetails from "@/components/pageComponents/BlogPage/BlogDetails/BlogDetails";
import { Brand } from "@/components/pageComponents/BrandPage/Brand";
import BrandProduct from "@/components/pageComponents/BrandPage/BrandProduct";
import SubCategory from "@/components/pageComponents/Category/SubCategory/SubCategory";
import MetaHead from "@/utilities/MetaHead";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Index = () => {
  const search = useSearchParams();
  const articleValue = search.get("blog");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getArticleBySlug/${articleValue}`
      );
      if (response) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  return (
    <>
      <div className="sw__blog__details__page">
        {/* MetaTag */}
        <MetaHead metaTitle="Blog-Details" />
        {/* OthersBanner */}
        <OthersBanner
          title="Blog"
          name="Blog"
          subName={`Blog-Details / ${articles?.name}`}
        />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>

        <BlogDetails articles={articles} />

        {/* sw__gaps */}
        <div className="sw__gaps"></div>
      </div>
    </>
  );
};

export default Index;
