let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let match_status = false;

function playSound(name){
    new Audio('./sounds/' + name + '.mp3').play();
}

function nextSequence(){
    userClickedPattern=[];
    ++level;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.round(Math.random()*3);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(document).keydown(function(){
    if(!match_status){
        nextSequence();
        match_status = true;
    }
});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        $("#level-title").text("GAME OVER, Press any key to restart");
        new Audio('./sounds/wrong.mp3').play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        level = 0;
        gamePattern = [];
        match_status = false;
    }
}

$(".btn").click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
