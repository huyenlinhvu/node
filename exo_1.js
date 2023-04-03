// ### 01 Exercice 

// 1. Créer un petit jeu en console : on doit deviner un nombre compris entre 1 et 100. Si l'utilisateur propose un nombre plus petit on lui indique qui l'est plus grand et réciproquement. 

// 2. L'utilisateur à 10 tentatives pour deviner le nombre caché, après le jeu s'arrête. Si l'utilisateur trouve le nombre avant cette borne, le jeu s'arrête également. 

// 3. Pensez à gérer également les erreurs de saisi dans le jeu.

const readline = require('readline');

// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

const MAX_ATTEMPTS = 10;
let numAttempts = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(`Guess a number between 1 and 100 (${MAX_ATTEMPTS - numAttempts} attempts left): `);

rl.prompt();

rl.on('line', (input) => {
    const guess = parseInt(input.trim());

    if (isNaN(guess)) {
        console.log('Please enter a valid number between 1 and 100.');
    } else if (guess < 1 || guess > 100) {
        console.log('Number must be between 1 and 100.');
    } else {

    numAttempts++;

    if (guess === secretNumber) {
        console.log('Congratulations! You guessed the secret number!');
        rl.close();
    } else if (guess < secretNumber) {
        console.log('The secret number is bigger than your guess.');
    } else {
        console.log('The secret number is smaller than your guess.');
    }

    if (numAttempts === MAX_ATTEMPTS) {
        console.log(`Sorry, you have reached the maximum number of attempts (${MAX_ATTEMPTS}). The secret number was ${secretNumber}.`);
        rl.close();
    } else {
        rl.setPrompt(`Guess a number between 1 and 100 (${MAX_ATTEMPTS - numAttempts} attempts left): `);
        rl.prompt();
    }
    }
}).on('close', () => {
    console.log('Thanks for playing!');
    process.exit(0);
});
