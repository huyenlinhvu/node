const dotenv = require('dotenv');
dotenv.config();

const students = [
    { name: 'ALAN', note: '11', address: 'Paris', mention : null },
    { name: 'ALICE', note: '17', address: 'Paris', mention : null },
    { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
    { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
    { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
    { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
    { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
    { name: 'SONIA', note: '18', address: 'Paris', mention : null },
    { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
];

function calculateMention(note) {
    const noteFloat = parseFloat(note);
    if (noteFloat >= process.env.MENTION_ASSEZ_BIEN_MIN && noteFloat < process.env.MENTION_ASSEZ_BIEN_MAX) {
        return 'Assez bien';
    } else if (noteFloat >= process.env.MENTION_BIEN_MIN && noteFloat < process.env.MENTION_BIEN_MAX) {
        return 'Bien';
    } else if (noteFloat >= process.env.MENTION_TRES_BIEN_MIN) {
        return 'Très bien';
    } else {
        return 'Passable';
    }
}

for (const student of students) {
    student.mention = calculateMention(student.note);
}

console.log(students);
