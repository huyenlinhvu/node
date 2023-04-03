// const os = require('os');
// const {username} = os.userInfo();
// const cpus = os.cpus().length;
// console.log(
//     `Cette machine appartient à ${username} qui est le plus barbu et à ${cpus} cpus.`
// )

//process.stdin.write('bonjour \n');
// process.stdout.write('bonjour \n');
// process.stderr.write('error \n');
// process.stdin.on('data', (chunk) => {
//     process.exit(0);
// })

//Asynchron
const fs = require('fs');
fs.readFile('alien.txt', 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
})

//synchron
// try{
//     const data = fs.readFileSync('alien.txt', 'utf8');
//     console.log(data);
// } catch(err) {
//     console.error(err)
// }

// const {writeFile} = fs;
// const data = "Hello Node.js"
// writeFile('alien.txt', data, (err)=> {
//     if(err) throw err;
//     console.log('Saved!');
// })


const {appendFile} = fs;
const data2 = "A test"
appendFile('alien.txt', data, (err)=> {
    if(err) throw err;
    console.log('Saved!');
})