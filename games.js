var userClickedPattern=[];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started= false;

var level=0;


$(document).keypress( function(){
  
  if(!started){
    nextSequence();
    started=true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
  $("#level-title").text("Level "+level);
  level++;
}


$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else console.log("wrong");
}




function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(CurrentColour){
  $("#"+ CurrentColour).addClass("pressed");
  setInterval( function(){
    $("#"+CurrentColour).removeClass("pressed");
  }, 100);
}