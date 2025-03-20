import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import RootLayout from "./components/RootLayout.tsx";
import { Theme } from "@radix-ui/themes";
import SignInSignUp from "./pages/signIn&signUp.tsx";
import {useSelector} from "react-redux";
import {UserRootState} from "./reducer/userSlice.ts";

function App() {
    const isAuthenticated = useSelector((state: UserRootState) => state.user.isAuthenticated);

    const routes = createBrowserRouter([
        {path: '/', element: <SignInSignUp/> },
        {
            path: '/dashboard',
            element: isAuthenticated ? <RootLayout/> : <SignInSignUp/>,
            children:[]
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
