const { hourly, salary, contract } = require('../SimpleCents/expense-tracker/income.js');

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

test("multiple sources", async () => {
    const hourlyIncome = new hourly(17.40, 20);
    const salaryIncome = new salary(25000);
    const contractIncome = new contract([100, 100, 1000, 1000]);
    const result = hourlyIncome.totalPay() + salaryIncome.totalPay() + contractIncome.totalPay();
    expect(result).toBe(45296);
});
