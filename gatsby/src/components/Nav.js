import React from 'react'
import { Link } from 'gatsby'

// const goToSlicemasters = () => {
//   setTimeout(() => {
//     navigate('/slicemasters')
//   }, 2000)
// }

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizzas Menu</Link>
      </li>
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/slicemasters">SliceMasters Menu</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead!</Link>
      </li>
      {/* <li>
          <button type="button" onClick={goToSlicemasters}>
            SliceMasters after 2 seconds
          </button>
        </li> */}
    </ul>
  </nav>
)

export default Nav
