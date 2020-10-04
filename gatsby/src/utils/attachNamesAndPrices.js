import formatMoney from './formatMoney'
import calculatePizzaPrice from './calculatePizzaPrice'

export default ({ order, pizzasMap }) =>
  order.map(({ id, size }) => {
    const {
      name,
      image: {
        asset: {
          fluid: { src: thumbnail },
        },
      },
      price,
    } = pizzasMap[id]
    return {
      id,
      size,
      name,
      thumbnail,
      price: formatMoney(calculatePizzaPrice({ price, size })),
    }
  })
