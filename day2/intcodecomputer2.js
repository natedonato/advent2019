var fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }


    computerManager(data);





});

function computerManager(data){
  let initialMemory = data.split(',').map(el => parseInt(el));

  for(let i = 0; i <= 99; i++){
    for(let j = 0; j <= 99; j++){
        if (intCodeComputer(initialMemory.slice(0), i, j) === 19690720){
            console.log(100*i+j);   
            return [i, j];
        }
    }
  }
}






function intCodeComputer(code, noun, verb) {
    let current_idx = 0;
    let operation = code[0];

    code[1] = noun;
    code[2] = verb;

    while (operation !== 99) {

        if (![1, 2, 99].includes(operation)) {
            throw "Computer Error";
        }

        if (operation === 1) {
            let position1 = code[current_idx + 1];
            let position2 = code[current_idx + 2];
            let targetPosition = code[current_idx + 3];

            code[targetPosition] = code[position1] + code[position2];
        } else if (operation === 2) {
            let position1 = code[current_idx + 1];
            let position2 = code[current_idx + 2];
            let targetPosition = code[current_idx + 3];

            code[targetPosition] = code[position1] * code[position2];
        }
        current_idx += 4;
        operation = code[current_idx];
    }
    return code[0];
}