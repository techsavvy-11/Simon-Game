let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let match_status = false;

function playSound(name){
    new Audio('./sounds/' + name + '.mp3').play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    ++level;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.round(Math.random()*3);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

$(document).keydown(function(){
    if(!match_status){
        nextSequence();
        match_status = true;
    }
});
