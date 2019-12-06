const button = document.getElementById('button')

const code = document.getElementById('intCode');
const input = document.getElementById('inputValue');
const outputDiv = document.getElementById('output');
const memoryState = document.getElementById('memoryState');

button.onclick = ()=>{
    let memory =  code.value;
    if(!memory){return;}
    let inputValue = input.value;
    intCodeComputer(memory, inputValue, outputDiv)
}


function parseString(code){
    code = code.split(',').map(el => parseInt(el));
    return code;
}

function intCodeComputer(memory, inputValue, outputDiv) {
    let code = parseString(memory);
    let input = parseInt(inputValue);

    let operation = code[0] % 100;
    let output = [];
    let current_idx = 0;

    while (operation !== 99) {
        console.log('last operation: ', operation);
        console.log('code state', code)

        let numParameters = 0;

        if (operation === 1) {
            numParameters = 3;

            let [values, locations] = modeHandler(numParameters);
            code[locations[2]] = values[0] + values[1];    

        } else if (operation === 2) {
            numParameters = 3;

            let [values, locations] = modeHandler(numParameters);
            code[locations[2]] = values[0] * values[1];

        } else if (operation === 3){
            numParameters = 1;
            code[code[current_idx + 1]] = input;
            

        } else if (operation === 4){
            numParameters = 1;
            value = code[code[current_idx + 1]]
            output.push(value);

        } else if (operation === 5){
            numParameters = 2;
            let [values, locations, parameterModes] = modeHandler(numParameters);

            if(values[0] !== 0){
                numParameters = -1
                current_idx = values[1];
            }
        }else if (operation === 6){
            numParameters = 2;

            let [values, locations, parameterModes] = modeHandler(numParameters);
            console.log('values', values);

            if(values[0] === 0){
                current_idx = values[1];
                numParameters = -1
            }
        }else if(operation === 7){
            numParameters = 3

            let [values, locations, parameterModes] = modeHandler(numParameters);
            if(values[0] < values[1]){
                code[locations[2]] = 1;
            }else{
                code[locations[2]] = 0;
            }
        }else if (operation === 8){
            numParameters = 3

           let [values, locations, parameterModes] = modeHandler(numParameters);
           if (values[0] === values[1]) {
               code[locations[2]] = 1;
           } else {
               code[locations[2]] = 0;
           }
        }else{
            console.log(code[current_idx])
            output.push( 'Error :(')
            break;
        }

        current_idx += numParameters + 1

        operation = code[current_idx].toString();

        operation = parseInt(operation.slice(operation.length -2));
    }

    if(output.length === 0){output = ['No output']} 
    outputDiv.innerText = output;
    memoryState.innerText = code;


    
    function modeHandler(num_parameters) {

        let subIndex = 1;
        instruction = code[current_idx].toString();

        let modes = instruction.slice(0, instruction.length - 2);
        let values = [];
        let locations = [];
        let parameterCollection = [];

        while(modes.length < num_parameters)
        {
            modes = '0' + modes;
        }

        while(modes.length > 0){
            const mode = modes.slice(-1);
            modes = modes.slice(0, modes.length -1);
            parameterCollection.push(mode);

            if(mode === '1'){
                values.push(code[current_idx + subIndex]);
                locations.push(current_idx + subIndex);

            }else{
                values.push(code[code[current_idx + subIndex]]);
                locations.push(code[current_idx + subIndex]);
            }

            subIndex += 1;
        }
        return [values, locations, parameterCollection];
    }

    return code;
}




