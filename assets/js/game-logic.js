// Variables 

var hitCounter ;
var missCounter ;
var hitPercentage ;
var gameState = false;
var gameOutCome ;
var playerName = "Player_1"



// Spawner 
function targetSpawner(){
    $(".target").remove();
    var numberGen = Math.floor((Math.random() * 12) + 1);


    var spawnPoint=  "#spawn-point-".concat(numberGen) ;

  
    $(spawnPoint).append('<div class="target" onclick="targetSpawner()"></div>');


    console.log(numberGen);
    console.log(spawnPoint)
};


targetSpawner();
