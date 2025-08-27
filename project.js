const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
    "🍌": { count: 6, payout: 6 },
    "🍇": { count: 8, payout: 4 },
    "🥒": { count: 12, payout: 3 },
    "🍓": { count: 15, payout: 1.5 }
};

const getNumberInput = (message, validator) => {
    while (true) {
        const value = Number(prompt(message));
        if (!isNaN(value) && validator(value)) return value;
        console.log("❌ Invalid input, try again.");
    }
};

const deposit = () =>
    getNumberInput("💰 Deposit money: ", n => n > 0);

const chooseLines = () =>
    getNumberInput(`🎰 Choose lines to bet on (1-${ROWS}): `, n => n > 0 && n <= ROWS);

const betAmount = (balance, lines) =>
    getNumberInput(
        `💵 Choose your bet per line (Balance: ${balance}): `,
        n => n > 0 && n <= balance / lines
    );

const spin = () => {
    const symbols = [];
    for (const [symbol, { count }] of Object.entries(SYMBOLS)) {
        for (let i = 0; i < count; i++) symbols.push(symbol);
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = reels => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = rows => {
    for (const row of rows) {
        console.log(row.join(" | "));
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        if (symbols.every(s => s === symbols[0])) {
            winnings += bet * SYMBOLS[symbols[0]].payout;
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (balance > 0) {
        console.log("\n=============================");
        console.log(`💳 Balance: ${balance}`);
        const lines = chooseLines();
        const bet = betAmount(balance, lines);

        balance -= bet * lines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;

        console.log(`🏆 You won: ${winnings} €`);
        console.log(`📌 New balance: ${balance}`);

        if (balance <= 0) {
            console.log("💀 You ran out of money!");
            break;
        }

        const keepPlaying = prompt("👉 Play again? (y/n): ");
        if (keepPlaying.toLowerCase() !== "y") break;

        console.clear();
    }

    console.log(`\n🎉 Game over. Final balance: ${balance}`);
};

game();
