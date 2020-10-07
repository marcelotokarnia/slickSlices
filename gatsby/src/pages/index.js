import React from 'react'
import { useLatestData } from '../utils'
import { HomePageGrid } from '../styles/Grids'
import LoadingGrid from '../components/LoadingGrid'
import ItemGrid from '../components/ItemGrid'

const Slicemasters = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters on</span>
    </h2>
    <p>Standing by, ready to slice you up!</p>
    <CurrentlySlicing slicemasters={slicemasters} />
  </div>
)

const PizzaCase = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Come on by, buy the slice!</p>
    <HotSlices hotSlices={hotSlices} />
  </div>
)

const CurrentlySlicing = ({ slicemasters }) => {
  if (!slicemasters) {
    return (
      <div>
        <LoadingGrid count={4} />
      </div>
    )
  }
  return (
    <div>
      {slicemasters.length ? (
        <ItemGrid items={slicemasters} />
      ) : (
        <p>No one is working right now!</p>
      )}
    </div>
  )
}
const HotSlices = ({ hotSlices }) => {
  if (!hotSlices) {
    return (
      <div>
        <LoadingGrid count={4} />
      </div>
    )
  }
  return (
    <div>
      {hotSlices.length ? (
        <ItemGrid items={hotSlices} />
      ) : (
        <p>Nothing in the case!</p>
      )}
    </div>
  )
}

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData()
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <Slicemasters slicemasters={slicemasters} />
        <PizzaCase hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  )
}

export default HomePage
