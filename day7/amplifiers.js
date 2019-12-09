let instructions = '3,8,1001,8,10,8,105,1,0,0,21,34,55,68,93,106,187,268,349,430,99999,3,9,102,5,9,9,1001,9,2,9,4,9,99,3,9,1001,9,5,9,102,2,9,9,101,2,9,9,102,2,9,9,4,9,99,3,9,101,2,9,9,102,4,9,9,4,9,99,3,9,101,4,9,9,102,3,9,9,1001,9,2,9,102,4,9,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,1002,9,5,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99';


const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}





let phaseSettings = [0,1,2,3,4];

let phaseSettingCollection = permutator(phaseSettings);

findBestSetting(phaseSettingCollection);

function findBestSetting(phaseSettings){
    let currBestOutput = 0
    let currBestSettings = [];



    for(let i = 0; i < phaseSettings.length; i++){
        let setting = phaseSettings[i]
        let output = runPhaseSetting(setting.slice(0));

        if(output > currBestOutput){
            currBestOutput = output;
            
            currBestSettings = setting;
        }
    }


    console.log(currBestSettings);
    console.log(currBestOutput)
}


function runPhaseSetting(setting){
    let outputSignal = 0;

    for(let i = 0; i < 5; i++){
        let currentSetting = setting.shift();
        outputSignal = intCodeComputer(instructions, currentSetting, outputSignal)
    }
    return outputSignal;
}






function intCodeComputer(code, phaseSetting, previousOutput) {
    let current_idx = 0;
    code = code.split(',').map(el => parseInt(el));

    let input = [phaseSetting, previousOutput]
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

            code[code[current_idx + 1]] = input.shift();
            
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

    return output;


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
    return output;
}
