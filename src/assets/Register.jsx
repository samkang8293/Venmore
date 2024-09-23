import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)

    const handleRegister = () => {

    }

    return (
        <>
            <div className="register">
                <h1>Sign Up</h1>
                <h3>Fill in the information below</h3>
                <input type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleRegister}>Sign Up</button>
            </div>
        </>
    )
}