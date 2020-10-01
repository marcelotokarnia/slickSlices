import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`

const PizzaStyles = styled.div`
  display: grid;
  /* take your row styling not from the PizzaStyles div, but from the PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid;) {
    ---rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`

const SinglePizza = ({
  pizza: {
    name,
    slug: { current: slug },
    toppings,
    image: {
      asset: { fluid },
    },
  },
}) => (
  <PizzaStyles>
    <Link to={`/pizza/${slug}`}>
      <h2>
        <span className="mark">{name}</span>
      </h2>
    </Link>
    <p>{toppings.map(({ name: toppingName }) => toppingName).join(', ')}</p>
    <Img fluid={fluid} alt={name} />
  </PizzaStyles>
)

const PizzaList = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas.map(pizza => (
      <SinglePizza key={pizza.id} pizza={pizza} />
    ))}
  </PizzaGridStyles>
)

export default PizzaList
