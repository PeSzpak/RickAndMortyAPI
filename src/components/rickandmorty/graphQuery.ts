import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacter($page: Int!, $name: String) {
    characters(page: $page, filter: {name: $name}) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
        episode {
          name
        }
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

