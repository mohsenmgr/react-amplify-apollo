import gql from "graphql-tag";

export const MakeTodo = gql`
  mutation makeTodo(
    $id: ID!
    $userId: String!
    $title: String!
    $done: Boolean
    $dueDate: AWSDateTime
    $description: String
    $photo: String
  ) {
    makeTodo(
      id: $id
      userId: $userId
      title: $title
      done: $done
      dueDate: $dueDate
      description: $description
      photo: $photo
    ) {
      id
      userId
      title
      description
      photo
      createdAt
      done
      dueDate
    }
  }
`;
