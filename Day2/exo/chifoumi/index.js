require('dotenv').config();

const readline = require('readline');

const player1 = {
    name: process.env.PLAYER1_NAME,
    score: 0,
};

const player2 = {
    name: process.env.PLAYER2_NAME,
    score: 0,
};

const choices = process.env.CHOICES.split(',');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getPlayerChoice(player) {
    return new Promise(resolve => {
        rl.question(`${player.name}, chose ${choices.join('/')} : `, choice => {
            if (!choices.includes(choice.toUpperCase())) {
                console.log(`Invalid choice! Please choose ${choices.join('/')}.\n`);
                resolve(getPlayerChoice(player));
            } else {
                resolve(choice.toUpperCase());
            }
        });
    });
}

async function playRound() {
  console.log(`\nScore : ${player1.name} ${player1.score} - ${player2.score} ${player2.name}`);

  const player1Choice = await getPlayerChoice(player1);
  const player2Choice = getRandomChoice();

  console.log(`${player1.name} has chosen ${player1Choice}.`);
  console.log(`${player2.name} has chosen ${player2Choice}.\n`);

  if (player1Choice === player2Choice) {
      console.log(`Equal !`);
  } else if (
      (player1Choice === 'PIERRE' && player2Choice === 'CISEAUX') ||
      (player1Choice === 'FEUILLE' && player2Choice === 'PIERRE') ||
      (player1Choice === 'CISEAUX' && player2Choice === 'FEUILLE')
  ) {
    console.log(`${player1.name} wins this round !`);
    player1.score++;
  } else {
    console.log(`${player2.name} wins this round !`);
    player2.score++;
  }

  if (player1.score === 3) {
      console.log(`\n${player1.name} wins the game !`);
      console.log(`Score final : ${player1.name} ${player1.score} - ${player2.score} ${player2.name}`);
      rl.close();
  } else if (player2.score === 3) {
      console.log(`\n${player2.name} wins the game !`);
      console.log(`Final score: ${player1.name} ${player1.score} - ${player2.score} ${player2.name}`);
      rl.close();
  } else {
      playRound();
  }
}

playRound();

