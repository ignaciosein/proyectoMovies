const puppeteer = require("puppeteer");



const scrap = async() => {
 
  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.goto("https://www.imdb.com/title/tt6320628/");
  await page.waitForTimeout(1000).then(() => console.log('Waited a second!'));
    const data = await page.evaluate(() => {
    const title = document.querySelector("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1").innerText;
    const summary = document.querySelector("#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div.summary_text").innerText;
    console.log(title);
    return {
      title,
      summary/*  summary_one ? summary_one.innerText : summary_two.innerText */
    }
 });
 await browser.close();
 return data
}
 
module.exports = scrap