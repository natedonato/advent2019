let instructions = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5';


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


let phaseSettings = [9,8,7,6,5];

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

let testSetting = [9,8,7,6,5];

function runPhaseSettingAmped(setting){
    

    for(let i = 0; i < 5; i++){




    }

}


function runPhaseSetting(setting){
    let outputSignal = 0;

    for(let i = 0; i < 5; i++){
        let currentSetting = setting.shift();
        outputSignal = intCodeComputer(instructions, currentSetting, outputSignal)
    }
    return outputSignal;
}






function intCodeComputer(code, input) {
    let current_idx = 0;
    code = code.split(',').map(el => parseInt(el));
    this.input = [input];
    let operation = code[0] % 100;
    let output = 0;
    this.test = 'yo'

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
            if(this.input.length > 0){
                waitForInput();
            }
            code[code[current_idx + 1]] = this.input.shift();
            
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

    function waitForInput(){
        console.log(this.test);
        while(this.input.length === 0){
            //wait
        };
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
