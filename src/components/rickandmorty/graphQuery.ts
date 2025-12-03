import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacter($page: Int!) {
    characters(page: $page) {
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
