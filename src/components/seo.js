import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const query = graphql`
  {
    site {
      siteMetadata {
        siteDescription: description
        siteTitle: title
        siteUrl
        twitterUsername
        siteImage
      }
    }
  }
`;
export default function Seo({
  title,
  locale,
  description,
  children,
  url,
  image,
}) {
  const {
    site: {
      siteMetadata: {
        siteDescription,
        siteUrl,
        siteTitle,
        twitterUsername,
        siteImage,
      },
    },
  } = useStaticQuery(query);
  const metaDescription = description || siteDescription;
  const metaTitle = title || siteTitle;
  const metaUrl = url || siteUrl;
  const metaImage = image || `${siteUrl}${siteImage}`;
  return (
    <Helmet
      title={`${title} · ${siteTitle}`}
      htmlAttributes={locale ? { lang: locale } : { lang: "en-US" }}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: metaTitle,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: metaUrl,
        },
        {
          property: "twitter:card",
          content: "summary",
        },
        {
          property: "twitter:creator",
          content: twitterUsername,
        },
        {
          property: "twitter:image",
          content: metaImage,
        },
      ]}
    >
      {children}
    </Helmet>
  );
}
