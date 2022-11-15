var mBall = document.querySelector('.moving-ball'),
    FullGameCon = document.querySelector('.game-container');
var RandomX, RandomY;
var DealayTime = 0.42,
    prevX, prevY;

    FullGameCon.addEventListener("dragstart", (e) => e.preventDefault())


mBall.addEventListener("mouseover", function(){
    RandomPosition();
    mBall.style.transitionDelay = DealayTime - (LevelNumber * 0.02)  + "s";
})


var balldistance,
    transitionSpeed;

function ballSpeed(){
    balldistance = ((prevY - RandomY) ** 2) + ((prevX - RandomX) ** 2);
    transitionSpeed = (Math.sqrt(balldistance) / 800).toFixed(4)
}


function RandomPosition(){

    prevX = mBall.offsetLeft;
    prevY = mBall.offsetTop;

    RandomX = Math.floor(Math.random() * 401);
    RandomY = Math.floor(Math.random() * 281);

    ballSpeed();
    mBall.style.transitionDuration = transitionSpeed + 's';

    mBall.style.left = RandomX + 'px';
    mBall.style.top = RandomY + 'px';

}


var StartButton = document.querySelector('.start-button'),
    textBox = document.querySelector('.player-name');

    textBox.addEventListener('keydown', function(e){
        if(e.which === 32){
            e.preventDefault();
        }
    })
    var textBoxValue;

StartButton.addEventListener('click', function(){
    if(!textBox.value == ""){
        GameIsOn = true;
        realTime = 15;
        showDisplay();
        textBoxValue = "LB-" + textBox.value;
        countdownT = setInterval(startTimer, 1000);
        CreateElement();
        CloseLeaderBoard();
        
        
    }else{
        if(scaling){
            textBox.style.animationName = "NameAnimate";
            scaling = false;
            setTimeout(function(){
                textBox.style.animationName = "none";
                scaling = true;
            }, 1500)
        }
    }
})

var countdownT,
    scaling = true;

window.addEventListener('load', function(){
    firstPage.classList.add('active-display');
    RandomPosition();
    TimeBox.innerHTML = realTime;
})

var firstPage = document.querySelector('.first-load'),
    mainDisplay = document.querySelector('.main-scene')



function showDisplay(){
    firstPage.classList.remove('active-display');
    mainDisplay.classList.add('active-display');
}


var realTime = 15;
var TimeBox = document.querySelector('.time-con span'),
    clickBox = document.querySelector('.click-numbers span');



function startTimer(){
    realTime--;
    TimeBox.innerHTML = realTime;
    if(realTime <= 0){
        clearInterval(countdownT);
        levelWin = false;
        levelfinished();
        WinAndLose();
        GetScores();
        Starcounting = 0;
        disableRestarButton();
    }
}


mBall.addEventListener('click',function(){
    BallClick();
    mBall.style.transitionDelay = "0s";
    RandomPosition();
})


var clickNumbers = 0;

function BallClick(){
    clickNumbers++;
    clickBox.innerHTML = clickNumbers;
    if(clickNumbers == 5){
        clearInterval(countdownT);
        levelfinished();
        levelWin = true;
        StarRating();
        GetScores();
        WinAndLose();
        disableRestarButton();
    }
}

var gameArea = document.querySelector('.game-display'),
    gameEndCon = document.querySelector(".game-end-con");

function levelfinished(){
    gameArea.style.filter = "blur(10px)";
    mainDisplay.style.pointerEvents = "none";
    gameEndCon.style.display = 'block';
    GameIsOn = false;

}

var resumeBtn = document.querySelector('.resume-button');

function nextLevel() {
    LevelNumber++;
    levelBox.innerHTML = LevelNumber;

}

resumeBtn.addEventListener('click', function(){
        if(levelWin){
            nextLevel();
        }
        GameIsOn = true;
        gameArea.style.filter = "blur(0px)";
        mainDisplay.style.pointerEvents = "all";
        gameEndCon.style.display = 'none';
        clickNumbers = 0;
        clickBox.innerHTML = clickNumbers;
        realTime = 15;
        TimeBox.innerHTML = realTime;
        countdownT = setInterval(startTimer, 1000);
        removeStarColor();
        if(BoardIsOpen){
           CloseLeaderBoard(); 
        }
})

var levelBox = document.querySelector('.game-level span'),
    LevelNumber = 1,
    levelWin = false,
    StarCountIncrease = 0;

