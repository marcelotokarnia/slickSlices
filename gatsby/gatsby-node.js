import path from 'path'

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

export const createPages = async params => {
  await turnPizzasIntoPages(params)
  // await turnToppingsIntoPages(params)
  // await turnSliceMastersIntoPages(params)
}
