const TransactionReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return [...state, action.payload];
        
        case "DELETE_TRANSACTION": {
            let remain = state.filter((value) => {
                return value.id != action.id
            })
            return remain
        }

        case "UPDATE_TRANSACTION": {
            let remain = state.filter((value) => {
                if (value.id === action.payload.id) {
                    value.amount = action.payload.amount
                    return value
                }
                else {
                    return value
                }
            })

            return remain;
        }
        
        default:
            return state;
    }
}

export default TransactionReducer;