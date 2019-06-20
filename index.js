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
const mongoConnect = require('./src/database/mongo/mongoConnect');

// Rotas do DataScraping
const scrapData = require('./src/routes/scrapData');

// Server Config
const server = Hapi.server({
    port: 3030,
    host: 'localhost'
});        

async function startServer () {
    try {
        console.log('Server running on %s', server.info.uri);
        
        // Routes
        server.route(scrapData.list());

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