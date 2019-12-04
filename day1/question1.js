var fs = require('fs');


fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) throw err;
    convertFileToArray(data);
});

function convertFileToArray(filedata){
    let array = filedata.split('\n').map(el => parseInt(el));
    fuelCalculator(array);
}


function fuelCalculator(masses){
    let sum = 0;

    masses.forEach(mass =>
        sum += convertMasstoFuel(mass)
        );
    console.log(sum);
    return sum;
}

function convertMasstoFuel(mass){
    const fuel = Math.floor(mass / 3) - 2;
    return fuel;
}
