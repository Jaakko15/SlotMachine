// Deposti money
// Determine number of lines to bet on
// Collect a bet amout
// Spin the slot machine

// Check if the user won
// Give the user thein winnigs
// Play again

const prompt = require("prompt-sync")();

const RWS = 3
const CLM = 3

const SYMBOLS = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};
const AMOUNT = {
    A: 6,
    B: 4,
    C: 3,
    D: 1.5
};

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

const spin = () => {
    const symbols = []
    for (const [symbol, count] of Object.entries(SYMBOLS)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol)
        }
    }
    const reels = [];
    for(let i = 0; i < CLM; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j = 0; j < RWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice[randomIndex, 1]
        }
    }
    return reels
}

const transpose = (reels) => {
    const rows = []

    for (let i = 0; i < RWS; i++){
        rows.push([])
        for(let j = 0; j < CLM; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows

}
const printRows = (rows) => {
    for (const row of rows ){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1) {
                rowString += "|"
            }
        }
        console.log(rowString)

    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for ( let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * AMOUNT[symbols[0]]
        }

    }
    return winnings;

}



let balance = deposit()
const linesToBet = lines()
const bet = betAmount(balance, linesToBet)
const reels = spin()
const rows = transpose(reels)
printRows(rows)