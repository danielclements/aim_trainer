$( document ).ready(function() {
 
    introMusic.play();

   setInterval(() => {
       targetSpawner();
       
   }, 1000);
    

    

    console.log( "ready!" );
});


function targetSpawner() {


    killSwitch();

    var numberGen = Math.floor((Math.random() * 132) + 1);


    var spawnPoint = "#spawn-point-".concat(numberGen);


    $(spawnPoint).append('<div class="intro-target" id="targetIcon"> <i class="fas fa-bullseye target"></i></div>');


    
    console.log(numberGen);
}


function killSwitch() {
    $("#targetIcon").remove();

};
