$(document).ready(function () {

    // checks what the value of theme has been saved to and calls the correct theme 

    if (localStorage.getItem("theme") == "light") {

        lightSwitch();

    } else if (localStorage.getItem("theme") == "dark") {


        darkSwitch();
    };

    //checks the value of audio to determine what function to call 

    if (localStorage.getItem("audio") == "off") {

        audioOff();
    } else if (localStorage.getItem("audio") == "On") {

        audioOn();

    };

    //checks the value of difficulty to determine what function to call 

    if (localStorage.getItem("difficulty") == "beginner") {
        difficultyBeginner();
    } else if (localStorage.getItem("difficulty") == "pro") {
        difficultyPro();
    } else if (localStorage.getItem("difficulty") == "extreme"){
        difficultyExtreme();
    }


    //checks the value of target to determine what function to call 

    if (localStorage.getItem("target") == "alien") {
        alienTargets();
    } else if (localStorage.getItem("target") == "fruit") {
        fruitTargets();
    };
});


// 


// Audio


var introMusic = new Audio();
introMusic.src = "assets/audio/273539__tristan-lohengrin__8bit-introduction.wav";
introMusic.volume = 0.09;

var gunSound = new Audio();
gunSound.src = "assets/audio/404795__owlstorm__retro-video-game-sfx-laser-2.wav";

var hitSound = new Audio();
hitSound.src = "assets/audio/431329__someguy22__8-bit-powerup.wav";
hitSound.volume = 0.09;

var menuSound = new Audio();
menuSound.src = "assets/audio/350863__cabled-mess__blip-c-03.wav";


var gameTheme = new Audio();
gameTheme.src = "assets/audio/Mecha Collection.mp3";
gameTheme.volume = 0.09;



// Themes 


// toggles the theme  by adding a local storage item, used on page load to determine whether to load the light or dark theme 

function lightSwitch() {
    localStorage.setItem("theme", "light");

    $("body").css("background-color", "#ffdede");
    $("#darkModeToggle").removeClass("btn-success").addClass("btn-secondary");
    $("#lightModeToggle").removeClass("btn-secondary").addClass("btn-success");
    $("#rules-color").addClass("rules-info-light");
    $(".settings-containers").addClass("settings-containers-light");
    $(".header-game-mode").removeClass("white");
    $(".game-area").addClass("game-area-light");
    $(".index-header").addClass("index-header-light");
    $(".about-para").removeClass("white");
    $(".rules-header").removeClass("white");
    $("#player-user").addClass("user-name-light");
    $(".stat-hits").addClass("btn-success").removeClass("stat-hits").addClass("stat-hits-light");
    $(".stat-missed").addClass("btn-danger").removeClass("stat-missed").addClass("stat-missed-light");
    $(".high-score").addClass("high-score-light");
    $("#stats-header").removeClass("white");
    $(".stat-user").removeClass("stat-user").addClass("stat-user-light");
    $(".stat-accuracy").removeClass("stat-accuracy").addClass("stat-accuracy-light");

};


function darkSwitch() {
    localStorage.setItem("theme", "dark");

    $("body").css("background-color", "");
    $("#lightModeToggle").removeClass("btn-success").addClass("btn-secondary");
    $("#darkModeToggle").removeClass("btn-secondary").addClass("btn-success");
    $("#rules-color").removeClass("rules-info-light");
    $(".settings-containers").removeClass("settings-containers-light");
    $(".header-game-mode").addClass("white");
    $(".game-area").removeClass("game-area-light");
    $(".index-header").removeClass("index-header-light");
    $(".about-para").addClass("white");
    $(".rules-header").addClass("white");
    $("#player-user").removeClass("user-name-light")
    $(".stat-hits-light").removeClass("btn-success").addClass("stat-hits").removeClass("stat-hits-light");
    $(".stat-missed-light").removeClass("btn-danger").addClass("stat-missed").removeClass("stat-missed-light");
    $(".high-score-light").removeClass("high-score-light");
    $("#stats-header").addClass("white");
    $(".stat-user-light").addClass("stat-user").removeClass("stat-user-light");
    $(".stat-accuracy-light").addClass("stat-accuracy").removeClass("stat-accuracy-light");
};



// audio toggle 


// toggles volume off and on , again using local stoarge to store the audio state across both pages. Checks local storage item to
// determine what audio function to call 

function audioOff() {
    localStorage.setItem("audio", "off");

    $("#audioOff").removeClass("btn-secondary").addClass("btn-danger");
    $("#audioOn").removeClass("btn-success").addClass("btn-secondary");
    hitSound.volume = 0;
    introMusic.volume = 0;
    gameTheme.volume = 0;
};


function audioOn() {
    localStorage.setItem("audio", "on");

    $("#audioOff").addClass("btn-secondary").removeClass("btn-danger");
    $("#audioOn").addClass("btn-success").removeClass("btn-secondary");


    introMusic.volume = 0.09;
    hitSound.volume = 0.09;
    gameTheme.volume = 0.09;
};


//dificulty toggle that uses local storage to store the difficulty state and apply it across both pages,
// if statment called in the document ready function determines what to call 



function difficultyPro() {
    localStorage.setItem("difficulty", "pro");

    $("#pro").addClass("btn-success").removeClass("btn-secondary");
    $("#beginner").removeClass("btn-success").addClass("btn-secondary");
    $("#extreme").removeClass("btn-success").addClass("btn-secondary");
};


function difficultyBeginner() {
    localStorage.setItem("difficulty", "beginner");

    $("#beginner").addClass("btn-success").removeClass("btn-secondary");
    $("#pro").addClass("btn-secondary").removeClass("btn-success");
    $("#extreme").removeClass("btn-success").addClass("btn-secondary");
};

 
function difficultyExtreme(){
localStorage.setItem("difficulty", "extreme")

$("#extreme").addClass("btn-success").removeClass("btn-secondary");
$("#beginner").addClass("btn-secondary").removeClass("btn-success");
$("#pro").addClass("btn-secondary").removeClass("btn-success");

};

//target toggle that uses local storage to store the target state and apply it across both pages,
// if statment called in the document ready function determines what to call 


function alienTargets() {
    localStorage.setItem("target", "alien");

    $("#alienToggle").addClass("btn-success").removeClass("btn-secondary");
    $("#fruitToggle").removeClass("btn-success").addClass("btn-secondary");
};


function fruitTargets() {
    localStorage.setItem("target", "fruit");

    $("#fruitToggle").addClass("btn-success").removeClass("btn-secondary");
    $("#alienToggle").addClass("btn-secondary").removeClass("btn-success");
};



function replayBtn(){

    
}