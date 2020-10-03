import path from 'path'
import fetch from 'isomorphic-fetch'

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  const {
    data: {
      toppings: { nodes: toppings },
    },
  } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `)
  toppings.forEach(({ name, id }) => {
    actions.createPage({
      path: `/topping/${name}`,
      component: toppingTemplate,
      context: {
        topping: name,
      },
    })
  })
}

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  const {
    data: {
      pizzas: { nodes: pizzas },
    },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)
  pizzas.forEach(({ slug: { current: slug } }) => {
    actions.createPage({
      path: `/pizza/${slug}`,
      component: pizzaTemplate,
      context: {
        slug,
      },
    })
  })
}

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // price name rating(average, reviews) image
  const beers = await (
    await fetch('https://sampleapis.com/beers/api/ale')
  ).json()
  beers.forEach(beer => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    }
    actions.createNode({
      ...beer,
      ...nodeMeta,
    })
  })
}

export const sourceNodes = async params => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export const createPages = async params => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    // turnSliceMastersIntoPages(params)
  ])
}
