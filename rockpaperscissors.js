function playSingleRound(playerSelection, userSelection) {
    //code here
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
    //create an object computer of class player and set type = computer
    let computer = new player("computer");
    //create an object human of class player and set type = human
    let human = new player("human");

    //test getRandomChoice => console.log return value
    computer.choice = computer.getRandomChoice();
    console.log(computer.choice);
};

game();