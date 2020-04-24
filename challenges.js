/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var diceVal, scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();

// use a "." selector for a class and a '#' selector for an ID
//setting the Dice value to blank at the start of the game
//Listner function for dice rolls
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // if(finalScoreInput.style.display != 'none'){
        //     finalScoreInput.style.display = 'none';
        // }
        diceVal1 = (Math.floor((Math.random() * 1000))%6) + 1;
        diceVal2 = (Math.floor((Math.random() * 1000))%6) + 1;

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';    
        document.getElementById('dice-1').src = 'dice-'+diceVal1+'.png';
        document.getElementById('dice-2').src = 'dice-'+diceVal2+'.png';

        if(diceVal1 === 1 || diceVal2 === 1){
            roundScore = 0;
            changePlayer();
        }else{roundScore = roundScore + diceVal1 + diceVal2;}
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    var finalScoreInput = document.querySelector('.final-score');
    var finalScore = finalScoreInput.value;
    if(!finalScore){
        finalScore = 100;
    }
    if(gamePlaying){
        var diceDOM = document.querySelector('.dice');   
        diceDOM.style.display = 'none';
        scores[activePlayer] = scores[activePlayer] + roundScore;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        //Check if player has won the game or not (reached a total score of 100)
        if (scores[activePlayer] >= finalScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('winner');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';  
            gamePlaying = false;
            return;
        }
        changePlayer();
        roundScore = 0;
    }
});

function changePlayer(){
    document.querySelector('#current-'+activePlayer).textContent = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    (activePlayer === 0) ? (activePlayer = 1) : (activePlayer = 0);
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');  
}
//Click on the new game button...
document.querySelector('.btn-new').addEventListener('click',init);
function init(){
    gamePlaying = true;
    activePlayer = 0;
    previousRoll = 0;
    roundScore = 0;
    scores = [0,0];
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-0').textContent = 'Player1';
    document.querySelector('#name-1').textContent = 'Player2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';  
    document.querySelector('.final-score').value = "";
}