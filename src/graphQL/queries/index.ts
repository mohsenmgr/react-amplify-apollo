import gql from 'graphql-tag';



export const GET_TODOS = gql`
  query ListTodos {
   getTodos{
    
      id
      title
      description
      photo
     
    }
  }
`;


