const fs = require("fs");
const readline = require("readline");
const json = JSON.parse(fs.readFileSync("./students.json"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("Enter student name or type 'exit' to stop> ");
rl.prompt();

rl.on("line", (name) => {
    name = name.trim().toLowerCase();
    if (name === "exit") {
        rl.close();
        return;
    }

    const student = json.students.find((s) => s.name.toLowerCase() === name);
    if (!student) {
        console.log("Student not found!");
    } else {
        try {
        const avg = student.notes.reduce((sum, n) => sum + n) / student.notes.length;
        console.log(`Average for ${student.name}: ${avg.toFixed(2)}`);
        } catch (error) {
        console.log("Error calculating average!");
        }
    }

    rl.prompt();
    
}).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
});
