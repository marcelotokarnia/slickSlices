import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

const PizzaPage = ({
  data: {
    pizzas: { nodes: pizzas },
  },
  pageContext: { topping },
}) => (
  <>
    <ToppingsFilter activeTopping={topping} />
    <PizzaList pizzas={pizzas} />
  </>
)

export default PizzaPage

export const query = graphql`
  query PizzaQuery($topping: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
