const { monthly } = require('../SimpleCents/expense-tracker/expense.js');

let mockMonthlyOne = [
    { name: "Groceries:", value: 200 },
    { name: "Rent/Mortgage:", value: 600 },
    { name: "Utilities:", value: 60 },
    { name: "Subscriptions:", value: 25 },
    { name: "Auto Insurance:", value: 0 },
    { name: "Clothing:", value: 50 },
    { name: "Entertainment:", value: 100 },
    { name: "Takeout:", value: 150 }
];

let mockMonthlyTwo = [
    { name: "Groceries:", value: -5 },
    { name: "Rent/Mortgage:", value: 600 },
    { name: "Utilities:", value: 60 },
    { name: "Subscriptions:", value: 25 },
    { name: "Auto Insurance:", value: 0 },
    { name: "Clothing:", value: 50 },
    { name: "Entertainment:", value: 100 },
    { name: "Takeout:", value: 150 }
];

test('adds monthly expenses to be 14,220 with valid input', () => {
    const monthlyObj = new monthly(mockMonthlyOne);
    expect(monthlyObj.totalAnnualExpenses).toBe(14220);
})

test('adds monthly expenses to be 11820 with invalid input', () => {
    const monthlyObj = new monthly(mockMonthlyTwo);
    expect(monthlyObj.totalAnnualExpenses).toBe(11820);
})

