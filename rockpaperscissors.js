// if a game is already running, ask for cancellation, otherwise start a new game
// if new game then:
// message: new game started
// create two player objects, one for computer, one for human
// get game ui ready
// message: Five rounds are to be played. Each round starts with a timer of 10 seconds. 
//          Within the timer you have to decide between stone, scissors or paper.
// repeat five times:
// message: round++
// start the timer
// message: make your choice!
// wait for user input
// run getRandomGesture() for computer player
// check which player has won 
// message: ... wins!

//create game class
class game {
    constructor() {
        this.isAlreadyPlaying = false;
        this.round = 0;
    }

    setScoreCounterPlayer(score = 0) {
        let scoreCounterPlayer = document.querySelector(".score-counter-player");
        scoreCounterPlayer.innerHTML = "‹" + score + "›";
    };

    setScoreCounterComputer(score = 0) {
        let scoreCounterComputer = document.querySelector(".score-counter-computer");
        scoreCounterComputer.innerHTML = "‹" + score + "›";
    };

    setRoundCounter() {
        let roundCounter = document.querySelector(".round-counter");
        roundCounter.innerHTML = this.round;
    };

    setPlayerMessage(state) {
        let playerAttention = document.querySelector(".player-attention");

        switch (state) {
            case "init1":
                playerAttention.innerHTML = "Take the challenge and play five rounds against the computer";
                break;
            case "init2":
                playerAttention.innerHTML = "Each round starts with a timer of 10 seconds";
                break;
            case "init3":
                playerAttention.innerHTML = "Within the timer you have to decide between rock, scissors or paper";
                break;
            case "newGame":
                playerAttention.innerHTML = "Are you ready to rock?";
                break;
            case "attention2":
                playerAttention.innerHTML = "";
        };
    };

    //toggle between "round counter" and "vs"
    toggleRoundCounter(isVisible) {
        if (isVisible) {
            let roundCounterContainer = document.querySelector(".container-round-counter");
            roundCounterContainer.style.transform = "translateY(0px)";
        } else {
            let roundCounterContainer = document.querySelector(".container-round-counter");
            roundCounterContainer.style.transform = "translateY(-180px)";
        }
    };

    //toggle between gesture selector is visible or not
    toggleGestureSelector(isVisible) {
        if (isVisible) {
            let gestureSelectorContainer = document.querySelector(".container-change-player-gesture-wrapper");
            gestureSelectorContainer.style.transform = "translateX(0px)";
        } else {
            let gestureSelectorContainer = document.querySelector(".container-change-player-gesture-wrapper");
            gestureSelectorContainer.style.transform = "translateX(100px)";
        }
    };

    //toggle game state modal 
    toggleGameStateModal(state) {
        if (state) {
            let gameStateModal = document.querySelector(".container-game-state-modal");
            let gameStateImg = document.querySelector(".game-state-img");
            switch (state) {
                case "draw":
                    gameStateImg.src = "/material/draw.svg";
                    break;
                case "get_ready":
                    gameStateImg.src = "/material/get_ready.svg";
                    break;
                case "computer_wins":
                    break;
                case "player_wins":
                    gameStateImg.src = "/material/player_wins.svg";
            };
            gameStateModal.style.display = "grid";
        } else {
            let gameStateModal = document.querySelector(".container-game-state-modal");
            gameStateModal.style.display = "none";
        }
    }

    //game initializer
    gameInit() {
        //set score counter for both players to "0"
        this.setScoreCounterComputer();
        this.setScoreCounterPlayer();

        //set round counter to "0"
        this.setRoundCounter();

        //hide unneeded ui elements

        //hide any game state
        this.toggleGameStateModal(false);
        //show "vs" instead of the "round counter"
        this.toggleRoundCounter(false);
        //hide gesture selector arrows
        this.toggleGestureSelector(false);

        //initial player message loop
        let messageLoopArray = ["init1", "init2", "init3"];
        let loopIndex = 0;
        let buttonAnimationClass = document.querySelector(".play-now-button");
        buttonAnimationClass.classList.add("play-now-button-animation");

        let messageLoopInterval = setInterval(() => {
            this.setPlayerMessage(messageLoopArray[loopIndex]);
            loopIndex++;
            if (loopIndex === 3) loopIndex = 0;
        }, 4000);

        //add eventhandler to buttons

        let playNowButton = document.querySelector(".play-now-button");
        playNowButton.addEventListener("click", () => {
            clearInterval(messageLoopInterval);
            this.startNewGame();
        });

    };

