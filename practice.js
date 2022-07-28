var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence();
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLength){
    if(userClickedPattern[currentLength]!=gamePattern[currentLength]){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
    if(currentLength+1===gamePattern.length){
        setTimeout( function(){
            nextSequence()
        },1000);
    }
}

function startover(){
    gamePattern = [];
    level = 0;
    started = false;
}

function playSound(currentColor){
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}