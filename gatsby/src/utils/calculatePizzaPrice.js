export default ({ price, size }) =>
  price *
  {
    S: 0.75,
    M: 1,
    L: 1.25,
  }[size]
