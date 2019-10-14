$( document ).ready(function() {
    if (localStorage.getItem("theme") == "light") {

        lightSwitch();
    }

    else if (localStorage.getItem("theme") == "dark") {

    
        darkSwitch();
    };

    if (localStorage.getItem("audio") == "off") {

        audioOff();
    }

    else if (localStorage.getItem("audio") == "On") {

        audioOn();

    };
});


// Audio


var introMusic = new Audio();
introMusic.src = "assets/audio/273539__tristan-lohengrin__8bit-introduction.wav";

var gunSound = new Audio();
gunSound.src = "assets/audio/404795__owlstorm__retro-video-game-sfx-laser-2.wav";

var hitSound = new Audio();
hitSound.src = "assets/audio/431329__someguy22__8-bit-powerup.wav";
hitSound.volume = 0.09;

var menuSound = new Audio();
menuSound.src = "assets/audio/350863__cabled-mess__blip-c-03.wav";



// Themes 

function lightSwitch(){
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
}


function darkSwitch(){
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
    
}


// audio toggle 

function audioOff(){
    localStorage.setItem("audio", "off");

    $("#audioOff").removeClass("btn-secondary").addClass("btn-danger");
    $("#audioOn").removeClass("btn-success").addClass("btn-secondary");
    hitSound.volume = 0;
}


function audioOn(){
    localStorage.setItem("audio", "on");

    $("#audioOff").addClass("btn-secondary").removeClass("btn-danger");
    $("#audioOn").addClass("btn-success").removeClass("btn-secondary");

    hitSound.volume = 0.09;
}