function StarRating(){
    if(levelWin){
        if(realTime >= 10){
            // When there are 3 stars
            for(var i=0; i<star.length; i++){
                star[i].style.color = "#f7b731";
            }
            StarCountIncrease = 3;
            Starcounting += StarCountIncrease;
        }
        else if(realTime >= 8){
            // When there are 2 stars
            for(var i=0; i<star.length - 1; i++){
                star[i].style.color = "#f7b731";
            }
            StarCountIncrease = 2;
            Starcounting += StarCountIncrease;

        }else if(realTime >= 6){
            // When there are 1 stars
            star[0].style.color = "#f7b731";
            StarCountIncrease = 1;
            Starcounting += StarCountIncrease;
        }else{
            // 0 star 
            StarCountIncrease = 0;
        }
        console.log(Starcounting)
    }

}



var star = document.querySelectorAll('.star-con i'),
    RestartButton = document.querySelector('.restart-button');

RestartButton.addEventListener('click', function(){
    gameRestart();
    Starcounting -= StarCountIncrease

})

function gameRestart(){
    GameIsOn = true;
    gameArea.style.filter = "blur(0px)";
    mainDisplay.style.pointerEvents = "all";
    gameEndCon.style.display = 'none';
    clickNumbers = 0;
    clickBox.innerHTML = clickNumbers;
    realTime = 15;
    TimeBox.innerHTML = realTime;
    countdownT = setInterval(startTimer, 1000);
    removeStarColor();
    if(BoardIsOpen){
       CloseLeaderBoard(); 
    }
}


function removeStarColor() {
    for(var i=0; i<star.length; i++){
        star[i].style.color = "#dcdde1";
    }
}

var WinAndLoseTitle = document.querySelector('.game-end-title');

function WinAndLose() {
    if(levelWin){
        WinAndLoseTitle.style.letterSpacing = "2px";
        WinAndLoseTitle.innerHTML = "გილოცავთ, თქვენ მოიგეთ";

    }else{
        WinAndLoseTitle.style.letterSpacing = "0.5px";
        WinAndLoseTitle.innerHTML = "თქენ დამარცხდით, ცადეთ თავიდან";

    }
}
var BoardElement,
    createPlayerName,
    createPlayerLevel,
    createPlayerStars,
    leaderBCon = document.querySelector('.leader-board-con'),
    BoardInner = $('.board-inner');

function CreateElement() {
    if($('.board-inner').hasClass(textBoxValue)){
        
    }else{
        CreateElementItems();
    }
}


function CreateElementItems(){
    BoardElement = document.createElement('div');
    leaderBCon.appendChild(BoardElement);
    BoardElement.classList.add('board-inner');
    BoardElement.classList.add("LB-" + textBox.value);

    createPlayerName = document.createElement('div');
    BoardElement.appendChild(createPlayerName);
    createPlayerName.classList.add("inner-name");
    createPlayerName.innerHTML = textBox.value;

    createPlayerLevel = document.createElement('div');
    BoardElement.appendChild(createPlayerLevel);
    createPlayerLevel.classList.add("max-levels");
    createPlayerLevel.innerHTML = 0;

    createPlayerStars = document.createElement('div');
    BoardElement.appendChild(createPlayerStars);
    createPlayerStars.classList.add("star-numbers");
    createPlayerStars.innerHTML = 0;
}



var Starcounting = 0;


function GetScores(){
    if(parseInt($("." + textBoxValue).children('.max-levels').text()) <= LevelNumber){
        $("." + textBoxValue).children('.max-levels').text(LevelNumber);
        if(parseInt($("." + textBoxValue).children('.max-levels').text()) <= Starcounting){
            $("." + textBoxValue).children('.star-numbers').text(Starcounting);
        }
    }
}

var LbButton = document.querySelector('.leader-board-btn'),
    GameIsOn = false,
    BoardIsOpen = false,
    boardCan = true;


LbButton.addEventListener('click',function(){
    if(boardCan){
        if(!BoardIsOpen){
            if(GameIsOn){
                OpenLeaderBoard();
                gamePaused();

            }else{
                OpenLeaderBoard();
            }

        }else{
            CloseLeaderBoard();
            if(GameIsOn){
                setTimeout(gameResume,300)
            }
        }
        boardCan = false;
        setTimeout(function(){
            if(!AlertIsOn || !guideIsOpen){
                boardCan = true;
            }
        } , 500)
    }

})


function OpenLeaderBoard(){
    leaderBCon.style.transform = "translateX(0)";
    LbButton.style.backgroundColor = "#f1c40f";
    BoardIsOpen = true;
}

function CloseLeaderBoard(){
    leaderBCon.style.transform = "translateX(-255px)";
    LbButton.style.backgroundColor = "white";
    BoardIsOpen = false;
}

