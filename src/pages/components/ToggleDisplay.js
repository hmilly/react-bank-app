import React, { useState } from 'react'

function ToggleDisplay({ name, details, setDetails, updateUser, user }) {

    const [num, setNum] = useState(0)
    const handleNum = (n) => {
        return +parseFloat(n).toFixed(2)
    }

    // if (savingsTransfer.compName === "savings") {
    //     if (savingsTransfer.btnName === "in"){
    //         newTotBalance = handleNum(user.balance -= num)
    //         newTempBalance = handleNum(user.savingsBal += num)
    //         newTrans = [...user.transactions, { transName: "savings", minus: num }]
    //         newTempTrans = [...user.savingTran, { transName: "savings", plus: num }]
    //     } else {
    //         newTotBalance = handleNum(user.balance += num)
    //         newTempBalance = handleNum(user.savingsBal -= num)
    //         newTrans = [...user.transactions, { transName: "savings", plus: num }]
    //         newTempTrans = [...user.savingTran, { transName: "savings", minus: num }]
    //     }
    //     updateUser({
    //         ...user,
    //         balance: newTotBalance,
    //         savingsBal: newTempBalance,
    //         transactions: newTrans,
    //         savingTran: newTempTrans
    //     })
    // } 

    // if (savingsTransfer.compName === "loans") {
    //     if (savingsTransfer.btnName === "in"){
    //         newTotBalance = handleNum(user.balance += num)
    //         newTempBalance = handleNum(user.loansBal -= num)
    //         newTrans = [...user.transactions, { transName: "loan", plus: num }]
    //         newTempTrans = [...user.loansTran, { transName: "loan", minus: num }]
    //     } else {
    //         newTotBalance = handleNum(user.balance -= num)
    //         newTempBalance = handleNum(user.loansBal += num)
    //         newTrans = [...user.transactions, { transName: "loan", minus: num }]
    //         newTempTrans = [...user.loansTran, { transName: "loan", plus: num }]
    //     }
    //     updateUser({
    //         ...user,
    //         balance: newTotBalance,
    //         loansBal: newTempBalance,
    //         transactions: newTrans,
    //         loansTran: newTempTrans
    //     })
    // } 
    //}




    const handleSubmit = (e) => {
        e.preventDefault()

        // if (user) {
        //     (name === "savings")
        //         ? update("savings", user.savingsBal, savingsBal, savingTran)
        //         : update("loans", user.loansBal, loanBal, type)
        // }


        const update = (name, balance, balName, tranName) => {
            if (details.btnName === "in") {
                updateUser({
                    ...user,
                    balance: handleNum(user.balance -= num),
                    [balName]: handleNum(balance += num),
                    transactions: [...user.transactions, { transName: name, minus: num }],
                    [tranName]: [[...user.tranName, { transName: name, plus: num }]]
                })
            } else {
                updateUser({
                    ...user,
                    balance: handleNum(user.balance += num),
                    [balName]: handleNum(balance -= num),
                    transactions: [...user.transactions, { transName: name, plus: num }],
                    [tranName]: [[...user.tranName, { transName: name, minus: num }]]
                })
            }

        }
    }

    return (
        <div className="toggledButton" onClick={() => setDetails({ ...details, state: true })}>
            <form>
                <div>
                    <p>£</p>
                    <input
                        type="number"
                        min={0} step={0.01}
                        onChange={(e) => setNum(handleNum(e.target.value))}></input>
                </div>
                <button className="toggledTrans" onClick={(e) => handleSubmit(e)}>details</button>
            </form>
        </div>
    )
}

export default ToggleDisplay