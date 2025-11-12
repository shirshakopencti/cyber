import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function BlogPost({ data }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '4rem 2rem',
          lineHeight: 1.6,
        }}
      >
        <h1>{frontmatter.title}</h1>
        <p style={{ opacity: 0.7 }}>{frontmatter.date}</p>

        {/* the actual markdown body */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
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