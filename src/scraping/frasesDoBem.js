// Scraping da pagina https://www.frasesdobem.com.br/frases-de-reflexao
const cheerio = require('cheerio');
const axios = require('axios');

// Função que retorna o html  de um link no parametro
async function getHtml(html) {
    let res = await axios.get(html);
    const data = res.data;
    return data;
}
// Traz um array com as frases
function getFrases($) {
    // Array que vai receber as frases
    var frases = []; 
    let index = 0

    do {        
        let filter = $(`#frase${index+1}`).text();
        if(filter == "") break;
        frases[index] = filter;

        index += 1;
    } while (true);
   
    return frases
}
// Função que faz o scraping
async function scrapingData(tipo) {
  // Traz o Html
  const data = await getHtml(`https://www.frasesdobem.com.br/${tipo}`);
  const $ = cheerio.load(data); 

  // Traz o array de frases
  const arrFrases = getFrases($); 
 
  return arrFrases;
}

async function getData() {
    const arrFrases = await scrapingData("frases-de-reflexao")
    arrFrases.forEach(element => {
        console.log(`Frase ${element}`);
        
    });  
}

getData();
