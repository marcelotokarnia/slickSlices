import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`

const countPizzasInToppings = ({ toppings, pizzas }) =>
  Object.values(
    pizzas
      .flatMap(({ toppings: pizzaToppings }) => pizzaToppings)
      .reduce(
        (acc, { name, id }) => {
          console.log(acc)
          acc[id].count += 1
          return acc
        },
        toppings.reduce((accT, { name, id }) => {
          accT[id] = { count: 0, name, id }
          console.log(accT)
          return accT
        }, {})
      )
  ).sort(({ count: countA }, { count: countB }) => countB - countA)

const ToppingsFilter = () => {
  const {
    toppings: { nodes: toppings },
    pizzas: { nodes: pizzas },
  } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)
  const toppingsWithCounts = countPizzasInToppings({ toppings, pizzas })

  return (
    <ToppingsStyles>
      {toppingsWithCounts.map(({ name, count, id }) => (
        <Link to={`/topping/${name}`} key={id}>
          <span className="name">{name}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  )
}

export default ToppingsFilter
