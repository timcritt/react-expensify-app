import selectExpenses from '../selectors/expenses'

export default (expenses) => { 
    return expenses
        .map( (expense) => expense.amount)
        .reduce( (total, amount) => total + amount, 0)

    // the above is the equivalent of the below
    //    const amountsArray = expenses.map( (expense) => {
    //         return expense.amount 
    //    })

    //    return amountsArray.reduce( (total, amount) => {
    //        return total + amount;
    //    })
};