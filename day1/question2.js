var fs = require('fs');

fs.readFile('input.txt', 'utf8', function (err, data) {
    if (err) throw err;
    convertFileToArray(data);
});

function convertFileToArray(filedata) {
    let array = filedata.split('\n').map(el => parseInt(el));
    fuelCalculator(array);
}

function fuelCalculator(masses) {
    let sum = 0;

    masses.forEach(mass =>
        sum += massToFuel(mass)
    );
    console.log(sum);
    return sum;
}

function massToFuel(mass){
    let totalFuel = 0;

    while(massToFuelOnce(mass) > 0){
        let nextFuel = massToFuelOnce(mass);
        totalFuel += nextFuel;
        mass = nextFuel;
    }

    return totalFuel;
}



function massToFuelOnce(mass){
    const fuel = Math.floor(mass / 3) - 2;
    if(fuel < 0){return 0;}
    return fuel;
}