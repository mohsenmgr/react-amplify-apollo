import gql from "graphql-tag";

export const MakeTodo = gql`
  mutation makeTodo(
    $id: ID!
    $userId: String!
    $title: String!
    $description: String
    $photo: String
  ) {
    makeTodo(
      id: $id
      userId: $userId
      title: $title
      description: $description
      photo: $photo
    ) {
      id
      userId
      title
      description
      photo
    }
  }
`;
