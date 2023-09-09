import React from 'react'
import { Link } from 'react-router-dom'

function NavLinks(props) {
    let my_class = "background-color: #1c6156;  ";
    const my_styles = {
        color: "#fff",
        textDecoration: "none",
    };
    const nav_styles = {
        backgroundColor: "#2d0733",
        fontFamily: "arial",
        fontWeight: "bold"

    };
    return (
        <li className="nav-item">
            <Link className="nav-link" style={my_styles} to={`/${props.path} `}>
                {props.name}
            </Link>
        </li>
    )
}

export default NavLinks
