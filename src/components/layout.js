import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const isBrowser = typeof window !== 'undefined';
const safeLocation = isBrowser ? window.location : { hash: '' };

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location, isHome: explicitIsHome }) => {
  // 1.  use explicit prop if given, else compute from location
  const detectedIsHome = location?.pathname === '/';
  const isHome = explicitIsHome !== undefined ? explicitIsHome : detectedIsHome;

  const [isLoading, setIsLoading] = useState(isHome);

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (safeLocation.hash) {
      const id = safeLocation.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />
      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  isHome: PropTypes.bool,          // <-- new
};

export default Layout;