    startNewGame() {
        let buttonAnimationClass = document.querySelector(".play-now-button");
        buttonAnimationClass.classList.remove("play-now-button-animation");
        this.setPlayerMessage("newGame");
        setTimeout(() => {
            this.toggleRoundCounter(true);
            //hide gesture selector arrows
            this.toggleGestureSelector(true);
        }, 200);
    }

    playSingleRound(human, computer) {
        human.gesture = human.gesture.toLowerCase();
        //return value which player wins
        let winner = "";

        // game logic:
        // if human.gesture == Rock and computer.gesture == Paper then computer wins => count computer.wins +1
        // if human.gesture == Rock and computer.gesture == Scissors then player wins => count player.wins +1
        // if human.gesture == Rock and computer.gesture == Rock then draw 
        // if human.gesture == Scissors and computer.gesture ==  Paper then player wins => count player.wins +1
        // if human.gesture == Scissors and computer.gesture ==  Rock then computer wins => count computer.wins +1
        // if human.gesture == Scissors and computer.gesture ==  Scissors then draw
        // if human.gesture == Paper and computer.gesture ==  Paper then draw 
        // if human.gesture == Paper and computer.gesture ==  Rock then player wins => count player.wins +1
        // if human.gesture == Paper and computer.gesture ==  Scissors then computer wins => count computer.wins +1

        if (((human.gesture === "rock") && (computer.gesture === "paper")) || ((human.gesture === "scissors") && (computer.gesture === "rock")) || ((human.gesture === "paper") && (computer.gesture === "scissors"))) {
            winner = "computer";
            console.log("computer wins");

        } else if (((human.gesture === "rock" && computer.gesture === "scissors")) || ((human.gesture === "scissors") && (computer.gesture === "paper")) || ((human.gesture === "paper") && (computer.gesture === "rock"))) {
            winner = "human";
            console.log("player wins");
        } else {
            winner = "draw";
            console.log("draw!");
        }
        return winner;
    };
};

//create player class 
class player {
    constructor(type) {
        this.type = type;
        this.gesture = "";
        this.wins = 0;
        this.isReady = false;
    };

    //make a random decision whether to use stone, paper, or scissors
    getRandomGesture() {
        //create empty string variable randomGesture
        let randomGesture = "";
        //get random integer with a value of 0, 1 or 2
        let getRandomInt = Math.floor(Math.random() * 3);
        // if return value from getRandomInt == 0 then botCounterpartGesture is "rock"
        // if return value from getRandomInt == 1 then botCounterpartGesture is "paper"
        // if return value from getRandomInt == 2 then botCounterpartGesture is "scissors"
        switch (getRandomInt) {
            case 0:
                randomGesture = "rock";
                break;
            case 1:
                randomGesture = "paper";
                break;
            case 2:
                randomGesture = "scissors";
        };
        return randomGesture;
    };

    stepUpGesture() {
        if (this.gesture === "hello") {
            this.gesture = "rock";
            this.setUiGesture();
        } else if (this.gesture === "rock") {
            this.gesture = "scissors";
            this.setUiGesture();
        } else if (this.gesture === "scissors") {
            this.gesture = "paper";
            this.setUiGesture();
        } else if (this.gesture === "paper") {
            this.gesture = "rock";
            this.setUiGesture();
        };
    };

    stepDownGesture() {
        if (this.gesture === "hello") {
            this.gesture = "paper";
            this.setUiGesture();
        } else if (this.gesture === "paper") {
            this.gesture = "scissors";
            this.setUiGesture();
        } else if (this.gesture === "scissors") {
            this.gesture = "rock";
            this.setUiGesture();
        } else if (this.gesture === "rock") {
            this.gesture = "paper";
            this.setUiGesture();
        };
    };

    //set gesture
    setUiGesture() {
        let gesturePlayer = document.querySelector(".gesture-" + this.type);
        switch (this.gesture) {
            case "hello":
                gesturePlayer.src = `/material/hello_${this.type}.svg`
                break;
            case "rock":
                gesturePlayer.src = `/material/rock_${this.type}.svg`;
                break;
            case "scissors":
                gesturePlayer.src = `/material/scissors_${this.type}.svg`;
                break;
            case "paper":
                gesturePlayer.src = `/material/paper_${this.type}.svg`;
        };
    };
};

let newGame = new game();

newGame.gameInit();

//create an object computer of class player and set type = computer
let computer = new player("computer");

//create an object human of class player and set type = human
let human = new player("human");

let arrowUpButton = document.querySelector(".up-arrow");
arrowUpButton.addEventListener("click", human.stepUpGesture());

let arrowDownButton = document.querySelector(".down-arrow");
arrowDownButton.addEventListener("click", human.stepDownGesture());

//create a variable for the evaluation who has won
let winnerOfRound = "";