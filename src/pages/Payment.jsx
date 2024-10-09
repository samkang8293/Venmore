import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Search from '../components/Search'

const Payment = () => {
    const socket = io()

    const [user, setUser] = useState(null)
    const [recipients, setRecipients] = useState([])
    const [amount, setAmount] = useState(0)
    const [comment, setComment] = useState(null)

    useEffect(() => {
        const getUser = async (url) => {
            try {
                const res = await fetch(url)
                const status = await res.json()

                setUser(status)
            } catch(e) {
                console.log(e)
            }
        }
        getUser('/login')
    }, [])

    const handleRequest = async (evt) => {
        const res = await fetch('/payment/request', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                paymentType: 'Request',
                comment: comment,
                amount: amount,
                receiver: recipients
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const status = await res.json()

        if (status) {
            window.location.href('/')
            alert("Request sent!")
        }
    }

    return (
        <>
            <div className="payment">
                {/* set setUsers property in SearchBar component */}
                <Search />
                <div className="">
                    <label forHTML="amount">$</label>
                    <input type="number" name="amount" placeholder="Amount" onChange={(e) => {setAmount(e.target.value)}}/>
                </div>
                <div className="">
                    <input type="text" name="comment" placeholder="What's this for?" onChange={(e) => {setComment(e.target.value)}}/>
                </div>
                <button>Pay</button>
                <button onClick={handleRequest}>Request</button>
            </div>
        </>
    )
}

export default Payment