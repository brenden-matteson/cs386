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

    it('should navigate to SimpleCents website and get title', async () => {
        await nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/');
        const title = await nightmare.title();

        expect(title).toBe('SimpleCents');
    });

    it('should navigate to SimpleCents website and get title', async () => {
        //await nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/');
        let page = nightmare.goto('https://brendenmatteson.com/archive/SimpleCents/');

        let text = await page.evaluate(() => document.querySelector(".value-proposition").textContent).end()

        expect(text).toContain('We Make it Easy!');
    });
});