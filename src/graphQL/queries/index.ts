import gql from "graphql-tag";

export const GET_TODOS = gql`
  query ListTodos($userId: String!) {
    getTodos(userId: $userId) {
      id
      userId
      title
      description
      photo
      createdAt
      updatedAt
      owner
    }
  }
`;
