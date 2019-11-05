$(document).ready(function () {

    //checks if any of the local storage items for settings have been set , if they are undefined it will
    //set the defaults.

    if(localStorage.getItem("difficulty") == undefined){
        localStorage.setItem("difficulty","pro")
    };

    if (localStorage.getItem("theme") == undefined){
        localStorage.setItem("theme", "dark")
    };

    if (localStorage.getItem("target") == undefined){
        localStorage.setItem('target', "alien")
    };

    if (localStorage.getItem("audio") == undefined){
        localStorage.setItem("audio", "off")
    };

    $("#player-name-intro").val(localStorage.getItem("playerName"))
    
    // calls the intro theme on page load 

    
    $('#userNameModal').modal({
        backdrop: 'static',
        keyboard: false
    });

    setTimeout(function () {
        introMusic.play();
    }, 1500);

    // interval for the target spawner , calss the function every 1000ms

    setInterval(() => {
        targetSpawner();


    }, 1000);


    console.log("ready!");
});





// target spawner similar to the one used in the aim_trainer page. This function is called on the index page as a example of how the game works.

function targetSpawner() {


    killSwitch();

    var numberGen = Math.floor((Math.random() * 132) + 1);


    var spawnPoint = "#spawn-point-".concat(numberGen);


    $(spawnPoint).append('<div class="intro-target" id="targetIcon"> <i class="fas fa-bullseye target"></i></div>');




}

//used to remove any excess targets that could be left with in the spawn area. 

function killSwitch() {
    $("#targetIcon").remove();

};


function userNameModal() {
    playerName = $('#player-name-intro').val();
    localStorage.setItem('playerName', playerName);
};