import { useState } from 'react'

export default defaults => {
  const [values, setValues] = useState(defaults)

  const updateValue = e => {
    let { value } = e.target
    if (e.target.type === 'number') {
      value = parseInt(e.target.value)
    }
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }
  return { values, updateValue }
}
