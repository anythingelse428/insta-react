import { Route, Routes } from "react-router-dom"
import ContentModal from "./components/ContentModal"
import Navigation from "./components/Navigation"

import MainPage from "./view/MainPage"
import UserProfile from "./view/UserProfile"
function App(){
    return <>
    <Navigation />
    <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/user/:user" element={<UserProfile/>} />

    </Routes>
    <ContentModal />
    </>
}
export default App