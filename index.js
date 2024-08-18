$(document).ready(function() {
    // Initialize the current player to 'X'
    let currentPlayer = 'X';
    // Select all elements with the data-cell attribute
    const cells = $('[data-cell]');
    // Select the element that displays the current player's turn
    const turnIndicator = $('#turn-indicator');
    // Select the element where alerts will be displayed
    const alertPlaceholder = $('#alert-placeholder');

    // Function to check if there's a winner or a draw
    function checkWinner() {
        // Define all possible winning combinations
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Loop through each winning combination
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            // Check if the cells in the current combination have the same non-empty value
            if (cells.eq(a).text() && cells.eq(a).text() === cells.eq(b).text() && cells.eq(a).text() === cells.eq(c).text()) {
                return cells.eq(a).text(); // Return the winner ('X' or 'O')
            }
        }

        // Check if all cells are filled and return 'Draw' if true, otherwise return null
        return cells.toArray().every(cell => $(cell).text()) ? 'Draw' : null;
    }

    // Function to display an alert message
    function showAlert(message) {
        // Create the HTML for the alert message
        const alertHtml = `
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        // Insert the alert message into the alert placeholder
        alertPlaceholder.html(alertHtml);
    }

    // Function to handle a cell click event
    function handleClick() {
        // Check if the clicked cell is empty
        if ($(this).text() === '') {
            // Set the cell's text to the current player's symbol ('X' or 'O')
            $(this).text(currentPlayer);
            // Check if there's a winner or a draw
            const winner = checkWinner();
            if (winner) {
                // Display the winner or draw message
                showAlert(winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`);
                // Remove click event listeners from all cells
                cells.off('click');
            } else {
                // Switch to the other player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                // Update the turn indicator to show the next player's turn
                turnIndicator.text(`${currentPlayer}'s Turn`);
            }
        }
    }

    // Function to restart the game
    function restartGame() {
        // Clear the text of all cells and re-enable click event listeners
        cells.text('').on('click', handleClick);
        // Reset the current player to 'X'
        currentPlayer = 'X';
        // Update the turn indicator to show 'X's turn
        turnIndicator.text(`${currentPlayer}'s Turn`);
        // Clear any alert messages
        alertPlaceholder.html('');
    }

    // Add click event listeners to all cells
    cells.on('click', handleClick);
    // Add click event listener to the restart button
    $('#restart-button').on('click', restartGame);
});
