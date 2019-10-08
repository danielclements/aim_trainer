$(document).ready(function () {
    spawnLoop();
});
// Variables 

var hitCounter = 0;
var missCounter;
var hitPercentage;
var spawnCount = 0;
var gameState = false;
var gameOutCome;
var playerName = "Player_1"


const hitDom = $("#hit-counter")

// Spawner 


function targetSpawner() {


    $(".target").remove();


    var numberGen = Math.floor((Math.random() * 12) + 1);


    var spawnPoint = "#spawn-point-".concat(numberGen);


    $(spawnPoint).append('<div class="target" onclick="targetSpawner(); hitCounter++ ; successfulHit() "></div>');


    spawnCount++;




    console.log(spawnCount);

};


//calls the Target spawner function every 1.5 seconds if the target is missed , resets on click
function spawnLoop() {
    setTimeout(function () {
        targetSpawner();
        spawnLoop();
    }, 1500);
}

// hit Counter function to be called when a tarhet is clicked on 

function successfulHit(){

    hitDom.text(hitCounter) 

}