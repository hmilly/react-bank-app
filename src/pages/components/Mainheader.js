import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ch from "../img/CH.png"
import Settings from "./Settings"

const Mainheader = ({user}) => {
    const [showMenu, setShowMenu] = useState(false)
    let menu;
    if (showMenu) {
        menu = <Settings setMenu={setShowMenu} user={user} onClick={() => setShowMenu(true)} />
    }

    return (
        <>
            <div className="header">
                <div>
                    <img src={ch} alt="CH" className="ch"></img>
                </div>
                <ul>
                    <li>
                        <Link to="/wallet">WALLET</Link>
                    </li>
                    <li>
                        <Link to="/savings">SAVINGS</Link>
                    </li>
                    <li>
                        <Link to="/loans">LOANS</Link>
                    </li>
                    <li>
                        <button onClick={() => setShowMenu(!showMenu)} >SETTINGS</button>
                    </li>
                    <li>
                        <Link to="/">SIGN OUT</Link>
                    </li>
                </ul>
            </div>
            {menu}
        </>
    )
}

export default Mainheader
