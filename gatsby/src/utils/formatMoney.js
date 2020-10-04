const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
export default price => formatter.format(price / 100)
