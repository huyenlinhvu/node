const http = require('http');
const hostname = 'localhost';
const port = 8000;

http.get(`http://${hostname}:${port}`, res => {
    let data = '';

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => console.log(data));
})