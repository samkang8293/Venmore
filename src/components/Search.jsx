import { useState, useEffect } from 'react'

const Search = () => {
    const [input, setInput] = useState("")
    const [result, setResult] = useState([])

    useEffect(() => {
        const getUsers = async (url) => {
            try {
                const res = await fetch(url)
                const status = await res.json()

                setResult(status)
            } catch(e) {
                console.log(e)
            }
        }
        getUsers('/users')
    }, [])

    const handleUsers = (user) => {
        setUsers((prevSelect) => {[...prevSelect, user]})
    }

    return (
        <>
            <div className="search-bar">
                <input type="text" name="search" placeholder="Username" value={input} onChange={(e) => {setInput(e.target.value)}} />
            </div>
            <div className="search-query">
                {result.map((user) => {
                    return <div key={user.id} onClick={()=> {handleUsers(user)}}>{user.username}</div>
                })}
            </div>
        </>
    )
}

export default Search