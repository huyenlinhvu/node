function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    console.log(array)
    return array;
}

module.exports = { shuffle };

// array=[1,2,3,4]
// shuffle(array)