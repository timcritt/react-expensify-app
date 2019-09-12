const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE' :
            return [
                ...state,   //example of spread operator. Doesn't affect orginal array
                action.expense
            ];
        case 'REMOVE_EXPENSE' :
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE' :
            return state.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                    ...expense, 
                    ...action.updates
                    }    
                } else {
                    return expense;
                }
            })
        default: 
            return state;
    }
};

export default expensesReducer;