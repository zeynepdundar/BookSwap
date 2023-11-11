  const listEditionsIncludeOwningUsers = `
  query ListEditionsIncludeOwningUsers {
    listEditions {
      items {
        id
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
        isbn_13
      }
    }
  }
`

export { listEditionsIncludeOwningUsers }