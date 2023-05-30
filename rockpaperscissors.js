function playSingleRound(human, computer) {
    human.choice = human.choice.toLowerCase();
    //return value which player wins
    let winner = "";

    // game logic:
    // if human.choice == Rock and computer.choice == Paper then computer wins => count computer.wins +1
    // if human.choice == Rock and computer.choice == Scissors then player wins => count player.wins +1
    // if human.choice == Rock and computer.choice == Rock then draw 
    // if human.choice == Scissors and computer.choice ==  Paper then player wins => count player.wins +1
    // if human.choice == Scissors and computer.choice ==  Rock then computer wins => count computer.wins +1
    // if human.choice == Scissors and computer.choice ==  Scissors then draw
    // if human.choice == Paper and computer.choice ==  Paper then draw 
    // if human.choice == Paper and computer.choice ==  Rock then player wins => count player.wins +1
    // if human.choice == Paper and computer.choice ==  Scissors then computer wins => count computer.wins +1

    if (((human.choice === "rock") && (computer.choice === "paper")) || ((human.choice === "scissors") && (computer.choice === "rock")) || ((human.choice === "paper") && (computer.choice === "scissors"))) {
        winner = "computer";
        console.log("computer wins");

    } else if (((human.choice === "rock" && computer.choice === "scissors")) || ((human.choice === "scissors") && (computer.choice === "paper")) || ((human.choice === "paper") && (computer.choice === "rock"))){
        winner = "human";
        console.log("player wins");
    }else {
        winner = "draw";
        console.log("draw!");
    }
    return winner;
};

function game() {
    //create class player with properties: type, choice, wins
    class player {
        constructor(type) {
            this.type = type;
            this.choice = "";
            this.wins = 0;
        };

        //make a random decision whether to use stone, paper, or scissors
        getRandomChoice() {
            //create empty string variable computerChoice
            let computerChoice = "";
            //get random integer with a value of 0, 1 or 2
            let getRandomInt = Math.floor(Math.random() * 3);
            // if return value from getRandomInt == 0 then botCounterpartChoice is "rock"
            // if return value from getRandomInt == 1 then botCounterpartChoice is "paper"
            // if return value from getRandomInt == 2 then botCounterpartChoice is "scissors"
            switch (getRandomInt) {
                case 0:
                    computerChoice = "rock";
                    break;
                case 1:
                    computerChoice = "paper";
                    break;
                case 2:
                    computerChoice = "scissors";
            };
            return computerChoice;
        };
    };

    //create string variable to hold converted more readable counter
    let numeral = "";

    //create an object computer of class player and set type = computer
    let computer = new player("computer");

    //create an object human of class player and set type = human
    let human = new player("human");

    //create a variable for the evaluation who has won
    let winnerOfRound = "";

    //five rounds to play
    for (let i = 0; i <= 4; i++) {
        //let computer make his choice: rock, scissors or paper
        computer.choice = computer.getRandomChoice();

        //test getRandomChoice => console.log return value
        //console.log(computer.choice);

        //convert counter to a more readable numeral
        switch (i) {
            case 0:
                numeral = "first";
                break
            case 1:
                numeral = "second";
                break
            case 2:
                numeral = "third";
                break
            case 3:
                numeral = "fourth";
                break
            case 5:
                numeral = "fifth";

        }

        //create prompt for user input
        human.choice = prompt("We will play five times. You will play against me, the computer. Make your "+ numeral+ " choice: rock, scissors or paper", "Rock");

        //check input for plausibility 
        const regex = /\b(?:rock|paper|scissors)\b/i;
        if (regex.test(human.choice)) {
            winnerOfRound = playSingleRound(human, computer);
            switch (winnerOfRound){
                case "computer":
                    computer.wins++;
                    alert(`computer has chosen: ${computer.choice}, player has chosen: ${human.choice} – computer wins!`);
                    break;
                case "human":
                    human.wins++;
                    alert(`player has chosen: ${human.choice}, computer has chosen: ${computer.choice} – player wins!`);
                break;
                case "draw":
                    alert("We have a draw no one gets a point");
            }
        } else {
            alert("please enter either rock, paper, or scissors");
            location.reload();
        };
    };
    //display winner of the game
    if (computer.wins > human.wins) alert(`${computer.wins}:${human.wins} – computer win the game!`)
    else alert(`${human.wins}:${computer.wins} – player win the game!`);
};

game();