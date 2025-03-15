import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";

function App() {

  const routes = createBrowserRouter([
      {
      path: '/',
        element: <RootLayout/>,
          children:[

          ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
