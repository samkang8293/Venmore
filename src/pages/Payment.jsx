import { useState } from 'react'

const Payment = () => {
    const [users, setUsers] = useState([])
    const [amount, setAmount] = useState(0)
    const [comment, setComment] = useState(null)

    return (
        <>
            <div className="payment">
                <div className="">
                    <input type="text" name="search" placeholder="Username" />
                </div>
                <div className="">
                    <label forHTML="amount">$</label>
                    <input type="number" name="amount" placeholder="Amount" />
                </div>
                <div className="">
                    <input type="text" name="comment" placeholder="What's this for?" />
                </div>
                <button>Pay</button>
                <button>Request</button>
            </div>
        </>
    )
}

export default Payment