
  

// Variables 

var hitCounter = 0;
var timer = new Timer(function() {
    targetSpawner();
}, 1400);
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



    if (spawnCount < 29) {

        killSwitch();
        timer.stop();
        timer.start();

        var numberGen = Math.floor((Math.random() * 132) + 1);


        var spawnPoint = "#spawn-point-".concat(numberGen);


        $(spawnPoint).append('<div class="fas fa-bullseye target" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); "   id="targetIcon"></div>');


        spawnCount++;

        failedHit();

        accuracyCalc();
        console.log(spawnCount);



    } else if (spawnCount < 30) {


        killSwitch();
        timer.stop();
        timer.start();

        var numberGen = Math.floor((Math.random() * 132) + 1);


        var spawnPoint = "#spawn-point-".concat(numberGen);

        $(spawnPoint).append(`<div class="target" onclick= "hitCounter++ ;successfulHit(); killSwitch(); failedHit();"   id="targetIcon"></div>`);


        spawnCount++;

        failedHit();

        accuracyCalc();

        console.log(spawnCount);


    } else {
        killSwitch();
        timer.stop();
        failedHitFinal();
    }


};

function killSwitch() {
    $("#targetIcon").remove();

};







// functions to record successful hits / every time a target is missed / Accuracy calc 

function successfulHit() {

    hitDom.text(hitCounter)

}




function failedHit() {


    var missCounter = (spawnCount - 1) - hitCounter ;

  
        missDom.text(missCounter);
    


    };

function failedHitFinal(){
    var missCounter = spawnCount  - hitCounter ;

  
    missDom.text(missCounter);
}


function accuracyCalc(hits, spawned) {
    hits = hitCounter;
    spawned = spawnCount;

    var accuracyTotal = hits * 100 / spawned;
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    accuracyDom.text(accuracyRounded, '%')
};

// Timer function to reset the interval everytime a target is hit. (by jfriend00 on Stack Overflow) credit in read me 

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}