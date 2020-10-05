import { useState, useContext } from 'react'
import { formatMoney, attachNamesAndPrices } from '.'
import OrderContext from '../components/OrderContext'
import calculateOrderTotal from './calculateOrderTotal'
import { SERVERLESS_BASE } from '../constants'

export default ({ pizzasMap, values }) => {
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const addToOrder = orderedPizza => setOrder([...order, orderedPizza])

  const removeFromOrder = index =>
    setOrder([...order.slice(0, index), ...order.slice(index + 1)])

  const submitOrder = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    const body = {
      order: attachNamesAndPrices({ order, pizzasMap }),
      total: formatMoney(calculateOrderTotal({ order, pizzasMap })),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    }
    const res = await fetch(`${SERVERLESS_BASE}/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const text = JSON.parse(await res.text())
    setLoading(false)
    if (res.status >= 400 && res.status < 600) {
      setError(text.message)
    } else {
      setMessage('Success! Come on down for your pizza!')
    }
  }
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  }
}
