/* src/pages/blog.js  –  drop-in redesign */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

/* ----------  LAYOUT WRAPPER  ---------- */
const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

/* ----------  GRID  ---------- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

/* ----------  CARD  ----------
   Pick ONE of the four blocks below and delete the rest.
------------------------------------------------------------------ */

/* 1  Neon-Halo Card  ---------------------------------------------
const Card = styled(Link)`
  position: relative;
  background: #0a192f;
  border: 1px solid #64ffda;
  border-radius: 12px;
  padding: 1.8rem;
  text-decoration: none;
  color: #ccd6f6;
  transition: transform .25s, box-shadow .25s;
  overflow: hidden;
  &::before{
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(from 180deg at 50% 50%, #64ffda, #0a192f, #64ffda);
    z-index: -1;
    filter: blur(8px);
    opacity: 0;
    transition: opacity .25s;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(100,255,218,.24);
    &::before{ opacity: .7; }
  }
`;
------------------------------------------------------------------ */

/* 2  Glass-morphism Card  ----------------------------------------
const Card = styled(Link)`
  background: rgba(10, 25, 47, .55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, .18);
  border-radius: 16px;
  padding: 1.8rem;
  text-decoration: none;
  color: #ccd6f6;
  transition: transform .25s, background .25s;
  &:hover {
    transform: translateY(-4px);
    background: rgba(10, 25, 47, .75);
  }
`;
------------------------------------------------------------------ */

/* 3  Retro-Terminal Card  ----------------------------------------
const Card = styled(Link)`
  background: #000;
  border-left: 4px solid #64ffda;
  padding: 1.5rem 1.8rem;
  text-decoration: none;
  color: #64ffda;
  font-family: 'Courier New', monospace;
  transition: transform .2s, color .2s;
  box-shadow: 2px 2px 0 #64ffda;
  &:hover {
    transform: translateY(-4px);
    color: #fff;
    box-shadow: 4px 4px 0 #64ffda;
  }
`;
------------------------------------------------------------------ */

/* 4  Minimal-Paper Card  ---------------------------------------- */
const Card = styled(Link)`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  color: #111827;
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0,0,0,.08);
  }
`;
/* ---------------------------------------------------------------- */

/* ----------  INNER CARD ELEMENTS  ---------- */
const Title = styled.h3`
  color: var(--green, #64ffda);
  margin: 0 0 .5rem;
`;

const Date = styled.small`
  opacity: .7;
`;

const Excerpt = styled.p`
  margin: .5rem 0 1rem;
  font-size: .9rem;
`;

/* ----------  COMPONENT  ---------- */
export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <SEO title="Blog" />
      <PageWrapper>
        <h1>Blog</h1>
        <Grid>
          {posts.map(({ id, frontmatter, fields }) => (
            <Card key={id} to={fields.slug}>
              <Title>{frontmatter.title}</Title>
              <Date>{frontmatter.date}</Date>
              <Excerpt>{frontmatter.description || ''}</Excerpt>
              <span aria-hidden style={{ color: 'var(--green)' }}>Read more →</span>
            </Card>
          ))}
        </Grid>
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
          description
        }
        fields { slug }
      }
    }
  }
`;