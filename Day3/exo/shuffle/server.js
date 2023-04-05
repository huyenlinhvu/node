const http = require('http');
const { shuffle } = require('./src/utils');

const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const userList = users.map(user => `<li>${user}</li>`).join('');
        const html = `<html>
                        <head>
                            <title>User List</title>
                        </head>
                        <body>
                            <ul>${userList}</ul>
                        </body>
                    </html>`;
        res.end(html);
    } else if (req.url === '/shuffle') {
        shuffle(users);
        res.writeHead(200, { 'Location': '/' });
        const userList = users.map(user => `<li>${user}</li>`).join('');
        const html = `<html>
                        <head>
                            <title>User List</title>
                        </head>
                        <body>
                            <ul>${userList}</ul>
                        </body>
                    </html>`;
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
