import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { nanoid } from 'nanoid';
import SnakeGame from "../components/SnakeGame";

/* ----------  PAGE WRAPPER  ---------- */
const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
  padding-top: calc(var(--nav-height) + 2rem);
`;

/* ----------  GRID  ---------- */
const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

/* ----------  CARD  ---------- */
const BlogCard = styled(Link)`
  display: block;
  background: rgba(10, 25, 47, 0.55);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: #ccd6f6;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 255, 200, 0.18);
    border-color: rgba(100, 255, 218, 0.45);
  }
`;

const Thumbnail = styled.div`
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  padding: 1.4rem 1.6rem;

  h3 {
    margin: 0 0 0.4rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #e6f1ff;
  }

  .date {
    font-size: 0.9rem;
    color: #8892b0;
    margin-bottom: 0.8rem;
  }

  .readmore {
    margin-top: 1rem;
    color: #64ffda;
    font-size: 0.95rem;
    transition: 0.2s;

    &:hover {
      color: #00f5ff;
    }
  }
`;

/* ---------- SAFE IMAGE RESOLVER ---------- */
const resolveImage = (imageField) => {
  if (!imageField) return "/default.jpg";
  return imageField.publicURL || "/default.jpg";
};

/* ----------  COMPONENT  ---------- */
export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout isHome={false}>
      <SEO title="Blog" />
      <PageWrapper>
        <h1>Blog</h1>

        {/* ---------------------------------------------------
           TEMPORARY GAME SECTION — REMOVE WHEN NOT NEEDED
        --------------------------------------------------- */}
        <div style={{ margin: "2rem 0" }}>
          <SnakeGame />
        </div>

        {/* --------------------------------------------------- */}

        <BlogGrid>
          {posts.map(({ id, frontmatter, fields }) => {
            const uuid = nanoid(6);
            const imageUrl = resolveImage(frontmatter.image);

            return (
              <BlogCard key={id} to={`${fields.slug}?v=${uuid}`}>

                <Thumbnail style={{
                  backgroundImage: `url(${imageUrl})`
                }}/>

                <Content>
                  <h3>{frontmatter.title}</h3>
                  <p className="date">{frontmatter.date}</p>
                  <span className="readmore">Read more →</span>
                </Content>

              </BlogCard>
            );
          })}
        </BlogGrid>
      </PageWrapper>
    </Layout>
  );
}

/* ----------  GRAPHQL  ---------- */
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          image {
            publicURL
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
