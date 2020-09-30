import dotenv from 'dotenv'

dotenv.config()

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://pizzas.tokks.tech',
    description: 'The best pizza place',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'ld4madjm',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
