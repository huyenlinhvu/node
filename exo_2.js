// 1. Lisez le fichier à l'aide de la méthode asynchrone.
const fs = require('fs');
fs.readFile('students.txt', 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
})

// 1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.
try {
    const data = fs.readFileSync('students.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}

// 2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.
fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Split the data into lines
    const lines = data.split('\n');

    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const columns = line.split(' ');

        const note = parseInt(columns[0]);
        if (note > 17) {
            const name = columns[1];
            const address = columns[2];
            console.log(`${name} (${address})`);
        }
    }
});

// 3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.
fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.trim().split('\n');
    let bestNote = 0;
    let bestStudent = '';
    
    lines.forEach((line) => {
        const [note, name, address] = line.trim().split(' ');
        if (parseInt(note) > bestNote) {
            bestNote = parseInt(note);
            bestStudent = `${name} (${address})`;
        }
    });
    console.log(`Student: ${bestStudent}, note: ${bestNote}.`);
});

// 4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.
fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

  // Create array of student objects
    const students = lines.map(line => {
    // Split line by spaces
        const [notes, name, address] = line.split(' ');

        return {
        notes: parseInt(notes),
        name,
        address
        };
    });

    // Add students to student table
    students.forEach(student => {
        console.log(student);
    });
});


// 5. Ordonnez maintenant l'ensemble des données dans le tableau.

fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

    // Create array of student objects
    const students = lines.map(line => {
    // Split line by spaces
        const [notes, name, address] = line.split(' ');

    // Return student object
        return {
            notes: parseInt(notes),
            name,
            address
        };
    });

    // Sort students by notes in descending order
    students.sort((a, b) => b.notes - a.notes);

    students.forEach(student => {
        console.log(student);
    });
});


// 6. Ajoutez dans le fichier students.txt les étudiants suivants :

// - 18 Sonia Paris

// - 17 Clarisse Marseille

// New students to add
const newStudents = [
    { notes: 18, name: 'Sonia', address: 'Paris' },
    { notes: 17, name: 'Clarisse', address: 'Marseille' }
];

// Append new students to file asynchronously
newStudents.forEach(student => {
    const line = `${student.notes} ${student.name} ${student.address}\n`;
    fs.appendFile('students.txt', line, err => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(`Student ${student.name} added to file.`);
    });
});


// 7. Lire le fichier lui-même et mettez chaque nom en majuscule
fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

    const students = lines.map(line => {
        const [notes, name, address] = line.split(' ');

        return {
            notes: parseInt(notes),
            name,
            address
        };
    });

    const capitalizedStudents = students.map(student => {
        if (typeof student.name !== 'undefined') {
        const capitalized = student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase();
        return { ...student, name: capitalized };
        } else {
        return student;
        }
    });

  // Write modified data back to file asynchronously
    const newData = capitalizedStudents.map(student => `${student.notes} ${student.name} ${student.address}`).join('\n');
    fs.writeFile('students.txt', newData, err => {
        if (err) {
        console.error(err);
        return;
        }
        console.log('Names capitalized successfully.');
    });
});
