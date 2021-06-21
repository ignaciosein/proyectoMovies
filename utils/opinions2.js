const puppeteer = require("puppeteer");



let scrapping = {



scrap: async (filmTitle) => {

  

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  
  await page.goto( `https://www.filmaffinity.com/es/search.php?stext=${filmTitle}`);



  await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-47sehv');

  await page.click(' #title-result > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)')


 /*  await page.click(
    "#content-layout > div.section-wrap.gd-2-cols.gd-gap-30.row-col-sticky > div > section.section.movies-results > ul > li:nth-child(1) > div > div.meta > h2  "  ); */ 

  await page.waitForSelector("#main-title > span:nth-child(1)");

  const data = await page.evaluate(() => {
    let opiniones = document.querySelectorAll("#main-title > span:nth-child(1)" );

   

    
    return {
      opiniones
    };
  });

  await browser.close(filmTitle);
  return data;
}





}



let filmTitle = "torrente"

scrapping.scrap(filmTitle) /*  */

/* scrap().then(data =>console.log(data)) */

/* module.exports = scrapping;  */
 