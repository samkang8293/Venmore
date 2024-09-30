import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (evt) => {
        try {
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
            const status = await res.json()

            if (status.username === username && status.password === password) {
                // need to figure out what to do after login confirm
                alert("Login Success!")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="login">
                <h1>Venmore</h1>
                <h2>Log In</h2>
                <div className="py-2.5">
                    <input className="flexbox center h-14 rounded-md" type="text" name="username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="pb-2.5">
                    <input className="flexbox center h-14 rounded-md" type="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="register">
                <a href="/register">Register</a>
            </div>
        </>
    )
}

export default Login