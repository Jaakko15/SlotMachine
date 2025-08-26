// Deposti money
// Determine number of lines to bet on
// Collect a bet amout
// Spin the slot machine
// Check if the user won
// Give the user thein winnigs
// Play again

const prompt = require("prompt-sync")();

const ROWS = 3
const CLMN = 3

const SYMBOLS = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}
const AMOUNT = {
    A: 6,
    B: 4,
    C: 3,
    D: 1.5
}

const deposit = () => {
    const depositMoney = prompt("Deposit money " )
    return depositMoney
}

const lines = () => {
    while(true){
    const linesToBet = prompt("Choose how many lines you want to bet on. 1-3? ")
    if(isNaN(linesToBet) || linesToBet <= 0 || linesToBet > 3){
        console.log("Wrong amount of lines, try again.")
    } else {
        return linesToBet
    }
}
}

const betAmount = (balance, linesToBet) => {
    while(true){
        console.log("Your balance is " + balance)
    const betAmount = prompt("Choose your bet ")
    if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance / linesToBet){
        console.log("Wrong bet amount, choose again.")
    } else {
        return betAmount
    }
}
}

const balance = deposit()
const linesToBet = lines()
betAmount(balance, linesToBet)