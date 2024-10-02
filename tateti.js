// Selección de elementos del DOM
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null); // Estado del tablero

// Combinaciones ganadoras
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

// Maneja el clic en una celda
function handleClick(event) {
    const index = Array.from(cells).indexOf(event.target);
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;  // Actualiza el estado del tablero
    event.target.textContent = currentPlayer; // Muestra el símbolo en la celda

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} gana el juego!`), 100);
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert('¡Es un empate!'), 100);
    } else {
        // Cambia de jugador SOLO si no hay ganador o empate
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


// Verifica si hay un ganador
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Resetea el juego
function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

// Agrega event listeners a cada celda
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
