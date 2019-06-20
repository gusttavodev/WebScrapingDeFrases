//Pacotes .env
const {
    config
} = require('dotenv');
const {
    join
} = require('path');
const {
    ok
} = require('assert');
//###########################  CONFIG .ENV ##################################
const env = process.env.NODE_ENV || 'dev'
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPatch = join(__dirname, './config', `.env.${env}`);
config({
    path: configPatch
})

const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const hapiCors = require('hapi-cors');

const mongoConnect = require('./src/database/mongo/mongoConnect');

// Rotas do DataScraping
const scrapData = require('./src/routes/scrapFrasesDoBem');

// Server Config
const server = Hapi.server({
    port: 3030,
    host: 'localhost'
});        

async function startServer () {
    try {
        console.log('Server running on %s', server.info.uri);

        // Routes
        server.route(scrapData.create());
        // Config do Swagger
        const swaggerOptions = {
            info: {
                title: 'API-Frases',
                version: 'v1.0',
            },
            lang: 'pt',
        };
        // Plugins Hapi
        await server.register([
            hapiCors,           
            Vision,
            Inert,
            {
                plugin: HapiSwagger,
                options: swaggerOptions,
            },
        ]);
        

        // Conect Mongo
        const statusMongo = await mongoConnect;
        console.log(`Status do MongoDB ${statusMongo}`)
        await server.start();  

        return server;        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
};

module.exports = startServer();