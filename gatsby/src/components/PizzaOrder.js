import React from 'react'
import Img from 'gatsby-image'
import MenuItemStyles from '../styles/MenuItemStyles'
import { calculatePizzaPrice, formatMoney } from '../utils'

const PizzaOrder = ({ order, pizzasMap, removeFromOrder }) => (
  <>
    {order.map(({ id, size }, idx) => {
      const {
        name,
        price,
        image: {
          asset: { fluid },
        },
      } = pizzasMap[id]
      return (
        <MenuItemStyles key={idx}>
          <Img fluid={fluid} />
          <h2>{name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice({ price, size }))}
            <button
              type="button"
              className="remove"
              title={`Remove ${size} ${name} from Order`}
              onClick={() => removeFromOrder(idx)}
            >
              &times;
            </button>
          </p>
        </MenuItemStyles>
      )
    })}
  </>
)

export default PizzaOrder
