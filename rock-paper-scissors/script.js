const buttons = document.querySelectorAll("button")
buttons.forEach(btn => {
  btn.addEventListener("click", playRound);
});

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getComputerChoice(){
    const choice = Math.random();
    if (choice < 0.33) return "rock";
    else if (choice > 0.66) return "paper";
    return "scissors";
}

function playRound(event){
    let humanChoice = event.target.textContent;
    humanChoice = humanChoice.toLowerCase();
    const computerChoice = getComputerChoice();

    let result;

    if (humanChoice === computerChoice){
        result = "Tie";
    }
    else if (humanChoice === beats[computerChoice]){
        computerScore += 1;
        result = "Computer";
    }
    else{
        humanScore += 1;
        result = "Human";
    }

    console.log(`Human: ${humanChoice}, Computer: ${computerChoice}; Result: ${result}`);
    if (humanScore === 5 || computerScore == 5) endGame();
}

function endGame(){
    if (humanScore === computerScore) winner = "Tie";
    else if (humanScore > computerScore) winner = "Human";
    else winner = "Computer";

    console.log(`Human: ${humanScore}, Computer: ${computerScore}, winner: ${winner}`)
    humanScore = 0;
    computerScore = 0;
}

let humanScore = 0;
let computerScore = 0;
let winner = "";