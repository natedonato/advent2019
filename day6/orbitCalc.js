var fs = require('fs');


fs.readFile('orbits.txt', 'utf8', function (err, data) {
    if (err) throw err;
    convertFileToArray(data);
});

function convertFileToArray(data){
    data = data.split('\n');
    orbitObj = {};
    data.forEach(line =>{
        let [parent, child] = line.split(')')
        if(orbitObj[parent] === undefined){
            orbitObj[parent] = [];
        }
        orbitObj[parent].push(child);
    })
    calcOrbits(orbitObj);
}

function calcOrbits(orbitObj){
    let numOrbits = 0;
    let root = 'COM';
    dfs(root, 0);

    function dfs(root, level){
        console.log(root, level);
        numOrbits += level;
        
        let children = orbitObj[root];
        if(children){
        children.forEach(child=> dfs(child, level + 1));
        }
    }
    console.log(numOrbits);
}