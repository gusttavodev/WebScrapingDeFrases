const Hapi = require('@hapi/hapi');

// Config Server Defined
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

async function startServer () {
    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
        return server;
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
};

startServer();

module.exports = startServer();