import {createStore} from 'redux';


//ACTIONS
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy 
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET',
})

const setCount = ({count}) => ({
    type: 'SET',
    count 

})


//REDUCERS: SPECIFY HOW THE APPS STATES CHANGE IN RESPONSE TO THE ACTIONS
// 1. Reducers are pure functions - output is determined only by input (state and action)
//      not by any global variables
// 2. Never change state or action 
 
const countReducer =  createStore( (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: state.count = 0
            }
        default:
            return state;
    }    
}); 

const store = countReducer;

store.subscribe( () => {
    console.log(store.getState());
});

//CALLS
store.dispatch(incrementCount({incrementBy: 5}))
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(setCount({count: 101}));





