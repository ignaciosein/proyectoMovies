const puppeteer = require("puppeteer");



let scrapping = {
  scrap: async (filmTitle) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto( `https://www.filmaffinity.com/es/search.php?stext=${filmTitle}`);
    await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-47sehv');
    function capitalize(filmTitle) {
      return filmTitle[0].toUpperCase() + filmTitle.slice(1);
    }

    let tittleClean = capitalize(filmTitle)
  
    await page.waitForSelector(`a[title='${tittleClean} ']`)
    await page.click(`a[title='${tittleClean} ']`)
    await page.waitForSelector('h1[id="main-title"]')
    await page.click("#mt-content-cell > div:nth-child(6) > div > div.margin-ntabs > ul > li:nth-child(2)")
    const data = await page.evaluate(() => {
    /* let opiniones = document.querySelectorAll('h1[id="main-title"]') ;   */
    let opiniones = document.querySelectorAll('h1').elements ;  
    console.log("valor opinios:", opiniones)
/*       return {
        opiniones
      }; */
    });
    /* await browser.close(filmTitle); */
    /* console.log("valor data:",data) */
    return data;
  }
}
let filmTitle = "a todo gas"
scrapping.scrap(filmTitle) 
 