import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SnakeGame from '../components/SnakeGame';

/* ----------  PAGE WRAPPER  ---------- */
const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  padding-top: calc(var(--nav-height) + 4rem);
  text-align: center;
  color: #ccd6f6;
`;

/* ----------  MESSAGE  ---------- */
const Message = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.6rem;
  color: #64ffda;
  font-weight: 600;
`;

export default function BlogIndex() {
  return (
    <Layout isHome={false}>
      <SEO title="Blog" />

      <PageWrapper>

        <Message>
          We're building something awesome!  
          Play a quick game while you wait 🎮
        </Message>

        <SnakeGame />

      </PageWrapper>
    </Layout>
  );
}
