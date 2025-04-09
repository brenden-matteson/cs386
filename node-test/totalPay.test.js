const { hourly, salary, contract } = require('../SimpleCents/expense-tracker/expenseTracker.js');

test("hourly worker", async () => {
    const obj = new hourly(17.40, 20);
    const result = obj.totalPay();
    expect(result).toBe(18096);
});

test("salary worker", async () => {
    const obj = new salary(25000);
    const result = obj.totalPay();
    expect(result).toBe(25000);
});

test("contract worker", async () => {
    const obj = new contract([100, 100, 1000, 1000]);
    const result = obj.totalPay();
    expect(result).toBe(2200);
});
