var fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if(err){throw err;}


    intCodeComputer(data);
});




function intCodeComputer(code){
    let current_idx = 0;
    code = code.split(',').map(el=>parseInt(el));
    let operation = code[0];

    //resolve 1202 error
    code[1] = 12;
    code[2] = 2;




    while(operation !== 99){

        if(![1,2,99].includes(operation)){
            throw "Computer Error";
        }

        if(operation === 1){
            let position1 = code[current_idx + 1];
            let position2 = code[current_idx + 2];
            let targetPosition = code[current_idx + 3];

            code[targetPosition] = code[position1] + code[position2];
        }else if(operation ===2){
            let position1 = code[current_idx + 1];
            let position2 = code[current_idx + 2];
            let targetPosition = code[current_idx + 3];

            code[targetPosition] = code[position1] * code[position2];
        }
        current_idx += 4;
        operation = code[current_idx];
    }
    console.log(code[0]);
    return code;
}