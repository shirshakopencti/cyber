import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/seo";

/* ---------- HEADER IMAGE ---------- */
const HeaderImage = styled.div`
  width: 100%;
  height: 320px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  margin-bottom: 2rem;
  background-repeat: no-repeat;
`;

/* ---------- POST CONTAINER ---------- */
const BlogPostContainer = styled.article`
  max-width: 900px;
  margin: 140px auto 80px;
  padding: 2rem 2.5rem;
  background: rgba(10, 25, 47, 0.55);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  color: #ccd6f6;
  line-height: 1.7;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);

  h1 {
    color: #64ffda;
    margin-bottom: 0.6rem;
    font-size: 2rem;
  }

  .date {
    color: #8892b0;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  p {
    margin-bottom: 1.2rem;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 0 15px rgba(0, 255, 200, 0.15);
  }

  a {
    color: #64ffda;
    border-bottom: 1px solid rgba(100, 255, 218, 0.4);
  }
`;

/* ---------- SAFE IMAGE RESOLVER ---------- */
const resolveImage = (imageField) => {
  if (!imageField) return "/default.jpg";
  return imageField.publicURL || "/default.jpg";
};

export default function BlogPost({ data }) {
  const { html, frontmatter } = data.markdownRemark;
  const headerImage = resolveImage(frontmatter.image);

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      {/* Page Header Image */}
      <HeaderImage style={{ backgroundImage: `url(${headerImage})` }} />

      <BlogPostContainer>
        <h1>{frontmatter.title}</h1>
        <p className="date">{frontmatter.date}</p>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPostContainer>
    </Layout>
  );
}

/* ---------- GRAPHQL ---------- */
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        description
        image {
          publicURL
        }
      }
    }
  }
`;
