import Head from "next/head";
import React from "react";
import { imageUrl } from "@/api/apiConfig";

const MetaHead = ({ metaTitle, settings, metaDesc, metaImage }) => {
  console.log("metadata", metaTitle, metaDesc, metaImage);
  return (
    <Head>
      <title>
        {settings?.company_name} |{metaTitle}
      </title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDesc} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />

      <meta property="og:image" content={metaImage} />
      <meta property="og:image" content={`${imageUrl}/files/${metaImage}`} />
      <meta
        property="og:image:secure_url"
        secure_url={`${imageUrl}/files/${metaImage}`}
      />
      <meta property="og:image:width" width="1200" />
      <meta property="og:image:height" width="630" />
      <meta property="og:image:type" width="image/jpg" />

      {/* twitter */}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={`${imageUrl}/files/${metaImage}`} />
      <meta name="twitter:card" content={`${imageUrl}/files/${metaImage}`} />

      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <link rel="icon" href={`${imageUrl}/uploads/${settings?.favicon_icon}`} />
    </Head>
  );
};

export default MetaHead;
