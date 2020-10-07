import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current] {
      color: var(--red);
    }
    &[disabled] {
      color: var(--grey);
      pointer-events: none;
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`

const Pagination = ({ pageSize, totalCount, currentPage, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasNextPage = nextPage <= totalPages
  const hasPrevPage = prevPage >= 1
  return (
    <PaginationStyles>
      <Link
        disabled={!hasPrevPage}
        title="Prev Page"
        to={`${base}${prevPage !== 1 ? `/${prevPage}` : ''}`}
      >
        ← <span className="word">Prev</span>
      </Link>
      {[...Array(totalPages).keys()].map(i => (
        <Link to={`${base}${i > 0 ? `/${i + 1}` : ''}`} key={`page-${i}`}>
          {i + 1}
        </Link>
      ))}
      <Link
        title="Next Page"
        disabled={!hasNextPage}
        to={`${base}/${nextPage}`}
      >
        <span className="word">Next</span> →
      </Link>
    </PaginationStyles>
  )
}

export default Pagination
