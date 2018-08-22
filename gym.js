/**
 * https://github.com/GoogleChrome/puppeteer
 * https://github.com/GoogleChrome/puppeteer/issues/665
 */
const puppeteer = require('puppeteer');
const url = 'https://www.virginactive.it/login';
const U_LOGIN_PAGE  = 'https://www.virginactive.it/login';
const U_CALENDAR_PAGE = 'https://www.virginactive.it/calendario-corsi';

const user = 'umbertocicero@gmail.com';
const pass = 'XXXXXXXXX';

const wait = 2000;

var headers = {authorization : "Basic " +new Buffer(`${user}:${pass}`).toString('base64')};

(async () => {
  
  const Navigate = async (url) => {
    console.log('goto: '+url);
    await page.goto(url);
  }
  const EnterText = async (selector, text) => {
    await page.click(selector);
    await page.keyboard.type(text);
  }
  const ClickNavigate = async (selector, waitFor = -1) => {
    await page.click(selector);
    if (waitFor >= 0) {
      await page.waitFor(waitFor*1000)
    }
    else {
      await page.waitForNavigation();
    }
  }
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({width: 1270, height: 10000, deviceScaleFactor: 1});
  await page.setExtraHTTPHeaders(headers);
  page.on('console', msg => console.log('PAGE LOG: ', msg.text()));
  
  await Navigate(U_LOGIN_PAGE);
    
  console.log('wait: '+wait);
  await page.waitFor(wait);
  
  console.log('enter login');
  await EnterText("#email", user); 
  await EnterText("#password", pass); 

  console.log('navigate');
  await ClickNavigate(".login",2000); 
  
  await Navigate(U_CALENDAR_PAGE);
  console.log('wait: '+wait);
  await page.waitFor(wait);
  
  /*
  await page.evaluate(() => {
    // this code works fine as well.
    const elements = document.querySelectorAll('ul.navbar-nav .ng-star-inserted');
    console.log(elements[2].innerHTML); 
    console.log('click');
    elements[2].click(); 
        
    return true;
  });
  
  console.log('wait: '+wait);
  await page.waitFor(wait);
  
  await page.evaluate(() => {
      console.log('search');
      window.scroll({
        bottom: 1000,
        behavior: "smooth"
      });
      const elements = document.querySelectorAll('.ng-tns-c4-1 .ng-star-inserted');
      console.log(elements.length); 
      for (const element of elements) {
        let text = element.innerText;
        if(text.includes('FIRENZE SAN DONATO')){
          console.log(text); 
        }
      }
        
    return true;
  });
  
  */
  await browser.close();
})();
