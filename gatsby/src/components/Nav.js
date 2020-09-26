import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Logo from './Logo'

// const goToSlicemasters = () => {
//   setTimeout(() => {
//     navigate('/slicemasters')
//   }, 2000)
// }

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizzas Menu</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
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
  </NavStyles>
)

export default Nav