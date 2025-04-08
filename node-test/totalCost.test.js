const expenseTracker = require('../SimpleCents/expense-tracker/expenseTracker.js');

let expenses = {
    Groceries: 200,
    Rent: 600,
    Util: 60,
    Clothing: 100,
    Entertainment: 150,
    Food: 100
};

test('adds all expenses to be 1,210', () => {
    expect(expenseTracker.totalCost(expenses)).toBe(1210);
})
