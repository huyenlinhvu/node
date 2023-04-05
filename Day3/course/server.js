const http = require('http');
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {
    const url = req.url.replace('/', '');
    if(url ==='favicon.ico') {
        res.writeHead(200, {
            "Content-Type": 'image/w-icon',
        });
        res.end("Hello World!");
        return;
    }

    if(url === 'test') {
        res.end(`<!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <title> Page test </title>
                </head>
                <body>
                    <p>Bienvenue sur la page test</p>
                </body>
            </html>`
        )
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})