import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { indexBy, prop } from 'ramda'
import SEO from '../components/SEO'
import {
  useForm,
  calculatePizzaPrice,
  formatMoney,
  usePizza,
  calculateOrderTotal,
} from '../utils'
import OrderStyles from '../styles/OrderStyles'
import MenuItemStyles from '../styles/MenuItemStyles'
import PizzaOrder from '../components/PizzaOrder'

const OrderPage = ({
  data: {
    pizzas: { nodes: pizzas },
  },
}) => {
  const pizzasMap = indexBy(prop('id'))(pizzas)
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  })
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzasMap,
    values,
  })

  if (message) {
    return <p>{message}</p>
  }

  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={updateValue}
            value={values.email}
          />
          <input
            type="text"
            name="mapleSyrup"
            id="mapleSyrup"
            onChange={updateValue}
            value={values.email}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map(({ id, name, price, image: { asset: { fluid } } }) => (
            <MenuItemStyles key={id}>
              <Img width="50" height="50" fluid={fluid} alt={name} />
              <div>
                <h2>{name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice({ price, size }))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzasMap={pizzasMap}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your total is{' '}
            {formatMoney(calculateOrderTotal({ order, pizzasMap }))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading} onClick={submitOrder}>
            {loading ? 'Placing Order...' : 'Order ahead'}
          </button>
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
