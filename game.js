var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

function startOver() {
    start = false;
    level = 0;
    gamePattern = [];
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}
$(document).on("keypress", function () {
    if (start === false) {
        nextSequence();
        start = true;
    }
})

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass('game-over');
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over Press Any Key To Restart");
        startOver();
    }
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})


