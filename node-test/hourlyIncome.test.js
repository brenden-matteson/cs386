const { hourly } = require('../SimpleCents/expense-tracker/income.js');

test("hourly worker valid input", async () => {
    const obj = new hourly(17.40, 20);
    const result = obj.totalAnnualIncome;
    expect(result).toBe(18096);
});

test("hourly worker invalid input", async () => {
    const obj = new hourly(17.40, );
    const result = obj.totalAnnualIncome;
    expect(result).toBe(0);
});