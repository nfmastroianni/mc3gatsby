import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const postQuery = graphql`
  query Post($path: String!) {
    post: googleDocs(slug: { eq: $path }) {
      name
      slug
      cover {
        image {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
          }
        }
      }
      childMdx {
        body
        timeToRead
        excerpt
      }
      locale
      createdTime
      modifiedTime
    }
    site {
      siteMetadata {
        siteUrl
        siteImage
      }
    }
  }
`;

export default function PostTemplate({
  path,
  data: {
    post: {
      name,
      slug,
      cover,
      childMdx: { body, timeToRead, excerpt },
      locale,
      createdTime,
      modifiedTime,
    },
    site: {
      siteMetadata: { siteUrl, siteImage },
    },
  },
}) {
  return (
    <Layout path={path}>
      <Seo
        title={name}
        description={excerpt}
        locale={locale}
        url={`${siteUrl}${slug}`}
        image={
          cover
            ? `${siteUrl}${getImage(cover.image).images.fallback.src}`
            : `${siteUrl}${siteImage}`
        }
      />
      <article className="text-base md:text-lg lg:text-xl">
        <header className="relative bg-slate-900 w-screen -z-10 text-center">
          {cover && (
            <GatsbyImage
              image={getImage(cover.image)}
              className="inset-0 z-0 max-h-96 filter blur-sm"
              alt="decorative blog post banner"
            />
          )}
          <div
            className={
              cover
                ? "bg-slate-900 bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center"
                : "absolute inset-0 flex flex-col items-center justify-center"
            }
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold rounded-xl text-white px-3">
              {name}
            </h1>
            <h2 className="text-slate-50 text-sm my-1">
              {timeToRead} minute read
            </h2>
            <h2 className="text-sm text-slate-50 my-1">
              Last Updated:{" "}
              {new Date(modifiedTime).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
          </div>
        </header>
        <div className="mx-auto max-w-screen-md py-2 sm:py-3 md:py-4 lg:py-5 px-3 sm:px-4 md:px-6 lg:px-8 prose prose-blue prose-lg md:prose-xl lg:prose-2xl">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  );
}
