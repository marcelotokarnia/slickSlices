import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import SEO from '../components/SEO'

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

const SinglePizzaPage = ({
  data: {
    pizza: {
      name,
      image: {
        asset: { fluid },
      },
      toppings,
    },
  },
}) => (
  <>
    <SEO title={name} image={fluid.src} />
    <PizzaGrid>
      <Img fluid={fluid} />
      <div>
        <h2 className="mark">{name}</h2>
        <ul>
          {toppings.map(({ id, name: toppingName }) => (
            <li key={id}>{toppingName}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  </>
)

export default SinglePizzaPage

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`
