import { NavLink } from "react-router-dom"
import InputFile from "../InputFile/InputFile"
import cl from "./Header.module.css"
import Navbar from "../Navbar/Navbar"

const Header = () => {
    return (
        <header className={cl.header}>
            <h1>More Information</h1>
            <Navbar />
            <InputFile id="inputFile" />
        </header>
    )
}

export default Header
