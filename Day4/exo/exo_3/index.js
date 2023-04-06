const pug = require('pug');
const loggedUser = {
    name: {
        first: 'Jean',
        last: 'Dupont',
    },
    age: 36,
    birthdate: new Date('1986-04-18'),
    location: {
        zipcode: '77420',
        city: 'Champs-sur-Marne',
    },
    isAdmin: true,
};

const compiledFunction = pug.compileFile('template.pug', { pretty: true });
const html = compiledFunction({ loggedUser });
console.log(html);
