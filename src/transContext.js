import React, { createContext, useReducer } from "react";
import TransactionReducer from "./transReducer";

const initialTransaction = [
    {amount: 500, desc: "Cash", id: 1},
    {amount: -40, desc: "Book", id: 2},
    {amount: -200, desc: "Camera", id: 3}
]

export const TransactionContext = createContext(initialTransaction);

export const TransactionProvider = ({children}) => {
    let [state, dispatch] = useReducer(TransactionReducer, initialTransaction)
    
    let addTransaction = (transObj) => {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                amount: transObj.amount,
                desc: transObj.desc,
                id: transObj.id
            }
        })
    }

    let deleteTransaction = (transObj) => {
        dispatch({
            type: "DELETE_TRANSACTION",
            id: transObj.id
        })
    }

    let updateTransaction = (transObj) => {
        dispatch ({
            type: "UPDATE_TRANSACTION",
            payload: {
                amount: transObj.amount,
                desc: transObj.desc,
                id: transObj.id,
            }
        })
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction,
            deleteTransaction,
            updateTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}