
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import Users from "./components/Users"

function App() {

  return (
    <>
      <h1>React App</h1>
      <Users />
    </>
  )
}

export default withAuthenticator(App)
