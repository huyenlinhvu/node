const os = require('os');
const {username} = os.userInfo();
const cpus = os.cpus().length;
console.log(
    `Cette machine appartient à ${username} qui est le plus barbu et à ${cpus} cpus.`
)

//process.stdin.write('bonjour \n');
process.stdout.write('bonjour \n');
process.stderr.write('error \n');
process.stdin.on('data', (chunk) => {
    process.exit(0);
})