import { useState } from 'react'

const NavBar = () => {
    return (
        <>
            <div className="navbar">
                <ul className="menu">
                    <li className="menuItem" id="home"></li>
                    <li className="menuItem" id="payment"></li>
                    <li className='menuItem' id="user"></li>
                </ul>
            </div>
        </>
    )
}

export default NavBar