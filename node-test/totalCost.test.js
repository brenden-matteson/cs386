const { monthly, semiAnnually, annually } = require('../SimpleCents/expense-tracker/expenseTracker.js');

let monthlyExpenses = [
    { name: "Groceries:", value: 200 },
    { name: "Rent/Mortgage:", value: 600 },
    { name: "Utilities:", value: 60 },
    { name: "Subscriptions:", value: 25 },
    { name: "Auto Insurance:", value: 0 },
    { name: "Clothing:", value: 50 },
    { name: "Entertainment:", value: 100 },
    { name: "Takeout:", value: 150 }
];

let semiAnnualExpenses = [
    { name: "Auto Insurance:", value: 900 }
];

let annualExpenses = [
    { name: "Subscriptions:", value: 100 },
    { name: "Auto Insurance:", value: 0 }
];

test('adds all expenses to be 16,120', () => {
    const monthlyObj = new monthly(monthlyExpenses);
    const semiAnnualObj = new semiAnnually(semiAnnualExpenses);
    const annualObj = new annually(annualExpenses);
    expect(monthlyObj.totalAnnualExpenses + semiAnnualObj.totalAnnualExpenses + annualObj.totalAnnualExpenses).toBe(16120);
})
