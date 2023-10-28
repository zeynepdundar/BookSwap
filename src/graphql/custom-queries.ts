  const listEditionsIncludeOwningUsers = `
  query ListEditionsIncludeOwningUsers {
    listEditions {
      items {
        title
        authors {
          name
        }
        owningUsers {
          items {
            user {
              name
            }
          }
        }
        publishers
      }
    }
  }
`

export { listEditionsIncludeOwningUsers }