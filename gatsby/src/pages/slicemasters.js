import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`

const SliceMastersPage = ({
  data: {
    slicemasters: { nodes: slicemasters, totalCount },
  },
  pageContext: { currentPage = 1, pageSize = process.env.GATSBY_PAGE_SIZE },
}) => (
  <>
    <SEO title={`Slicemasters - Page ${currentPage}`} />
    <Pagination
      pageSize={pageSize}
      totalCount={totalCount}
      currentPage={currentPage}
      base="/slicemasters"
    />
    <SliceMasterGrid>
      {slicemasters.map(
        ({
          id,
          slug: { current: slug },
          name,
          image: {
            asset: { fluid },
          },
          description,
        }) => (
          <SliceMasterStyles key={id}>
            <Link to={`/slicemasters/${slug}`}>
              <h2>
                <span className="mark">{name}</span>
              </h2>
            </Link>
            <Img fluid={fluid} />
            <p className="description">{description}</p>
          </SliceMasterStyles>
        )
      )}
    </SliceMasterGrid>
  </>
)

export default SliceMastersPage

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
