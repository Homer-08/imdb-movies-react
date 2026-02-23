import { NavLink } from "react-router-dom"
import cl from "./Navbar.module.css"

const Navbar = () => {
    const getNavLinkClassName = ({ isActive }) => {
        return `${cl.navLink} ${isActive ? cl.isActive : ""}`
    }
    return (
        <nav>
            <ul className={cl.navList}>
                <li>
                    <NavLink to={"/"} className={getNavLinkClassName}>
                        Movies
                    </NavLink>
                </li>
                <li>
                    
                    <NavLink to={"/actors"} className={getNavLinkClassName}>
                        Actors
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
