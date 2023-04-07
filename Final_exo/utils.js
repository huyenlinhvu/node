const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const students = [
    { name: "Sonia", birth: "2019-14-05" },
    { name: "Antoine", birth: "2000-12-05" },
    { name: "Alice", birth: "1990-14-09" },
    { name: "Sophie", birth: "2001-10-02" },
    { name: "Bernard", birth: "1980-21-08" }
];


function getUsers() {
    return students.map(student => ({
        name: student.name,
        birth: dayjs(student.birth, "YYYY-DD-MM").format("YYYY-MM-DD")    }));
}
// const formattedStudents = students.map(student => ({
//     name: student.name,
//     birth: dayjs(student.birth, "YYYY-DD-MM").format("DD/MM/YYYY")
// }));

// formattedStudents.forEach(student => {
//     console.log(`${student.name} - ${student.birth}`);
// });
function addUser(name, birth) {
    students.push({ name, birth });
}

function deleteUser(name) {
    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
        students.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    getUsers,
    addUser,
    deleteUser
};
