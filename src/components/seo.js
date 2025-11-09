import React from 'react';
import PropTypes from 'prop-types';

export default function SEO({ title, description }) {
  const siteTitle = 'Shirshak Roy';   // ← your site title
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'A cyber-themed portfolio'} />
    </>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};