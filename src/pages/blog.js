import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import Head from '../components/head';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  background: var(--light-navy);
  border: 1px solid var(--green);
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: var(--slate);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  color: var(--green);
  margin-bottom: 0.5rem;
`;

const Excerpt = styled.p`
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
`;

const Date = styled.small`
  opacity: 0.7;
`;

const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export default function BlogIndex({ data, location }) {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location}>
      <Head title="Blog" />
      <PageWrapper>
        <h1>Blog</h1>
        <Grid>
          {posts.map(({ id, frontmatter, excerpt, fileAbsolutePath }) => {
            const slug = `/blog/${fileAbsolutePath.split('/').pop().replace('.md', '')}/`;
            return (
              <Card key={id} to={slug}>
                <Title>{frontmatter.title}</Title>
                <Date>{frontmatter.date}</Date>
                <Excerpt>{excerpt}</Excerpt>
                <span style={{ color: 'var(--green)' }}>Read more →</span>
              </Card>
            );
          })}
        </Grid>
      </PageWrapper>
    </Layout>
  );
}

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
        }
        excerpt(pruneLength: 120)
        fileAbsolutePath
      }
    }
  }
`;