$(document).ready(function () {
    spawnLoop();
});
// Variables 

var hitCounter = 0;


var spawnCount = 22;
var gameState = false;
var gameOutCome;
var playerName = "Player_1";

const targetId = $("#targetIcon");
const hitDom = $("#hit-counter");
const missDom = $("#missed-counter");
const accuracyDom = $("#accuracy-counter")

// Spawner 


function targetSpawner() {

    if (spawnCount < 29) {

        killSwitch();


        var numberGen = Math.floor((Math.random() * 12) + 1);


        var spawnPoint = "#spawn-point-".concat(numberGen);


        $(spawnPoint).append('<div class="target" onclick= "targetSpawner(); hitCounter++ ;successfulHit(); "   id="targetIcon"></div>');


        spawnCount++;

        failedHit();

        accuracyCalc();
        console.log(spawnCount);



    } else if (spawnCount <30) {


        killSwitch();


        var numberGen = Math.floor((Math.random() * 12) + 1);


        var spawnPoint = "#spawn-point-".concat(numberGen);

        $(spawnPoint).append(`<div class="target" onclick= "hitCounter++ ;successfulHit(); killSwitch();"   id="targetIcon"></div>`);


        spawnCount++;

        failedHit();

        accuracyCalc();
       
        console.log(spawnCount);
        

    } else {
        killSwitch();
    }


};

function killSwitch() {
    $(".target").remove();

};


//calls the Target spawner function every 1.5 seconds if the target is missed 
function spawnLoop() {
    setTimeout(function () {
        targetSpawner();
        spawnLoop();
    }, 1500);
};



// functions to record successful hits / every time a target is missed / Accuracy calc 

function successfulHit() {

    hitDom.text(hitCounter)

}


function failedHit(num1, num2) {

    num1 = spawnCount;
    num2 = hitCounter;

    var missCounter = num1 - num2;

    if (spawnCount <= 30) {
        missDom.text(missCounter);
    }


};


function accuracyCalc(hits, spawned) {
    hits = hitCounter;
    spawned = spawnCount;

    var accuracyTotal = hits * 100 / spawned;
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    accuracyDom.text(accuracyRounded, '%')
};