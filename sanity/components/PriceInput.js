import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)))

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format

const PriceInput = ({
  type: { title, description, name },
  onChange,
  value,
  inputComponent,
}) => (
  <div>
    <h2>
      {title} - {value ? formatMoney(value / 100) : ''}
    </h2>
    <p>{description}</p>
    <input
      type={name}
      value={value}
      onChange={event => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
)

PriceInput.focus = function () {
  this._inputElement.focus()
}

export default PriceInput
