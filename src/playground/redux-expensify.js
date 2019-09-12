import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';
//import EditExpensePage from '../components/EditExpensePage';

// ACTIONS TO CREATE
// add expense

const addExpense = (
    { 
        description ='', 
        note ='', 
        amount = 0, 
        createdAt = 0
    } = {}
)=> ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// remove an expense
const removeExpense = ({ id = {}}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// edit expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// set text filter
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// sort by date
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
})

// sort by amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
})

// set start date
const setStartDate =(startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

// set end date
const setEndDate =(endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//EXPENSES REDUCER  (departments)

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

//FILTERS REDUCER

const filtersReducerDefaultState = {
    text: '', 
    sortBy: 'date', //date or amount
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER' :
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT' :
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE' :
                return {
                    ...sate,
                    sortBy: 'date'
                }
        case 'SET_START_DATE' :
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE' :
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}
// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter( (expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= startDate;
        const textMatch = typeof text === 'string' && expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

//store creation (the "company")

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses)
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}))

//store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
//store.dispatch(setEndDate(999))


const demoState = {
    expenses: [{
        id: '',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent', 
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
