$( document ).ready(function() {
    if (localStorage.getItem("theme") == "light"){
        lightSwitch();
    }

    else if (localStorage.getItem("theme") == "dark"){

    
        darkSwitch();
    }
});



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
    
}


