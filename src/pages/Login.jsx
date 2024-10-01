import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (evt) => {
        try {
            // validate login information to backend
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            // await login status
            const status = await res.json()

            if (status.user) {
                // navigate to the main page
                window.location.href('/')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="login rounded-md border-gray-200">
                <h1>Venmore</h1>
                <h2>Log In</h2>
                <div className="py-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="text" name="username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="pb-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="register py-2.5">
                <a href="/register">Register</a>
            </div>
        </>
    )
}

export default Login