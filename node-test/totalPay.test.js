const expenseTracker = require('../SimpleCents/expense-tracker/expenseTracker.js');

test('multiplies 17.40 per hour for 20 hours to be 18,096', () => {
    expect(expenseTracker.totalPay(20, 17.40)).toBe(18096);
})
