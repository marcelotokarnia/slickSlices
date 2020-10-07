import React from 'react'
import { ItemsGrid, ItemStyles } from '../styles/Grids'

const ItemGrid = ({ items }) => (
  <ItemsGrid>
    {items.map(({ image, name, _id }) => (
      <ItemStyles key={_id}>
        <p>
          <span className="mark">{name}</span>
        </p>
        <img
          width="500"
          height="400"
          src={`${image.asset.url}?w=500&h=400&fit=crop`}
          alt={name}
          style={{
            background: `url(${image.asset.metadata.lqip})`,
            backgroundSize: 'cover',
          }}
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
)

export default ItemGrid
