const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Route pour récupérer toutes les données
    if (parsedUrl.pathname === '/all') {
        fs.readFile('./Data/all.json', (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
        });
    }

    // Route pour rechercher un utilisateur spécifique
    else if (parsedUrl.pathname.startsWith('/search/')) {
        const username = parsedUrl.pathname.slice(8);
        fs.readFile(`./Data/${username}.json`, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
    }

  // Route par défaut
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
