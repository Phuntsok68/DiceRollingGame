"use strict";
// Selecting elements
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
// Rolling dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    const randDice = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `images/dice-${randDice}.png`;
    if (randDice !== 1) {
      currentScore += randDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// hold the button
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    switchPlayer();
  }
});

// Reset the game button
btnNew.addEventListener("click", init);
