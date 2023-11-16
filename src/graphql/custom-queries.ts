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

const SearchEditionsByISBN13 = `
query SearchEditionsByISBN13($isbn_13: String!) {
  listEditions(filter: {isbn_13: {contains: $isbn_13}}) {
    items {
      id
      authors {
        name
      }
      title
    }
  }
}
`

export { listEditionsIncludeOwningUsers, SearchEditionsByISBN13 }