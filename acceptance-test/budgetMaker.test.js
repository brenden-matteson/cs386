const Nightmare = require('nightmare');

let nightmare;

describe('My Nightmare Tests', () => {
    beforeAll(async () => {
        nightmare = new Nightmare({
            //show: true,
        });
    });

    afterAll(async () => {
        await nightmare.end();
    });

    it('should navigate to SimpleCents budget maker, input some values and click the calculate button, and the system should output multiple a number at the bottom.', async () => {
        await nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/budget-maker/');
        //await nightmare.goto('http://127.0.0.1:5500/SimpleCents/budget-maker/');
        await nightmare.select('#typeOfIncome', 'salary');
        await nightmare.type('#yearlySalary', '25000');
        await nightmare.type('#groceries', '100');
        await nightmare.type('#rent', '600');
        await nightmare.type('#util', '60');
        await nightmare.click('#calculateBtn');

        const results = await nightmare.evaluate(() => {
            const inputElement = document.querySelector("#remainingSummary");
            return inputElement.textContent;
        });

        expect(results).toBe('Total Expenses: $760.00 | Remaining: $1073.33');
    });
});