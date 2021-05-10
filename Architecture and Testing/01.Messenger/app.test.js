const {chromium} = require ('playwright-chromium');
const {expect} = require ('chai');
const {describe} = require('mocha');

let browser,page;
let url = 'http://localhost:3030';

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 500 });
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    describe('messenger tests',async ()=>{
        it('on refresh clicked loads all messages',async ()=>{
            await page.goto(url);
            await page.click('#refresh');
            const actualContent = await page.textContent('#messages');
            expect(actualContent).to.contain('Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))')
        })

        it('click send', async () =>{
            await page.goto("http://localhost:3000");
            await page.fill('#author', 'Peter');
            await page.fill('#content', 'Hello');
            await page.click("text=Send");
            await page.click("text=Refresh");
            const content = await page.$eval("#messages", (el) => el.value);
            expect(content).to.contains('Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))\nPeter: Hello');
        
          });
    })

});
