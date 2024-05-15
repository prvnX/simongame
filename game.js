var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var totPoints=0;
function nextSequence(){
    if(totPoints>5000){
    Winner();
    }
    else{
    gameLevel++;
    $("p").remove();
    $("h1").text("Level "+gameLevel);
    var randomNo=Math.random();
    var randomNo=Math.floor(randomNo*4);
    randomChosenColor=buttonColors[randomNo];
    gamePattern.push(randomChosenColor);
    //flash the button
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    //play sound
    playSound(randomChosenColor);
    }
}

$(".btn").click(function(){
    if(gameLevel>0){
            var userChosenColor=$(this).attr("id");
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor);
            animateBtn(userChosenColor);
            if(checkUserPattern()==false){
                    wrongPattern();
            }
            else if(userClickedPattern.length==gamePattern.length){
                    totPoints=totPoints+(10*gameLevel);
                    i=0;
                    cleanArray(userClickedPattern); 
                    setTimeout(function(){
                        nextSequence();
                    },1000);
            }

        }
        }
);

var i=0;
var gameLevel=0;
//game start and gameplay
$(document).keypress(function(e){
    $(".img").addClass("hide");
    $("body").removeClass("winner");
    $(".container").show();
    setTimeout(function(){
    if(gameLevel==0){
        nextSequence();
    }
    },1000);
});

//check the user's pattern
function checkUserPattern(){
    var flag=false;
    var userLength=userClickedPattern.length;
    var gameLength=gamePattern.length;
    if(gamePattern[i]==userClickedPattern[i]){
                flag=true;
                i++;
        }
        else{
            flag=false;
        }
        return flag;
}
//wrong pattern
function wrongPattern(){
    gameLevel=0;
    cleanArray(gamePattern);
    cleanArray(userClickedPattern);
    $("h1").text("Oops! GAME OVER, Shall We Try Again?");
    $("h1").after("<p>You got "+(totPoints)+" Points.<br>Press Any Key to play Again");
    $("body").addClass("warning");
    new Audio("sounds/wrong.mp3").play();
    setTimeout(function(){
        $("body").removeClass("warning");
        $(".container").fadeToggle();
    }
    ,300);
    totPoints=0;
}

//win the game
function Winner(){
        gameLevel=0;
        cleanArray(gamePattern);
        cleanArray(userClickedPattern);
        $("h1").text("We have a WINNER");
        $("h1").after("<p>You got "+(totPoints)+" Points.<br>Press Any Key to play Again");
        $("body").addClass("winner");
        new Audio("sounds/drummusic.mp3").play();
        setTimeout(function(){
            $(".container").fadeToggle();
            $(".img").removeClass("hide");
        }
        ,100);
        totPoints=0;

}
//clean UserArray
function cleanArray (Array) {
    var Length=Array.length;
    for(var i=0;i<Length;i++){
        Array.pop();
    }
  }

//animate and play sound
function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animateBtn(btnid){
    $("#"+btnid).addClass("pressed");
    
    setTimeout(function(){
        $("#"+btnid).removeClass("pressed");
    },100);
}