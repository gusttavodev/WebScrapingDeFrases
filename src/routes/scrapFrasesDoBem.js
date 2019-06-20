const joi = require('joi');
const boom = require('boom');
const mongoCrud = require('../database/mongo/schemas/CRUD/fraseCrud');
const frasesDoBem = require('../scraping/frasesDoBem');

const failAction = (request, headers, erro) => {
  throw erro;
}

module.exports = {
  create() {
    return {
      method: 'POST',
      path: '/cadastrar-frase',
      config: {
        tags: ['api'],
        description: 'Cadastrar um array de frases do site',
        notes: 'Deve cadastrar array gerado por um WebScraping',
        validate: {
          failAction,
          payload: {
            tag: joi.string().required().min(2).max(30),
            site: joi.string().required().min(2).max(200),
          },         
        }
      },
      handler: async (request) => {
        try {
          const {            
            tag,
            site,
          } = request.payload;
          switch (site) {
            case "www.frasesdobem.com.br":
              // Ex: frases-de-reflexao
              const arrFrases = await frasesDoBem.scrapingData(tag);
              
              for (let index = 0; index < arrFrases.length; index++) {
                let frase = arrFrases[index];
                var result = await mongoCrud.create({
                  frase,
                  tag,
                  site
                });       
              }
              return {
                message: 'Frases cadastradas',
                  _id: result._id,
              };              
            default:
              return {
                message: 'Site Não Adaptado',
                  _id: result._id,
              };      
          }

        } catch (error) {
          console.log('Erro Interno Boom', error);
          return boom.internal();
        }
      }
    };
  },
}