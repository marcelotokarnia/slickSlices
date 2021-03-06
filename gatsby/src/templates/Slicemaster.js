import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from '../components/SEO'

const SlicemasterPage = ({
  data: {
    slicemaster: {
      name,
      description,
      image: {
        asset: { fluid },
      },
    },
  },
}) => (
  <>
    <SEO title={name} image={fluid.src} />
    <div className="center">
      <Img fluid={fluid} />
      <h2>
        <span className="mark">{name}</span>
        <p>{description}</p>
      </h2>
    </div>
  </>
)

export default SlicemasterPage

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
