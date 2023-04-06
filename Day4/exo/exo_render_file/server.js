const http = require('http');
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const students = [
    { name : "Sonia"},
    { name : "Antoine"}
];

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === "/") {
        const html = fs.readFileSync("./view/home.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
    }

    if (url === "/bootstrap") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("./assets/css/bootstrap.min.css");
        res.write(css);
        res.end();

        return;
    }

    if (url === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    if (req.method === 'POST' && url === '') {
        let body = '';
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            const replacer = new RegExp(/\+/, "g");
            const name = body.toString().split(/=/).pop().replace(replacer, '');
            if(name) students.push({name});
            res.writeHead(301, { Location : `http://${hostname}:${port}`});
            res.end();
        });
    }
});

server.listen(port, hostname, ()=> {
    console.log('Server running at http://localhost:3000/');
});
