$(document).ready(function () {
    gameTheme.play();
});


// Variables 

var hitCounter = 0;
var timerPro = new Timer(function () {
    targetSpawner();
}, 900);
var spawnCount = 0;
var gameState = false;
var gameOutCome;
var playerName = "Player_1";

const targetId = $("#targetIcon");
const hitDom = $("#hit-counter");
const missDom = $("#missed-counter");
const accuracyDom = $("#accuracy-counter")






// Spawner 


function targetSpawner() {



    if (spawnCount <= 29) {
        killSwitch();
        timerPro.stop();
        timerPro.start();
        $(spawner()).append('<div class="fas fa-bullseye target" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); "   id="targetIcon"></div>');
        spawnCount++;
        failedHitDomPusher();
        accuracyCalc();

    } else if (spawnCount = 30) {
        killSwitch();
        timerPro.stop();
        timerPro.start();
        // chnaged the onlick on target to stop spawning further tagets on click 
        $(spawner()).append(`<div class="target" onclick= "hitCounter++ ;successfulHit(); killSwitch(); failedHit();"   id="targetIcon"></div>`);
        spawnCount++;
        failedHitDomPusher();
        accuracyCalc();

    } else {
        killSwitch();
        timerPro.stop();
        failedHitFinal();
    }
};

// function to calculate where the target will spawn next
function spawner() {
    var numberGen = Math.floor((Math.random() * 132) + 1);
    var spawnPoint = "#spawn-point-".concat(numberGen);
    return (spawnPoint);
};

// killSwitch funcion will remove any targets on screen 

function killSwitch() {
    $("#targetIcon").remove();
};







// functions to record successful hits / every time a target is missed / Accuracy calc 

function successfulHit() {
    hitSound.play();
    hitDom.text(hitCounter);
};




function failedHit() {
    var missCounter = (spawnCount - 1) - hitCounter;
   return(missCounter)
};

function failedHitDomPusher(){
    missDom.text(failedHit());
};

function failedHitFinal() {
    var missCounter = spawnCount - hitCounter;
    missDom.text(missCounter);
};



function accuracyCalc(hits, spawned) {
    hits = hitCounter;
    spawned = spawnCount;

    var accuracyTotal = hits * 100 / spawned;
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    return(accuracyRounded); 
};

function accuracyDomPusher(){
    accuracyDom.text(accuracyCalc(), '%');
};
// Timer function to reset the interval everytime a target is hit. (by jfriend00 on Stack Overflow) credit in read me 

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function (newT) {
        t = newT;
        return this.stop().start();
    }
}