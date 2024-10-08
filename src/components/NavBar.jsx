import { useState, useEffect } from 'react'
import '../App.css'

const NavBar = () => {
    const [user, setUser] = useState(null)
    // For payment option, add link to navigate to sending payment/request page
    useEffect(() => {
        const getUser = async (url) => {
            try {
                const res = await fetch(url)
                const status = await res.json()
    
                if (status) {
                    setUser(status.user)
                }
            } catch (e) {
                console.error(e)
            }
        }
        getUser('/login')
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