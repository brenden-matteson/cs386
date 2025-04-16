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

    it('navigates to the financial wellness page of SimpleCents, clicks on one of the side bar navigation links and checks that the user is brought to the right section.', async () => {
        await nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/financial-wellness/');
        await nightmare.click('.nav-container *:nth-child(5) a');
        const url = await nightmare.url();
        expect(url).toBe('https://brendenmatteson.com/archive/SimpleCents/financial-wellness/#credit-cards');
    });
});