const http = require('http');
const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', "application/json");
    const date = new Date();
    const message = {message: `Hello worl! ${date.toTimeString}`};
    console.log(JSON.stringify({message}));
    res.end(JSON.stringify({message}));
})

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
})