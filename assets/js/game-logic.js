

function targetSpawner(){
    var numberGen = Math.floor((Math.random() * 12) + 1);


    var spawnPoint=  '#spawn-point-'.concat(numberGen);


    $(spawnPoint).append(`<div class="target" onclick="targetSpawner()"></div>`);


    console.log(numberGen);
    console.log(spawnPoint)
};
