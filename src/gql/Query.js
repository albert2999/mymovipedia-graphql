import { gql } from "@apollo/client";

// export const test = gql`
//   query getGen3 {
//     pokemon_v2_pokemonspecies(
//       order_by: { id: asc }
//       where: { pokemon_v2_generation: { name: { _eq: "generation-iii" } } }
//     ) {
//       name
//       id
//     }
//   }
// `;

export const GET_MOVIES = gql`
  query {
    movies {
      id
      name
      genre
      actor {
        name
        id
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      name
      genre
      actor {
        name
        age
        id
      }
    }
  }
`;

export const GET_ACTORS = gql`
  query {
    actors {
      id
      name
      age
      movies {
        name
        genre
        id
      }
    }
  }
`;
