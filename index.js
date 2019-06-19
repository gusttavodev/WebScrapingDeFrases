const Hapi = require('@hapi/hapi');


// Rotas do DataScraping
const scrapData = require('./src/routes/scrapData');

async function startServer () {
    try {
        // Server Config
        const server = Hapi.server({
            port: 8000,
            host: 'localhost'
        });        
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