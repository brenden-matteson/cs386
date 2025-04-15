const { hourly } = require('../SimpleCents/expense-tracker/income.js');

test("hourly worker valid input", async () => {
    const mock = new hourly(17.40, 20);
    expect(mock.totalAnnualIncome).toBe(18096);
});

test("hourly worker invalid input", async () => {
    const mock = new hourly(17.40, );
    expect(mock.totalAnnualIncome).toBe(0);
});