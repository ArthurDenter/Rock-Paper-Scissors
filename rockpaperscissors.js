// if a game is already running, ask for cancellation, otherwise start a new game
// if new game then:
// message: new game started
// create two player objects, one for computer, one for player
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
    this._round = 0;
    this._winnerRound = "";
    this._winnerGame = "";
    this._scorePlayer = 0;
    this._scoreComputer = 0;
  }

  get round() {
    return this._round;
  };

  set round(value) {
    this._round = value;
  }

  get winnerRound() {
    return this._winnerRound;
  };

  set winnerRound(value) {
    this._winnerRound = value;
  };

  get winnerGame() {
    return this._winnerGame;
  };

  set winnerGame(value) {
    this._winnerGame = value;
  };

  get scorePlayer() {
    return this._scorePlayer;
  }

  set scorePlayer(value) {
    this._scorePlayer = value;
  };

  get scoreComputer() {
    return this._scoreComputer;
  }

  set scoreComputer(value) {
    this._scoreComputer = value;
  };

  setScoreCounterPlayer(score = 0) {
    let scoreCounterPlayer = document.querySelector(".score-counter-player");
    scoreCounterPlayer.innerHTML = "‹" + score + "›";
  };

  setScoreCounterComputer(score = 0) {
    let scoreCounterComputer = document.querySelector(".score-counter-computer");
    scoreCounterComputer.innerHTML = "‹" + score + "›";
  };

  async wait(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };

  async confettiProm(confetti) {
    return new Promise((resolve, reject) => {
      confetti.addConfetti({
        emojis: ['😊'],
        emojiSize: 70,
        confettiNumber: 30,
      });
      resolve();
    });
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
      case "init4":
        playerAttention.innerHTML = "↓↓↓";
        break;
      case "getready":
        playerAttention.innerHTML = "Are you ready to rock?";
        break;
      case "instructions":
        playerAttention.innerHTML = "Use the up- and down-arrow<br>to step through <br>rock, scissors or paper";
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
    };
  };

  //toggle between gesture selector is visible or not
  toggleGestureSelector(isVisible) {
    if (isVisible) {
      let gestureSelectorContainer = document.querySelector(".container-change-player-gesture-wrapper");
      gestureSelectorContainer.style.transform = "translateX(0px)";
    } else {
      let gestureSelectorContainer = document.querySelector(".container-change-player-gesture-wrapper");
      gestureSelectorContainer.style.transform = "translateX(100px)";
    };
  };

  //toggle game state modal 
  toggleGameStateModal(state) {
    if (state) {
      let gameStateModal = document.querySelector(".container-game-state-modal");
      let gameStateImg = document.querySelector(".game-state-img");
      switch (state) {
        case 10:
          gameStateImg.src = "/material/10.svg";
          break;
        case 1:
          gameStateImg.src = "/material/1.svg";
          break;
        case 2:
          gameStateImg.src = "/material/2.svg";
          break;
        case 3:
          gameStateImg.src = "/material/3.svg";
          break;
        case 4:
          gameStateImg.src = "/material/4.svg";
          break;
        case 5:
          gameStateImg.src = "/material/5.svg";
          break;
        case 6:
          gameStateImg.src = "/material/6.svg";
          break;
        case 7:
          gameStateImg.src = "/material/7.svg";
          break;
        case 8:
          gameStateImg.src = "/material/8.svg";
          break;
        case 9:
          gameStateImg.src = "/material/9.svg";
          break;
        case "draw":
          gameStateImg.src = "/material/draw.svg";
          break;
        case "get_ready":
          gameStateImg.src = "/material/get_ready.svg";
          break;
        case "computer_wins":
          gameStateImg.src = "/material/computer_wins.svg";
          break;
        case "player_wins":
          gameStateImg.src = "/material/player_wins.svg";
          break;
        case "computer_wins":
          gameStateImg.src = "/material/computer_wins.svg";
      };
      gameStateModal.style.display = "grid";
    } else {
      let gameStateModal = document.querySelector(".container-game-state-modal");
      gameStateModal.style.display = "none";
    };
  };

  async countDown(player, computer) {
    return new Promise((resolve, reject) => {
      //players gesture selector dom object - for pulse animation
      let buttonAnimationClass = document.querySelector(".container-change-player-gesture");
      //computers gesture dom object - for wobble animation
      let illustrationAnimationClass = document.querySelector(".animation-wrapper-computer");
      let counter = 10;
      let countDownInterval = setInterval(() => {
        if (counter > 0) {
          //begin with computer gesture wobble animation at a counter of 10
          if (counter === 10) {
            illustrationAnimationClass.classList.add("container-game-art-computer-animation");
            computer.setUiGesture("hello", computer.type);
          };
          this.toggleGameStateModal(counter);
          //if players gesture on initial state "hello" => pulse animation
          if (counter === 5 && player.gesture === "hello") {
            buttonAnimationClass.classList.add("play-now-button-animation");
          };
        }
        else {
          clearInterval(countDownInterval);
          illustrationAnimationClass.classList.remove("container-game-art-computer-animation");
          buttonAnimationClass.classList.remove("play-now-button-animation");
          this.toggleGameStateModal(false);
          resolve();
        };
        counter--;
      }, 1000);
    });
  };

  async toggleGameUi() {
    return new Promise((resolve, reject) => {
      this.toggleRoundCounter(true);
      this.toggleGestureSelector(true);
      setTimeout(() => { resolve() }, 5000);
    });
  };

  //game initializer
  gameInit() {
    //hide confetti container
    const confettiContainer = document.querySelector(".animation-overlay");
    confettiContainer.style.display = "none";

    //set score counter for both players to "0"
    this.setScoreCounterComputer();
    this.setScoreCounterPlayer();

    //set round counter to "0"
    this.setRoundCounter(0);

    //hide unneeded ui elements

    //hide any game state
    this.toggleGameStateModal(false);
    //show "vs" instead of the "round counter"
    this.toggleRoundCounter(false);
    //hide gesture selector arrows
    this.toggleGestureSelector(false);

    //initial player message loop
    let messageLoopArray = ["init1", "init2", "init3", "init4"];
    let loopIndex = 0;
    let buttonAnimationClass = document.querySelector(".play-now-button");
    let messageLoopInterval = setInterval(() => {
      this.setPlayerMessage(messageLoopArray[loopIndex]);
      loopIndex++;
      if (loopIndex === 4) {
        buttonAnimationClass.classList.add("play-now-button-animation");
        loopIndex = 0;
      }
      if (loopIndex === 2) buttonAnimationClass.classList.remove("play-now-button-animation");
    }, 4000);

    //add eventhandler to buttons

    let playNowButton = document.querySelector(".play-now-button");
    playNowButton.addEventListener("click", () => {
      clearInterval(messageLoopInterval);
      this.startNewGame();
    });
  };

  async startNewGame() {

    //create an object computer of class player and set type = computer
    let computer = new players("computer");

    //create an object player of class player and set type = player
    let player = new players("player");

    const arrOfPLayers = [computer, player];

    let arrowUpButton = document.querySelector(".up-arrow");
    arrowUpButton.addEventListener("click", () => {
      player.stepUpGesture();
    });

    let arrowDownButton = document.querySelector(".down-arrow");
    arrowDownButton.addEventListener("click", () => {
      player.stepDownGesture();
    });

    this.setPlayerMessage("instructions");
    await this.toggleGameUi();

    for (let i = 0; i <= 4; i++) {
      this.round = i + 1;
      console.log(`round: ${this.round}`);
      await this.playSingleRound(player, computer);
      await this.evaluateRound(player, computer);
    };
    const jsonOfPlayers = JSON.stringify(arrOfPLayers);
    sessionStorage.setItem("players", jsonOfPlayers);
    window.open("/win.html", "_self");

  }

  async playSingleRound(player, computer) {
    (async () => {
      let randomGesturePromise = computer.getRandomGesture();
      await randomGesturePromise.then((value) => {
        computer.gesture = value;
      });
    })();

    this.toggleGameStateModal("get_ready");
    await this.wait(2000);
    this.toggleGameStateModal(false);
    this.setRoundCounter();
    await this.wait(2000);
    await this.countDown(player, computer).then(() => {
      // game logic:
      // if player.gesture == Rock and computer.gesture == Paper then computer wins => count computer.wins +1
      // if player.gesture == Rock and computer.gesture == Scissors then player wins => count player.wins +1
      // if player.gesture == Rock and computer.gesture == Rock then draw 
      // if player.gesture == Scissors and computer.gesture ==  Paper then player wins => count player.wins +1
      // if player.gesture == Scissors and computer.gesture ==  Rock then computer wins => count computer.wins +1
      // if player.gesture == Scissors and computer.gesture ==  Scissors then draw
      // if player.gesture == Paper and computer.gesture ==  Paper then draw 
      // if player.gesture == Paper and computer.gesture ==  Rock then player wins => count player.wins +1
      // if player.gesture == Paper and computer.gesture ==  Scissors then computer wins => count computer.wins +1
      computer.setUiGesture(computer.gesture, computer.type);

      if (((player.gesture === "hello") && (computer.gesture === "scissors")) || ((player.gesture === "hello") && (computer.gesture === "paper")) || ((player.gesture === "hello") && (computer.gesture === "rock")) || ((player.gesture === "rock") && (computer.gesture === "paper")) || ((player.gesture === "scissors") && (computer.gesture === "rock")) || ((player.gesture === "paper") && (computer.gesture === "scissors"))) {
        this.winnerRound = "computer";
        computer.wins++;
      } else if (((player.gesture === "rock" && computer.gesture === "scissors")) || ((player.gesture === "scissors") && (computer.gesture === "paper")) || ((player.gesture === "paper") && (computer.gesture === "rock"))) {
        this.winnerRound = "player";
        player.wins++;
      } else {
        this.winnerRound = "draw";
      }
      Promise.resolve();
    });
  };

  async evaluateRound(player, computer) {
    const canvas = document.getElementById("confetti");
    const confettiContainer = document.querySelector(".animation-overlay");
    //add confetti to the stage
    const confetti = new JSConfetti({ canvas });

    if (this.winnerRound === "computer") {
      this.toggleGameStateModal("computer_wins");
      this.scoreComputer = computer.wins;
      this.setScoreCounterComputer(this.scoreComputer);
      confettiContainer.style.display = "grid";
      canvas.classList.add("confetti-computer");
      await confetti.addConfetti({
        emojis: ['🦩'],
        emojiSize: 70,
        confettiNumber: 30,
      });
      canvas.classList.remove("confetti-computer");
      confettiContainer.style.display = "none";
      this.toggleGameStateModal(false);
      await this.wait(500);
      Promise.resolve();
    } else if (this.winnerRound === "player") {
      this.toggleGameStateModal("player_wins");
      this.scorePlayer = player.wins;
      this.setScoreCounterPlayer(this.scorePlayer);
      confettiContainer.style.display = "grid";
      canvas.classList.add("confetti-player");
      await confetti.addConfetti({
        emojis: ['🦩'],
        emojiSize: 70,
        confettiNumber: 30,
      });
      canvas.classList.remove("confetti-player");
      confettiContainer.style.display = "none";
      this.toggleGameStateModal(false);
      await this.wait(500);
      Promise.resolve();
    } else if (this.winnerRound === "draw") {
      this.toggleGameStateModal("draw");
      await this.wait(2000);
      this.toggleGameStateModal(false);
      await this.wait(500);
      Promise.resolve();
    };
  };
};

