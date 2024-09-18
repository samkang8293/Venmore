import { useState, useEffect } from 'react'
import '../App.css'

const NavBar = () => {
    const [user, setUser] = useState("")
    // if I'm retrieving user info, I'd have to do something with sessions and mongo
    useEffect(async () => {
        try {
            const res = await fetch('/login')
            const status = await res.json()

            if (status) {
                setUser(status.user)
            }
        } catch (e) {
            console.error(e)
        }
    }, [])
    return (
        <>
            <div className="navbar">
                <span className="">Venmore</span>
                <ul className="menu">
                    <li className="menuItem" id="payment">Make Payment</li>
                    {user ? (
                    <li className='menuItem' id="user">{user.name}</li>
                    ) : (
                        <li className='menuItem' id="login">Login</li>
                    )}
                </ul>
            </div>
        </>
    )
}
// add user avatar in navbar

export default NavBar