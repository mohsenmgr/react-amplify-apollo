import gql from 'graphql-tag';



export const GET_TODOS = gql`
  query ListTodos {
   listTodos{
     items {
      id
      title
      description
      photo
     }
    }
  }
`;


