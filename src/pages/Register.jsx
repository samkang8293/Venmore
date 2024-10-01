import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)

    const handleRegister = async (evt) => {
        const res = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                email: email
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const status = await res.json()

        if (status.user) {
            window.location.href('/')
        }
    }

    return (
        <>
            <div className="register">
                <h1>Sign Up</h1>
                <h3>Fill in the information below</h3>
                <div className="py-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="py-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="py-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="register py-2.5">
                    <input className="flexbox center h-14 rounded-md border border-gray-300" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={handleRegister}>Sign Up</button>
            </div>
        </>
    )
}

export default Register