const pug = require('pug');

//compile
// const template = `
// if age >= 18
//     h1 access granted!
// else
//     h1 Permission denied! `;

// const compileTemplate = pug.compile(template);

// const result = compileTemplate({age: 1});
// console.log(result)


// const compileTemplate = pug.compileFile('template.pug');
// const result = compileTemplate({age: 19});
// console.log(result)


//Render
// pug.render(template, {age: 19}, (err, data)=> {
//     if(err) throw err;
//     console.log(data);
// })


//Render pour un fichier externe pug
// pug.render('template.pug', {age: 19}, (err, data)=> {
//     if(err) throw err;
//     console.log(data);
// })

// try {
//     const compileTemplate = pug.compile(template);
// } catch (err){
//     res.writeHead(500, {'Content-Type': 'text/plain'});
//     res.end(err.message);
// }

//SYNTAXE de PUG
const compileTemplate3 = pug.compileFile('cours.pug');
const data = {
    name: 'Norbert',
    age: 33,
    gender: 'M'
}

compileTemplate(data)