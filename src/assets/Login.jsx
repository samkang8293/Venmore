import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (evt) => {

    }

    return (
        <>
            <div className="login">
                <h1>Log In</h1>
                <input/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default Login