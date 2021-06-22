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

 await page.waitForSelector(".review-text1")
 
 

 const data = await page.evaluate(() => {
  let opiniones = document.querySelectorAll(".review-text1");

  let arrayVacio = [];
  for (let index = 0; index < opiniones.length; index++) {
    
    arrayVacio.push(opiniones[index].innerText);

  
  }

  
  console.log(arrayVacio)
  return {
    arrayVacio,
  };
});

  await browser.close(filmTitle);
  return data;
}





}



let filmTitle = "a todo gas"

scrapping.scrap(filmTitle) /*  */

/* scrap().then(data =>console.log(data)) */

/* module.exports = scrapping;  */
 