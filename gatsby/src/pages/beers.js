import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/SEO'

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contained;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`

const BeersPage = ({
  data: {
    beers: { nodes: beers },
  },
}) => (
  <>
    <SEO title={`Beers! We have ${beers.length} in stock`} />
    <h2 className="center">
      We have {beers.length} Beers Available. Dine in Only!
    </h2>
    <BeerGridStyles>
      {beers.map(({ id, image, name, price, rating: { average, reviews } }) => {
        const rating = Math.round(average)
        return (
          <SingleBeerStyles key={id}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            {price}
            <p title={`${average.toFixed(2)} out of 5 stars`}>
              {`⭐️`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐️`.repeat(5 - rating)}
              </span>
              <span>({reviews})</span>
            </p>
          </SingleBeerStyles>
        )
      })}
    </BeerGridStyles>
  </>
)

export default BeersPage

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`
