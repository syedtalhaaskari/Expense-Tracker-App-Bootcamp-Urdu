import React, { useContext, useState } from "react";
import { TransactionContext } from "./transContext";

let Child = () => {
    let {transactions, addTransaction, deleteTransaction, updateTransaction} = useContext(TransactionContext);
    let [newAmount, setAmount] = useState("");
    let [newDesc, setDesc] = useState("");

    let handleAddition = (event) => {
        event.preventDefault()
        addTransaction({
            amount: newAmount,
            desc: newDesc,
            id: transactions.length === 0 ? 1 : transactions[transactions.length - 1].id + 1
        })
        setDesc("")
        setAmount("")
    }

    let handleDeletion = (id) => {
        deleteTransaction({
            id
        })
    }

    let handleUpdate = (id) => {
        let updatedValue = prompt("Enter " + transactions[id - 1].desc + "'s updated value:", transactions[id - 1].amount)
        
        if (updatedValue === null) {
            return;
        }
        else if (+updatedValue !== +transactions[id - 1].amount) {
            updateTransaction({
                amount: +updatedValue,
                desc: transactions[id - 1].desc,
                id
            })
        }   
    }

    let getIncome = () => {
        let income = 0;
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0) {
                income += +transactions[i].amount
            }
        }
        return income
    }

    let getExpense = () => {
        let expense = 0;
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0) {
                expense += +transactions[i].amount
            }
        }
        return expense
    }

    let checkType = (amount) => {
        return amount >= 0 ? "green" : "red"
    }

    let getBalance = () => {
        return getIncome() + getExpense() >= 0 ? "green-font" : "red-font"
    }

    return (
        <div className="container">
            <h1 className="text-center">Expense Tracker<br /> By <br />Syed Talha Askari</h1>
            <h3>Your Balance: </h3>
            <h2 className={getBalance()}>${getIncome() + getExpense()}</h2>
            <div className="expense-container">
                <h3>INCOME <br/> <span className="green-font">${getIncome()}</span></h3>
                <h3>EXPENSE <br/> <span className="red-font">${getExpense()}</span></h3>
            </div>
            <h3>History</h3>
            <hr />
            <ul className="transaction-list">
                {
                    transactions.map((transObj, ind) => {
                        return (
                            <li key={ind} className={checkType(transObj.amount)}>
                                <span>{transObj.desc}</span>
                                <span>
                                    ${transObj.amount}
                                    &nbsp;
                                    <button onClick={(e) => {
                                        handleUpdate(transObj.id)
                                    }}>Update</button>
                                    &nbsp;
                                    <button onClick={() => handleDeletion(transObj.id)}>Delete</button>
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
            <h3>Add new Transaction</h3>
            <hr />
            <form className="transaction-form" onSubmit={handleAddition}>
                <label>
                    Enter Description <br/>
                    <input type="text" placeholder="Enter Description" required onChange={(ev) => setDesc(ev.target.value)} value={newDesc}/>
                </label>
                <br />
                <label>
                    Enter Amount <br/>
                    <input type="number" placeholder="Enter Amount" required onChange={(ev) => setAmount(ev.target.value)} value={newAmount}/>
                </label>
                <br/>
                <input type="submit" value="Add Transaction" />
            </form>
        </div>
    )
}

export default Child;