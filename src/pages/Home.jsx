import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="feed">
                <h1>We are currently working on this feed. Stay Tuned!</h1>
            </div>
        </>
    )
}

export default Home