var homeBTN = document.querySelector('.home-btn'),
    homeScale = true;



homeBTN.addEventListener('click', function(){
    if(GameIsOn){
        gameEndAlert();

        
    }else{
            if(homeScale){
            homeBTN.style.animationName = "NameAnimate";
            homeScale = false;    
            setTimeout(function(){
                homeBTN.style.animationName = "none";
                homeScale = true; 

            }, 1000)
        }
    }
    if(BoardIsOpen){
        CloseLeaderBoard();
    }
    
})

var exitAlert = document.querySelector('.homeExit'),
    FullRestart = document.querySelector(".full-restart-button"),
    AlertIsOn = false;

function gameEndAlert(){
    gamePaused();
    exitAlert.style.display = "block";
    boardCan = false;
    GameIsOn = false;
    AlertIsOn = true;
}

function gamePaused(){
    clearInterval(countdownT);
    gameArea.style.filter = "blur(10px)";
    mainDisplay.style.pointerEvents = "none";
}

function gameResume(){
    
    gameArea.style.filter = "none";
    mainDisplay.style.pointerEvents = "all";
    countdownT = setInterval(startTimer, 1000);

}

function goHome(){
    if(!BoardIsOpen){
        firstPage.classList.add('active-display');
        mainDisplay.classList.remove('active-display');
        clearInterval(countdownT);
        realTime = 15;
        TimeBox.innerHTML = realTime;
        clickNumbers = 0;
        clickBox.innerHTML = clickNumbers;
        console.log('no')
    }
}

var Yesbtn = document.querySelector('.Yes-btn'),
    Nobtn = document.querySelector('.No-btn');

Yesbtn.addEventListener('click', function(){
    goHome();
    GetScores();
    exitAlert.style.display = "none";
    gameArea.style.filter = "none";
    mainDisplay.style.pointerEvents = "all";
    boardCan = true;
    AlertIsOn = false;
})

Nobtn.addEventListener('click', function(){
    gameResume();
    exitAlert.style.display = "none";
    GameIsOn = true;
    boardCan = true;
    AlertIsOn = false;

})

function disableRestarButton(){
    
    if(levelWin){
        RestartButton.classList.remove('disableclass');
        resumeBtn.classList.remove('disableclass')
    }else{
        RestartButton.classList.add('disableclass');
        resumeBtn.classList.add('disableclass')
    }
}

FullRestart.addEventListener('click', function(){
    LevelNumber = 1;
    levelBox.innerHTML = LevelNumber;
    GameIsOn = true;
    gameArea.style.filter = "blur(0px)";
    mainDisplay.style.pointerEvents = "all";
    gameEndCon.style.display = 'none';
    clickNumbers = 0;
    clickBox.innerHTML = clickNumbers;
    realTime = 15;
    TimeBox.innerHTML = realTime;
    countdownT = setInterval(startTimer, 1000);
    removeStarColor();
    if(BoardIsOpen){
       CloseLeaderBoard(); 
    }

})

var guidecon = document.querySelector('.guide-con'),
    guideBtn = document.querySelector('.guide-btn'),
    guideIsOpen = false;

guideBtn.addEventListener('click', function(){
    if(guideIsOpen){
        closeGuide();
        if(GameIsOn){
            gameResume();
        }

    }else{
        openGuide();
        CloseLeaderBoard();
        if(GameIsOn){
            gamePaused();
        }

    }


})

function openGuide() {
    guidecon.style.display = 'block';
    guideIsOpen = true;
    boardCan = false;
    guideBtn.style.backgroundColor = 'rgb(241, 196, 15)';

}

function closeGuide() {
    guidecon.style.display = 'none';
    guideIsOpen = false;
    boardCan = true;
    guideBtn.style.backgroundColor = 'white'

}

window.addEventListener('load', function(){
    gameload();
    marginbalance();
})

var deviceAlert = document.querySelector('.device-alert');
var marginValue = (window.innerHeight - 540)/2;

function gameload(){
    if(window.innerWidth >= 500 && window.innerHeight >= 540 ){
        FullGameCon.style.display = 'block';
        deviceAlert.style.display = 'none';
    }else{
        FullGameCon.style.display = 'none';
        deviceAlert.style.display = 'block';

    }
}

window.addEventListener('resize', function(){
    marginbalance();
    gameload();
})

var Fbody = document.querySelector('body');

function marginbalance(){
    if(window.innerHeight >= 540){
        Fbody.style.paddingTop = marginValue + "px";
    }else{
        Fbody.style.paddingTop = "0px"
    }

}