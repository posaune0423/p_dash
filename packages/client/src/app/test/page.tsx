'use client'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useEffect } from 'react'
import { dojoConfig } from '../../../dojoConfig'

const Test = () => {
  useEffect(() => {
    const effect = async () => {
      const client = new ApolloClient({
        uri: `${dojoConfig.toriiUrl}/graphql`,
        cache: new InMemoryCache(),
      })

      const result = await client.query({
        query: gql(/* GraphQL */ `
          query GetAllApps {
            appModels(first: 1000) {
              totalCount
              edges {
                node {
                  system
                  name
                  manifest
                  icon
                  action
                  entity {
                    id
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `),
      })

      console.log(result)
    }

    effect()
  }, [])

  return <div>Test</div>
}

export default Test
