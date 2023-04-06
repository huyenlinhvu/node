// const pug = require('pug');
// const fs = require('fs');

// function renderFile(filename, user) {
//     fs.readFile(filename, 'utf8', (err, data) => {
//         if (err) {
//         console.error(err);
//         return;
//         }
//         const html = pug.render(data, { user });
//         console.log(html);
//     });
// }

// const user = { isAdmin: false }; 
// const templateFilename = 'template.pug';

// renderFile(templateFilename, user);


//Exo 2: Use Compile

const pug = require('pug');

const template = `
if user.isAdmin
    h1 Access granted
else
    h1 You must be logged as an administrator!
`;

const compiledFunction = pug.compile(template);

const user = { isAdmin: true }; // change to { isAdmin: false } to see the different output

const html = compiledFunction({ user });
console.log(html);
