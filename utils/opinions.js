const puppeteer = require("puppeteer");



const scrap = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://www.imdb.com/title/tt0322259/");
  const wait = await page.waitForTimeout(1000).then(() => console.log('Waited a second!'));
  console.log("wait", wait)
  const data = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    //const summary = document.querySelector("#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div.summary_text").innerText;
    const opinionHead = document.querySelector("#main > section > div.lister > div.lister-list > div:nth-child(1) > div.review-container > div.lister-item-content > a")
    const summary_two = document.querySelector("#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div.summary_text.ready > div > div.plot-text > div > div")
    //#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div.summary_text

    console.log("summary", opinionHead, 2, summary_two)
    return {
      title,  
      summary: opinionHead ? opinionHead.innerText : summary_two.innerText
    }

 });

 await browser.close();

 return data
}

/* scrap(); */

module.exports =scrap
 
