$(document).ready(function () {

//The if statment below updates the highscore stat on the left with what ever difficulty
//has been selected.

    if (localStorage.getItem("difficulty") == "pro") {
        $('#highScore').html(localStorage.getItem('pro-high-score'));
        $('#highScoreUser').html(localStorage.getItem('user-pro-high-score'));

    } else if (localStorage.getItem("difficulty") == "beginner")  {
        $('#highScore').html(localStorage.getItem('easy-high-score'));
        $('#highScoreUser').html(localStorage.getItem('user-easy-high-score'));

    } else if (localStorage.getItem("difficulty") == "extreme"){
        $('#highScore').html(localStorage.getItem('extreme-high-score'));
        $('#highScoreUser').html(localStorage.getItem('extreme-easy-high-score'));
    };

// checks to see if the usre defined a user name, if no name was defined then player name is 
// set to player.
    if(localStorage.getItem("playerName") == ""){
        localStorage.setItem("playerName","Player");
    };
    
    
    setTimeout(function(){
        gameTheme.play();
    },200);

// updates the stats area user name box with current username saved in local storage.   
    
    $("#user-name-game").text(localStorage.getItem("playerName"));
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
const accuracyDom = $("#accuracy-counter");
const userName = $("#player-user").val();



// difficulty selector  uses the local storage item set on the index page to determine what difficulty to start at,
// if no difficulty is selected it automatically selects 800ms aka Pro 
// it automatically selects pro difficulty as this is the default on first time load .

function difficultySelector() {
    if (localStorage.getItem("difficulty") == "pro") {
        difficulty = 750;
    } else if (localStorage.getItem("difficulty") == "beginner") {
        difficulty = 1000;
    } else if (localStorage.getItem("difficulty") == "extreme"){
        difficulty = 600;

    } else {
        difficulty = 700;
    };

    return (difficulty);
};

// targets selector uses local storage to determine the value of target to determine what targets to display on screen
// if not targets are selected on the index page resulting in no local store items being saved,
// it automatically selects Alien targets as this is the default on first time load.

function targetSelector() {

    if (localStorage.getItem("target") == "alien") {
        return (alienRandomizer());
    } else if (localStorage.getItem("target") == "fruit") {
        return (fruitRandomizer());
    } else {
        return (alienRandomizer());
    }
};


//countdown function used to start a 3, 2 ,1 go at the start of the game, 
//as before the game would start as soon as the aim_trianer page was loaded and gave no good indication of game begining.

function countDown() {
    killSwitch();
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
        $(spawner()).append(`<div class="target"    id="targetIcon">${targetSelector()}</div>`);
        spawnCount++;
        accuracyDomPusher();


        // after 30 targets spawn the killswtich is toggled to remove any targets left on screen,
        // stopping the timer stops the interval from calling the spawner function again
        // then calls the failedHitFinal function to display the amount of targets missed
    } else {
        killSwitch();
        timerPro.stop();
        failedHit();
        failedHitFinal();
        highScore();
        setTimeout(function () {
            
            endGameModal();
            
            $('#endGameModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }, 200);

       
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
    return(missCounter);
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

    var accuracyTotal = hits * 100 / (spawned -1 );
    var accuracyRounded = Math.round(accuracyTotal * 100) / 100;

    return (accuracyRounded);
};


//function used to push the accuracy percentage to the Dom.

function accuracyDomPusher() {
    accuracyDom.text(accuracyCalc());
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

// fruitRandomizer uses  math.random to calculate a number between 1 - 3
// each fruit is assigned to a diffrent number, using a simple if statment the function will
// determine what fruit to show.

function fruitRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitBanana.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitCherry.png">';
        return (target);
    } else {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/8-bitWatermelon.png">';
        return (target);
    }
};

// alienRandomizer uses math.random to calculate a number between 1 - 3
// each alien is assigned to a diffrent number, using a simple if statment the function will
// determine what alien to show.

function alienRandomizer() {

    var numberGen = Math.floor((Math.random() * 3) + 1);



    if (numberGen == 1) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-1.png">';
        return (target);
    } else if (numberGen == 2) {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-2.png">';
        return (target);
    } else {
        var target = '<img onclick= "targetSpawner(); hitCounter++ ;successfulHit();failedHit(); accuracyDomPusher(); " src="assets/images/targets/boss-3.png">';
        return (target);
    }
};


//End game modal that updates with end of game stats

function endGameModal(){
    $("#player-name-modal").text(localStorage.getItem("playerName"));
    $("#total-hit-modal").text(hitCounter);
    $("#total-misses-modal").text(failedHitFinal);
    $("#accuracy-modal").text(accuracyCalc() + "%");
};



// High score 

// This function uses the same the local storage variable for difficulty,
// The if stamtent is checking the difficulty setting then with in these if statments we have further
// if statments that compare the current score to the local storage item of high score
// if current score > local storage high score then the game will update the score and user name as a
// Local storage item

function highScore(){
    

    if (localStorage.getItem("difficulty") == "pro") {
        
        var currentHighScore = localStorage.getItem("pro-high-score")
        var currentUserName = localStorage.getItem("playerName");
        

        if (hitCounter > currentHighScore){
            localStorage.setItem('pro-high-score', hitCounter);
            localStorage.setItem('user-pro-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);

        }

    } else if (localStorage.getItem("difficulty") == "beginner") {
        var currentHighScore = localStorage.getItem("easy-high-score");
        var currentUserName = localStorage.getItem("playerName");
        
        if (hitCounter > currentHighScore){
            localStorage.setItem('easy-high-score', hitCounter);
            localStorage.setItem('user-easy-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);

        }
       
    } else if (localStorage.getItem("difficulty") == "extreme"){
        
        var currentHighScore = localStorage.getItem("extreme-high-score");
        var currentUserName = localStorage.getItem("playerName");
        
        if (hitCounter > currentHighScore){
            localStorage.setItem('extreme-high-score', hitCounter);
            localStorage.setItem('user-extreme-high-score',currentUserName);
            $('#highScore').html(hitCounter);
            $('#highScoreUser').html(currentUserName);
        }

    }
};