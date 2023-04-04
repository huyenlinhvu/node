const readline = require('readline');

const students = ["Alan", "Sonia", "Sophie"];

rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Search name > ');

rl.prompt();

rl.on('line', (answer) => {
    const searchName = answer.trim().toLowerCase();
    const studentName = students.find(name => name.toLowerCase() === searchName);
    if (studentName) {
    console.log(`Found ${studentName}`);
    } else {
        console.log(`Could not find ${searchName}`);
    }
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day');
    process.exit(0);
});
