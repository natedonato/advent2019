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
        if(orbitObj[child] === undefined){
            orbitObj[child] = [];
        }
        orbitObj[parent].push(child);
        orbitObj[child].push(parent);
    })
    calcOrbits(orbitObj);
}


function calcOrbits(orbitObj){
    console.table(orbitObj);


    let steps = 0;
    let root = 'YOU';
    let target = 'SAN'
    let visited = {};


    dfs(root, 0);

    function dfs(root, level){
        visited[root] = true;
        console.log(root, level);
        if(root === target){
            steps = level-2;
        }
        let children = orbitObj[root];
        
        if(children){
            children.forEach(child=> {
                if(!visited[child]){
                dfs(child, level + 1)
                }
            });
        }

    }
    console.log(steps);
}