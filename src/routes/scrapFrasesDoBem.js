const joi = require('joi');
const boom = require('boom');

const failAction = (request, headers, erro) => {
    throw erro;
}

module.exports = {
    create() {
      return {
        method: 'POST',
        path: '/',
        config: {
          tags: ['api'],
          description: 'Deve cadastrar herois',
          notes: 'Deve cadastrar heroi por nome e poder',
          validate: {
              failAction,
              payload: {
                  nome: joi.string().required().min(3).max(100),
                  poder: joi.string().required().min(2).max(30)
              },
              headers,
          }
},
        handler: function (request, h) {
    
            return 'Hello World!';
        }
      };
  },
}