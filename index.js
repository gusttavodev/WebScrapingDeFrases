const Hapi = require('@hapi/hapi');

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

        await server.start();  

        return server;        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
};

module.exports = startServer();