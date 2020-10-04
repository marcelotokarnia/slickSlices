import calculatePizzaPrice from './calculatePizzaPrice'

export default ({ order, pizzasMap }) =>
  order.reduce(
    (runningTotal, { id, size }) =>
      runningTotal + calculatePizzaPrice({ price: pizzasMap[id].price, size }),
    0
  )
