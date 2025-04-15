const { monthly, semiAnnually, annually } = require('../SimpleCents/expense-tracker/expense.js');

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

test('adds monthly expenses to be 14,220', () => {
    const monthlyObj = new monthly(monthlyExpenses);
    expect(monthlyObj.totalAnnualExpenses).toBe(14220);
})

test('adds semi annual expenses to be 16,120', () => {
    const semiAnnualObj = new semiAnnually(semiAnnualExpenses);
    expect(semiAnnualObj.totalAnnualExpenses).toBe(1800);
})

test('adds annual expenses to be 16,120', () => {
    const annualObj = new annually(annualExpenses);
    expect(annualObj.totalAnnualExpenses).toBe(100);
})

test('adds all expenses to be 16,120', () => {
    const monthlyObj = new monthly(monthlyExpenses);
    const semiAnnualObj = new semiAnnually(semiAnnualExpenses);
    const annualObj = new annually(annualExpenses);
    expect(monthlyObj.totalAnnualExpenses + semiAnnualObj.totalAnnualExpenses + annualObj.totalAnnualExpenses).toBe(16120);
})
