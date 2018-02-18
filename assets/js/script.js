var cards, currentPlayer, hasWinner;

currentPlayer = 0;

cards = document.querySelectorAll('.card');

cards.forEach(function (el, index, list) {
    el.addEventListener('click', function (event) {
        run(event.currentTarget.id.substr(5, 3));
    });
});

init();

document.getElementById('play-again').addEventListener('click', function(event){
    init();    
});


function init() {
    document.querySelectorAll('.card-content').forEach(function (el) {

        if (el.childNodes[0]) {
           el.removeChild(el.childNodes[0]);
        }

        currentPlayer = 0;
    });

    document.querySelector('.player-turn').textContent = '';
    hasWinner = false;
}

function run(cardId) {

    if (hasWinner) {
        return;
    }

    var cardContent = document.getElementById('card-' + cardId).querySelector('.card-content');

    if (!cardContent.firstChild) {

        if (currentPlayer === 0) {
            cardContent.insertAdjacentHTML('beforeend', '<i class="fas fa-times fa-8x"></i>');
            document.querySelector('.player-turn').textContent = 'IA Turn';
        } else {
            cardContent.insertAdjacentHTML('beforeend', '<i class="far fa-circle fa-8x"></i>');
            document.querySelector('.player-turn').textContent = 'Your Turn';
        }

        //Number of cards that have been played.
        var turnQtt = document.querySelectorAll('.card-content i').length;

        if (turnQtt === 9 && !hasWinner) {
            document.querySelector('.player-turn').textContent = 'DRAWN GAME';
        }
       
        if (!isWinner(currentPlayer)) {
            currentPlayer = (currentPlayer === 0 ? 1 : 0);

            if (currentPlayer === 1) {
                IATurn();
            }

        } else {
            hasWinner = true;

            if (currentPlayer === 0) {
                document.querySelector('.player-turn').textContent = 'YOU WON';
            } else {
                document.querySelector('.player-turn').textContent = 'IA WON';
            }
        }
    }
}

function isWinner(currentPlayer) {

    var cards, cardsArray,  result, found, cardsPosition, winnerPositions;

    winnerPositions = [ ['0-0', '0-1', '0-2'], ['1-0', '1-1', '1-2'],
                        ['2-0', '2-1', '2-2'], ['0-0', '1-0', '2-0'],
                        ['0-1', '1-1', '2-1'], ['0-2', '1-2', '2-2'],
                        ['0-0', '1-1', '2-2'], ['2-0', '1-1', '0-2'] ];

    if (currentPlayer === 1) {
        cards = document.querySelectorAll('.card .fa-circle');
    } else {
        cards = document.querySelectorAll('.card .fa-times');
    }

    cardsArray = Array.prototype.slice.call(cards);

    cardsPosition = cardsArray.map(function (el) {
        return el.parentNode.parentNode.id.replace('card-', '');
    });

    winnerPositions.forEach(function (elemArray) {
        var res = elemArray.filter(function (el) {
            return cardsPosition.indexOf(el) > -1;
        });

        // winner position have been found.
        if (res.length === 3) 
            found = true;
    });
    return found;
}

function IATurn() {
    var cards, randomAvailableIndex, availableCards = [];

    cards = document.querySelectorAll('.card');

    cards.forEach(function (el, i, list) {
        if (el.childNodes[1].childNodes.length === 0) {
            availableCards.push(el.id.substr(5, 3));
        }
    });

    randomAvailableIndex = Math.abs(Math.round(Math.random() * availableCards.length - 1));

    if (randomAvailableIndex >= 0) {
        if (availableCards[randomAvailableIndex]) {
            run(availableCards[randomAvailableIndex]);
        }
    }
}