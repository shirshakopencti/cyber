/* gatsby-node.js */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

/* ------------------------------------------------------------------ */
/* 1.  CREATE SLUG FIELD (runs first)                                 */
/* ------------------------------------------------------------------ */
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'blog' });
    actions.createNodeField({ node, name: 'slug', value: `/blog${slug}` });
  }
};

/* ------------------------------------------------------------------ */
/* 2.  CREATE PAGES (only ONE export)                                 */
/* ------------------------------------------------------------------ */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  /* ----------  BLOG POSTS  ---------- */
  const blogResult = await graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
        nodes {
          fields { slug }
        }
      }
    }
  `);
  if (blogResult.errors) return reporter.panic(blogResult.errors);

  blogResult.data.allMarkdownRemark.nodes.forEach(({ fields: { slug } }) => {
    createPage({
      path: slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: { slug },
    });
  });

  /* ----------  ORIGINAL POSTS (content/posts/)  ---------- */
  const postResult = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter { slug }
          }
        }
      }
    }
  `);
  if (postResult.errors) return reporter.panic(postResult.errors);

  const posts = postResult.data.postsRemark.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve('./src/templates/post.js'),
      context: {},
    });
  });

  /* ----------  TAG PAGES  ---------- */
  const tagResult = await graphql(`
    {
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  if (tagResult.errors) return reporter.panic(tagResult.errors);

  const tags = tagResult.data.tagsGroup.group;
  tags.forEach(tag => {
    createPage({
      path: `/pensieve/tags/${tag.fieldValue.replace(/\s+/g, '-').toLowerCase()}/`,
      component: path.resolve('./src/templates/tag.js'),
      context: { tag: tag.fieldValue },
    });
  });
};

/* ------------------------------------------------------------------ */
/* 3.  WEBPACK ALIASES & TYPE CUSTOMISATION (unchanged)               */
/* ------------------------------------------------------------------ */
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/, use: loaders.null() },
          { test: /miniraf/, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      cover: File @fileByRelativePath
      tech: [String]
      github: String
      external: String
      cta: String
      date: Date
    }
  `);
};