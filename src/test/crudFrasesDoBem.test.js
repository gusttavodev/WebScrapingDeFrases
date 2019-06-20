const assert = require('assert');
const server = require('../../index');

const MOCK_ITEM = {
    tag: 'frases-de-reflexao',
    site: 'www.frasesdobem.com.br',    
};

let app = {};
describe('Suite de testes das rotas /client', function () {
    this.beforeAll(async () => {
        // Conectar o server e mongoDB
        app = await server;        
       
    });
    it('Deve Cadastrar as frases site e tag passados', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/cadastrar-frase',          
            payload: MOCK_ITEM
        });

        const statusCode = result.statusCode;
        const {
          message,
          _id,
        } = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);// Tem que gerar ID
        assert.deepEqual(message, 'Frases cadastradas');

    })
});