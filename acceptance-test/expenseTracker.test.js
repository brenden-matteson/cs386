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

    it('should navigate to SimpleCents expense tracker, input some values and click the calculate button, and the system should output a number at the bottom.', async () => {
        await nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/expense-tracker/');
        //await nightmare.goto('http://127.0.0.1:5500/SimpleCents/expense-tracker/');
        await nightmare.type('#workHours', '20');
        await nightmare.type('#payRate', '17.40');

        await nightmare.click('#calculateBtn');

        const results = await nightmare.evaluate(() => {
            const inputElement = document.querySelector("#totalIncomeResult");
            return inputElement.textContent;
        });

        expect(results).toBe('18096');
    });

    it('should already be on SimpleCents expense tracker, input some expenses in every category and click the calculate button, then recieve a balance remaining value', async () => {
        await nightmare.type('#groceries', '100');
        await nightmare.type('#rent', '600');
        await nightmare.type('#util', '60');
        await nightmare.type('#subscriptionsMonthly', '15');
        await nightmare.type('#clothing', '50');
        await nightmare.type('#entertainment', '100');
        await nightmare.type('#food', '150');
        await nightmare.type('#autoInsuranceSemiAnnually', '600');
        await nightmare.type('#subscriptionsAnnually', '120');

        await nightmare.click('#calculateBtn');

        const results = await nightmare.evaluate(() => {
            const inputElement = document.querySelector("#balanceResult");
            return inputElement.textContent;
        });

        expect(results).toBe('1704.48');
    });
});