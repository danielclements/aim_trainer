$(document).ready(function () {
    gameTheme.play();


   
});


// Variables 

var difficulty = difficultySelector();

var hitCounter = 0;
var timerPro = new Timer(function () {
    targetSpawner();
}, difficulty);
var spawnCount = 0;
var gameState = false;
var gameOutCome;
var playerName = "Player_1";
var startingTimer = 3;
countDown();

const targetId = $("#targetIcon");
const hitDom = $("#hit-counter");
const missDom = $("#missed-counter");
const accuracyDom = $("#accuracy-counter")




//difficulty selector 

function difficultySelector(){
    if (localStorage.getItem("difficulty") == "pro") {
        difficulty = 800;
    } else if (localStorage.getItem("difficulty") == "beginner") {
        difficulty = 1100
    }

    else{
        difficulty = 800
    };

    return(difficulty);
};

// targets selector

function targetSelector(){

    if (localStorage.getItem("target") == "alien"){
        return(alienRandomizer());
    } else if (localStorage.getItem("target") == "fruit"){
        return(fruitRandomizer());
    }

    else{
        return(alienRandomizer());
    }
};


//countdown

function countDown() {
    if (startingTimer > -1) {
        setTimeout(function () {
            if (startingTimer == 0) {
                $('#spawn-point-67').html('<p class="text-light count-down-text">go</p>');
                setTimeout(function () {
                    $('#spawn-point-67').html('');
                    timerPro.start();
                }, 500)
            }
            if (startingTimer !== 0) {
                timerPro.stop();
                $('#spawn-point-67').html(`<p class="text-light count-down-text">${startingTimer}</p>`);
                startingTimer--;
                countDown();
            }
        }, 500);
    }
};





// Spawner 

// master function used to call all the peer functions that make up the spawner 

function targetSpawner() {



    if (spawnCount <= 29) {
        killSwitch();
        timerPro.stop();
        timerPro.start();
        $(spawner()).append(`<div class="target" onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); "   id="targetIcon">${targetSelector()}</div>`);
        spawnCount++;
        failedHitDomPusher();
        accuracyCalc();

    } else if (spawnCount = 30) {
        killSwitch();
        timerPro.stop();
        timerPro.start();
        // changed the onlick on target to stop spawning further tagets on click 
        $(spawner()).append(`<div class="target" onclick= "hitCounter++ ;successfulHit(); killSwitch(); failedHit();"   id="targetIcon"></div>`);
        spawnCount++;
        failedHitDomPusher();
        accuracyCalc();


        // after 30 targets spawn the killswtich is toggled to remove any targets left on screen,
        // stopping the timer stops the interval from calling the spawner function again
        // then calls the failedHitFinal function to display the amount of targets missed
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



// the successfulHit function will play the hit sound when called and will also push the current count of hitCounter to the Dom.

function successfulHit() {
    hitSound.play();
    hitDom.text(hitCounter);
};



// simple function to determine how many tagets have been missed , gets the value of spawnCount then subtracts the value of hit counter,
// function will return the amount of targets that have been missed. 
// the function was causing a few issues, as soon as the first target spawns the game was displaying you had already missed a target this is 
// the reason we subtract 1 to the spawnCount 

function failedHit() {
    var missCounter = (spawnCount - 1) - hitCounter;
    return (missCounter)
};

//function used to update the dom with the vaule of failedHit function

function failedHitDomPusher() {
    missDom.text(failedHit());
};


//this function adds that final target back in to the mix to calculate the final amount of targets missed at the end of the game. 
function failedHitFinal() {
    var missCounter = spawnCount - hitCounter;
    missDom.text(missCounter);
};



// accuracyCalc is a simple equation to calculate the accuracy percentage of the player

// spawnCounter =  100%
// hitCounter   =  X 

// the value of spawnCount = 100% so the value of hit count = X 
// to calculate the percentage we multiply hitCounter by 100 then divide it by spawnCount, this gives us the value of X
// X = the players accuracy.

// spawnCounter = 100%
// hitCounter   =  X 

function accuracyCalc() {
    hits = hitCounter;
    spawned = spawnCount;

    var accuracyTotal = hits * 100 / spawned;
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    return (accuracyRounded);
};


//function used to push the accuracy percentage to the Dom.

function accuracyDomPusher() {
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



// target selector function uses a random number generator to decide what target to display 




function fruitRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img src="assets/images/targets/8-bitBanana.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img src="assets/images/targets/8-BitCherry.png">';
        return (target);
    } else {
        var target = '<img src="assets/images/targets/8-bitWatermelon.png">';
        return (target);
    }
};



function alienRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img src="assets/images/targets/boss-1.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img src="assets/images/targets/boss-2.png">';
        return (target);
    } else {
        var target = '<img src="assets/images/targets/boss-3.png">';
        return (target);
    }
};