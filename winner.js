const players = sessionStorage.getItem("players");
const playersObj = JSON.parse(players);
console.log(playersObj);

const player = playersObj[1];
const computer = playersObj[0];

const tryAgainButton = document.querySelector(".try-again-button");
tryAgainButton.addEventListener("click", () => {
  window.open("index.html", "_self");
});


const gestureContainer = document.querySelector(".win-container-match-result");
const gesture = document.querySelector(".win-container-match-result-gesture");
const finalStatement = document.querySelector(".win-container-gamestate-paragraph");

if ((computer._wins > player._wins) || computer._wins === player._wins) {
  gestureContainer.style.transform = "translate(-10vw, -5vh)";
  gesture.src = "/material/lose_player_large.svg";
  finalStatement.innerText = "YOU LOSE";
}
else {
  gestureContainer.style.transform = "translate(18vw, 2vh)";
  gesture.src = "/material/win_player_large.svg";
  finalStatement.innerText = "YOU WIN";
}

const scoreTable = document.querySelector(".scoretable");
scoreTable.rows[0].cells[1].innerHTML = "< " + player._wins + " >";
scoreTable.rows[1].cells[1].innerHTML = "< " + computer._wins + " >";
