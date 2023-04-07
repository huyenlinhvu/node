const http = require('http');
const dayjs = require('dayjs');
const fs = require('fs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { addUser, getUsers, deleteUser } = require('./utils');

require('dotenv').config();

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Display form add new user
    const html = fs.readFileSync("./view/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  } else if (req.url === '/addUser') {
    // Add new user
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const birthdate = params.get('birthdate');
      const birthdateFormatted = dayjs(birthdate, 'YYYY-MM-DD').format('DD MMMM YYYY');
      addUser(name, birthdateFormatted);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      res.end();
    });
  } else if (req.url === '/users' && req.method === 'GET') {
    // Display list of users
    const users = getUsers();
    const userItems = users.map(user => {
      return `
        <li>
          <span>${user.name} - ${user.birth}</span>
          <form action="/deleteUser" method="POST">
            <input type="hidden" name="name" value="${user.name}">
            <button type="submit">Supprimer</button>
          </form>
        </li>
      `;
    }).join('');
    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Utilisateurs</title>
        <link rel="stylesheet" href="assets/css/style.css">
      </head>
      <body>
        <h1>Liste des utilisateurs</h1>
        <ul>
          ${userItems}
        </ul>
        <a href="/">Ajouter un utilisateur</a>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(html);
  } else if (req.url === '/deleteUser') {
    // Delete user
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const name = params.get('name');
      deleteUser(name);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const port = process.env.APP_PORT 
const host = process.env.APP_LOCALHOST

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
