require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `INSPIRATIQ`,
    description: `Shop art prints by @inspiratiq`,
    author: `James Liang and Marlene Liang`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: true,
        disableMinification: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Price'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `src/markdown-pages/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve : `gatsby-plugin-sharp`,
      options : {
	base64Width : 25,
      }
    },
    {
       resolve: `gatsby-plugin-manifest`,
       options: {
	 name: `Inspiratiq Shop`,
	 short_name: `Inspiratiq`,
	 start_url: `/`,
	 background_color: `#663399`,
	 theme_color: `#663399`,
	 display: `minimal-ui`,
	 icon: `src/images/queenicon.png`, // This path is relative to the root of the site.
       },
     },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    `gatsby-plugin-preact`,
     //'gatsby-plugin-offline',
  ],
}
