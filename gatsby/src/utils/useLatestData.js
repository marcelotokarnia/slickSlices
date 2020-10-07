import { useState, useEffect } from 'react'

const ENDPOINT = 'https://ld4madjm.api.sanity.io/v1/graphql/production/default'
const gql = String.raw

const deets = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`

export default () => {
  const [hotSlices, setHotSlices] = useState()
  const [slicemasters, setSlicemasters] = useState()
  useEffect(() => {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        const {
          data: { StoreSettings },
        } = res
        setHotSlices(StoreSettings.hotSlices)
        setSlicemasters(StoreSettings.slicemaster)
      })
  }, [])
  return { hotSlices, slicemasters }
}
