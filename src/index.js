require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    // Entra na página de login do twitter
    await page.goto('https://twitter.com/login');

    // Acessa a conta
    await page.type('[name="session[username_or_email]"]', process.env.TWITTER_USERNAME, { delay: 30 });
    await page.type('[name="session[password]"]', process.env.TWITTER_PASSWORD, { delay: 30 });
    await page.keyboard.press('Enter');
    
    /* await page.click('div[data-testid="LoginForm_Login_Button"]'); */
  
    await page.waitForNavigation();

    // Faz o tweet
    let tweetPhrase = "AAAA";
    await page.type('div[class="notranslate public-DraftEditor-content"]', tweetPhrase, { delay: 30 });
    await page.click('div[data-testid="tweetButtonInline"]');

    // Fecha o browse
    await browser.close();
})();