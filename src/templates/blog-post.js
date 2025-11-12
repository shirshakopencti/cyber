import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPostContainer = styled.article`
  max-width: 900px;
  margin: 140px auto 100px;
  padding: 2rem 2.5rem;
  background: rgba(10, 25, 47, 0.55);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ccd6f6;
  line-height: 1.7;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 200, 0.2);
  }

  h1 {
    color: #64ffda;
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #a8b2d1;
    margin-bottom: 1.5rem;
  }

  a {
    color: #64ffda;
    text-decoration: none;
    border-bottom: 1px solid rgba(100, 255, 218, 0.4);
    transition: color 0.3s, border-color 0.3s;
  }

  a:hover {
    color: #00f5ff;
    border-color: #00f5ff;
  }

  img {
    border-radius: 10px;
    margin: 2rem 0;
    max-width: 100%;
    box-shadow: 0 0 10px rgba(0, 255, 200, 0.15);
  }
`;

export default function BlogPost({ data }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <BlogPostContainer>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPostContainer>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`;
