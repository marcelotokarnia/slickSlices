import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from '../components/SEO'
import { useForm, calculatePizzaPrice, formatMoney } from '../utils'
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from '../styles/MenuItemStyles'

const OrderPage = ({
  data: {
    pizzas: { nodes: pizzas },
  },
}) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  })
  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={updateValue}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={updateValue}
            value={values.email}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map(({ id, name, price, image: { asset: { fluid } } }) => (
            <MenuItemStyles key={id}>
              <Img width="50" height="50" fluid={fluid} alt={name} />
              <div>
                <h2>{name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button type="button" key={size}>
                    {size} {formatMoney(calculatePizzaPrice({ price, size }))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </OrderStyles>
    </>
  )
}

export default OrderPage

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