//create player class 
class players {
  constructor(type) {
    //Player or Computer
    this.type = type;
    this._gesture = "hello";
    this._wins = 0;
    this.isReady = false;
  };

  get gesture() {
    return this._gesture;
  };

  set gesture(value) {
    this._gesture = value;
  };

  get wins() {
    return this._wins;
  };

  set wins(value) {
    this._wins = value;
  };


  //make a random decision whether to use stone, paper, or scissors
  async getRandomGesture() {
    return new Promise((resolve, reject) => {
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
      resolve(randomGesture);
    });
  };

  stepUpGesture() {
    if (this.gesture === "hello") {
      this.gesture = "rock";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "rock") {
      this.gesture = "scissors";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "scissors") {
      this.gesture = "paper";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "paper") {
      this.gesture = "rock";
      this.setUiGesture(this.gesture, this.type);
    };
  };

  stepDownGesture() {
    if (this.gesture === "hello") {
      this.gesture = "paper";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "paper") {
      this.gesture = "scissors";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "scissors") {
      this.gesture = "rock";
      this.setUiGesture(this.gesture, this.type);
    } else if (this.gesture === "rock") {
      this.gesture = "paper";
      this.setUiGesture(this.gesture, this.type);
    };
  };

  //set gesture
  setUiGesture(gesture, type) {
    let gesturePlayer = document.querySelector(".gesture-" + type);
    switch (gesture) {
      case "hello":
        gesturePlayer.src = `/material/hello_${type}.svg`;
        break;
      case "rock":
        gesturePlayer.src = `/material/rock_${type}.svg`;
        break;
      case "scissors":
        gesturePlayer.src = `/material/scissors_${type}.svg`;
        break;
      case "paper":
        gesturePlayer.src = `/material/paper_${type}.svg`;
    };
  };
};

let newGame = new game();
newGame.gameInit();
