// Update total scores (also refresh)
function updateScores() {
    for (let i = 0; i < 4; i++) {
        let score = 0;
        for (let j = 0; j < games[i].length; j++) {
            score += games[i][j];
        }
        playerScores[i] = score;
    }
    refreshScores();
}


// Refresh scores display
function refreshScores() {
    let highScore = 0;

    for (let i = 0; i < 4; i++) {
        document.getElementById(`player-${i+1}-score`).innerHTML = playerScores[i];
        if (playerScores[i] > highScore) {
            highScore = playerScores[i];
        }
    }

    for (let i = 0; i < 4; i++) {
        if (playerScores[i] == highScore && playerScores[i] >= 200) {
            document.getElementById(`player-${i+1}-score`).classList.remove('border-secondary');
            document.getElementById(`player-${i+1}-score`).classList.add('border-success', 'bg-success', 'text-white');
        }
        else if (playerScores[i] == highScore) {
            document.getElementById(`player-${i+1}-score`).classList.remove('border-secondary', 'bg-success', 'text-white');
            document.getElementById(`player-${i+1}-score`).classList.add('border-success', 'text-success');
        }
        else {
            document.getElementById(`player-${i+1}-score`).classList.remove('border-success', 'bg-success', 'text-success', 'text-white');
            document.getElementById(`player-${i+1}-score`).classList.add('border-secondary', 'text-secondary');
        }
    }
}


// Add a Game
function addGame(player, score) {
    let element = document.createElement('div');
    element.classList.add('fs-4', 'py-3', 'border-bottom');
    element.innerHTML = parseInt(score);
    document.getElementById(`player-${player+1}-games`).appendChild(element);

    games[player].push(parseInt(score));
    localStorage.setItem("games", JSON.stringify(games));
    updateScores();
}

function displayGames() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < games[i].length; j++) {
            let element = document.createElement('div');
            element.classList.add('fs-4', 'py-3', 'border-bottom');
            element.innerHTML = games[i][j];
            document.getElementById(`player-${i+1}-games`).appendChild(element);
        }
    }
}

// Reset everything to 0
function resetGame() {
    for (let i = 0; i < 4; i++) {
        while (games[i].length) {
            games[i].pop();
        }
    }
    localStorage.setItem("games", JSON.stringify(games));
    updateScores();

    for (let i = 0; i < 4; i++) {
        while (document.getElementById(`player-${i+1}-games`).hasChildNodes()) {
            document.getElementById(`player-${i+1}-games`).removeChild(document.getElementById(`player-${i+1}-games`).firstChild);
        }
    }
}


// Translations
function translate(lang) {
    const newGame = {
        'en': 'New Game',
        'ru': 'Новая игра',
        'he': 'משחק חדש'
    };

    const playerDefault = {
        'en': 'Player',
        'ru': 'Игрок',
        'he': 'שחקן'
    };

    localStorage.setItem("lang", JSON.stringify(lang));

    document.getElementById('new-game').innerHTML = newGame[lang];

    if (localStorage.getItem('player_names') == null) {
        for (let i = 0; i < 4; i++) {
            playerNames[i] = `${playerDefault[lang]} ${i+1}`;
            document.getElementById(`player-${i+1}-name`).innerHTML = playerNames[i];
            document.getElementById(`player-${i+1}-input`).value = playerNames[i];
        }
    }

    document.querySelectorAll('.lang').forEach((lang) => {
        if (lang.classList.contains('btn-primary')) {
            lang.classList.replace('btn-primary', 'btn-outline-primary');
        }
    });
    document.getElementById(lang).classList.replace('btn-outline-primary', 'btn-primary');
}