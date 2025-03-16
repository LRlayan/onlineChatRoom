import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import { Theme } from "@radix-ui/themes";

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
        <Theme appearance="dark">
            <RouterProvider router={routes}/>
        </Theme>
    </>
  )
}

export default App
