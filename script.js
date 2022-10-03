// If player names are stored locally, get them, else set default names
var playerNames = [];
if (localStorage.getItem('player_names') != null) {
    playerNames = JSON.parse(localStorage.getItem('player_names'));
}
else {
    for (let i = 0; i < 4; i++) {
        playerNames[i] = `Player ${i+1}`;
    }
}

// Display the names, add event listeners and whatnot
for (let i = 0; i < 4; i++) {

    // Display player name
    document.getElementById(`player-${i+1}-name`).innerHTML = playerNames[i];
    document.getElementById(`player-${i+1}-input`).value = playerNames[i];

    // Add event listener for click
    document.getElementById(`player-${i+1}-name`).addEventListener('click', () => {
        document.getElementById(`player-${i+1}-name`).style.display = 'none';
        document.getElementById(`player-${i+1}-input`).style.display = 'block';
        document.getElementById(`player-${i+1}-input`).focus();
    });

    // Add event listener for blur
    document.getElementById(`player-${i+1}-input`).addEventListener('blur', () => {
        if (document.getElementById(`player-${i+1}-input`).value != '') {
            document.getElementById(`player-${i+1}-name`).innerHTML = document.getElementById(`player-${i+1}-input`).value;
            playerNames[i] = document.getElementById(`player-${i+1}-input`).value;
            localStorage.setItem("player_names", JSON.stringify(playerNames));
        }
        else {
            document.getElementById(`player-${i+1}-input`).value = document.getElementById(`player-${i+1}-name`).innerHTML;
        }
        document.getElementById(`player-${i+1}-name`).style.display = 'block';
        document.getElementById(`player-${i+1}-input`).style.display = 'none';
    });

    // Add event listener for add game
    document.getElementById(`player-${i+1}-add`).addEventListener('click', () => {
        document.getElementById(`player-${i+1}-score-input`).style.display = 'block';
        document.getElementById(`player-${i+1}-score-input`).focus();
    });

    document.getElementById(`player-${i+1}-score-input`).addEventListener('blur', () => {
        if (document.getElementById(`player-${i+1}-score-input`).value != '') {
            addGame(i, document.getElementById(`player-${i+1}-score-input`).value);
        }
        document.getElementById(`player-${i+1}-score-input`).value = '';
        document.getElementById(`player-${i+1}-score-input`).style.display = 'none';
    });

}

// Player number slider
var playersSlider = document.getElementById('players');
playersSlider.oninput = function() {
    if (this.value == 4) {
        document.getElementById('player-4').style.display = 'block';
    }
    else if (this.value == 3) {
        document.getElementById('player-3').style.display = 'block';
        document.getElementById('player-4').style.display = 'none';
    }
    else {
        document.getElementById('player-3').style.display = 'none';
        document.getElementById('player-4').style.display = 'none';
    }
}

// Retrieve games from local storage and update scores
var playerScores = [0, 0, 0, 0];
var games = [[], [], [], []];
if (localStorage.getItem('games') != null) {
    games = JSON.parse(localStorage.getItem('games'));
}
updateScores();

// Display games
displayGames();

// Game reset button
document.getElementById('new-game').addEventListener('click', resetGame);

// Language selector
document.querySelectorAll('.lang').forEach((lang) => {
    lang.addEventListener('click', () => {
        translate(lang.id);
    });
});

if (localStorage.getItem('lang') != null) {
    translate(JSON.parse(localStorage.getItem('lang')));
}