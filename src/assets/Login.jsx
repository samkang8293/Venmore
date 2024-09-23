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
                <h1>Log In</h1>
                <input type="text" name="username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="register">
                <h4>Register</h4>
            </div>
        </>
    )
}

export default Login