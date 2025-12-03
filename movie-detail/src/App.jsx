import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './route'
import SuccessAlert from './common/SuccessAlert'

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <SuccessAlert />
    </>
  )
}

export default App
