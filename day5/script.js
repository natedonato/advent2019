intCodeComputer('3,225,1,225,6,6,1100,1,238,225,104,0,1101,69,55,225,1001,144,76,224,101,-139,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,60,49,225,1102,51,78,225,1101,82,33,224,1001,224,-115,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1102,69,5,225,2,39,13,224,1001,224,-4140,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,101,42,44,224,101,-120,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,68,49,224,101,-3332,224,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1101,50,27,225,1102,5,63,225,1002,139,75,224,1001,224,-3750,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,102,79,213,224,1001,224,-2844,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1,217,69,224,1001,224,-95,224,4,224,102,8,223,223,1001,224,5,224,1,223,224,223,1102,36,37,225,1101,26,16,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,677,677,224,102,2,223,223,1006,224,329,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,344,1001,223,1,223,107,226,226,224,1002,223,2,223,1006,224,359,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,374,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1008,677,226,224,1002,223,2,223,1005,224,404,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,434,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,449,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,464,1001,223,1,223,107,226,677,224,1002,223,2,223,1005,224,479,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,494,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,509,101,1,223,223,7,677,677,224,102,2,223,223,1006,224,524,1001,223,1,223,1007,226,677,224,1002,223,2,223,1005,224,539,1001,223,1,223,8,226,677,224,1002,223,2,223,1005,224,554,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,569,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,584,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,599,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,614,1001,223,1,223,1108,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,1007,677,677,224,102,2,223,223,1006,224,644,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,659,101,1,223,223,8,677,226,224,1002,223,2,223,1006,224,674,1001,223,1,223,4,223,99,226');

function intCodeComputer(code) {
    let current_idx = 0;
    code = code.split(',').map(el => parseInt(el));

    let input = 5;
    let operation = code[0] % 100;
    let nonzeroOutputs = 0;
    let output = 0;

    while (operation !== 99) {

        if (operation === 1) {

            let [values, locations] = parameterHandler(code[current_idx], current_idx);
            code[locations[2]] = values[0] + values[1];    
            current_idx += 4;

        } else if (operation === 2) {

            let [values, locations] = parameterHandler(code[current_idx], current_idx);
            code[locations[2]] = values[0] * values[1];
            current_idx += 4;

        } else if (operation === 3){

            code[code[current_idx + 1]] = input;
            
            current_idx += 2;

        } else if (operation === 4){

            output = code[code[current_idx+1]];
            current_idx += 2;

        } else if (operation === 5){
            let [values, locations, parameterModes] = parameterHandler(code[current_idx], current_idx);

            if(values[0] !== 0){
                current_idx = values[1];
            }
            else{
                current_idx += 3;
            }
        }else if (operation === 6){
            let [values, locations, parameterModes] = parameterHandler(code[current_idx], current_idx);

            if(values[0] === 0){
                current_idx = values[1];
            }else{
                current_idx += 3;
            }
        }else if(operation === 7){
            let [values, locations, parameterModes] = parameterHandler(code[current_idx], current_idx);
            if(values[0] < values[1]){
                code[locations[2]] = 1;
            }else{
                code[locations[2]] = 0;
            }
            current_idx += 4;
        }else if (operation === 8){
           let [values, locations, parameterModes] = parameterHandler(code[current_idx], current_idx);
           if (values[0] === values[1]) {
               code[locations[2]] = 1;
           } else {
               code[locations[2]] = 0;
           }
           current_idx += 4;
        }else{
            console.log('ERROR');
            console.log(operation);
            console.log(code);
            console.log(current_idx);
            break;
        }
        operation = code[current_idx].toString();

        operation = parseInt(operation.slice(operation.length -2));
    }

    console.log('final output', output);



    function parameterHandler(instruction, current_idx) {
        let subIndex = 1;

        instruction = instruction.toString();
        let parameters = instruction.slice(0, instruction.length - 2);
        
        let values = [];
        let locations = [];
        let parameterCollection = [];
        while(parameters.length < 3)
        {
            parameters = '0' + parameters;
        }

        while(parameters.length > 0){
            const mode = parameters.slice(-1);
            parameters = parameters.slice(0, parameters.length -1);
            parameterCollection.push(mode);
            if(mode === '1'){
                values.push(code[current_idx + subIndex]);
                locations.push('null');

            }else{
                values.push(code[code[current_idx + subIndex]]);
                locations.push(code[current_idx + subIndex]);
            }

            subIndex += 1;
        }
        return [values, locations];
    }
    return code;
}
