var playerHand = [];
var computerHand = [];
var playerHandSum = 0;
var computerHandSum = 0;
var mode = 'start phase';
var playerInput = '';
var roundRestart = false;
var winDisplay;
var playerFinalOutput;
var computerFinalOutput;
var myOutputValue;

var makeDeck = function () {
  // creating an array of cards
  var cardDeck = [];
  var suits = ['❤️', '💎', '☘️', '♠'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var value = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
        value = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        value = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        value = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardValue: value,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  return cardDeck;
};

var deck = makeDeck();
// 1.Deck is shuffled.
var shuffledDeck = shuffleCards(deck);

var dealStartingCards = function () {
  for (var i = 0; i <= 1; i += 1) {
    // cards are drawn from the top of the deck
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());

    playerHandSum = playerHandSum + playerHand[i].cardValue;
    computerHandSum = computerHandSum + computerHand[i].cardValue;
  }
};

var displayCardsInHand = function (cardsInHand, handSum) {
  var handOutput = '';
  var counter = 0;

  while (counter < cardsInHand.length) {
    handOutput = handOutput + '<br>'
    + cardsInHand[counter].name
    + cardsInHand[counter].suit;
    counter += 1;
  }
  return handOutput + '<br> Hand total is: ' + handSum;
};

var checkWinCondition = function () {
  var winningOutput = '';

  if ((playerHand[0].name == 'ace' && playerHand[1].cardValue == 10) || (playerHand[1].name == 'ace' && playerHand[0].cardValue == 10)) {
    winningOutput = 'Congratulations! You got Blackjack! <br><br> Click submit to reset the game.<br><br>';
    roundRestart = true;
  } else if (playerHandSum > 21 || (playerInput == 'stay' && (playerHandSum < computerHandSum))) {
    winningOutput = 'You went bust! Banker wins the round. <br><br> Click submit to reset the game.<br><br>';
    roundRestart = true;
  } else if (playerInput == 'stay') {
    if (playerHandSum > computerHandSum) {
      winningOutput = 'Congratulations! you won the round. <br><br> Click submit to reset the game.<br><br>';
      roundRestart = true;
    }
  } else if (computerHandSum > 21 && mode == 'hit or stay') {
    winningOutput = 'Banker went bust! you win the round. <br><br> Click submit to reset the game.<br><br>';
    roundRestart = true;
  } else if ((playerHandSum == computerHandSum) && (playerHandSum <= 21) && (computerHandSum <= 21)) {
    winningOutput = 'Game is a tie! nobody wins this round. <br><br> Click submit to reset the game.<br><br>';
    roundRestart = true;
  }
  else {
    winningOutput = 'Would you like to hit or stay? <br><br>';
  }

  return winningOutput;
};

var manageGamePhase = function () {
  if (mode == 'start phase') {
    mode = 'deal phase';
  } else if (mode == 'deal phase') {
    mode = 'hit or stay';
  } else if (mode == 'hit or stay') {
    if (roundRestart == true) {
      mode = 'start phase';
      console.log('round restart');
      playerHand = [];
      computerHand = [];
      playerHandSum = 0;
      computerHandSum = 0;
      playerInput = '';
      roundRestart = false;
    } else mode = 'hit or stay';
  }
};

var managePlayerChoices = function () {
  if (playerInput == 'hit' && mode == 'hit or stay') {
    playerHand.push(shuffledDeck.pop());
    playerHandSum = playerHandSum + playerHand[playerHand.length - 1].cardValue;
    // The user's cards are analysed for winning or losing conditions.
    winDisplay = checkWinCondition();
    playerFinalOutput = 'Your hand is: ' + displayCardsInHand(playerHand, playerHandSum);
    computerFinalOutput = 'Computer hand is: ' + displayCardsInHand(computerHand, computerHandSum);

    myOutputValue = winDisplay + playerFinalOutput + '<br><br>' + computerFinalOutput;
  } else if (playerInput == 'stay' && mode == 'hit or stay') {
    playerInput = 'stay';
    winDisplay = checkWinCondition();
    playerFinalOutput = 'Your hand is: ' + displayCardsInHand(playerHand, playerHandSum);
    computerFinalOutput = 'Computer hand is: ' + displayCardsInHand(computerHand, computerHandSum);

    myOutputValue = winDisplay + playerFinalOutput + '<br><br>' + computerFinalOutput;
  } else if ((playerInput != 'hit' && mode == 'hit or stay') || (playerInput != 'stay' && mode == 'hit or stay')) {
    myOutputValue = 'Please type hit or stay. <br><br>' + playerFinalOutput + '<br><br>' + computerFinalOutput;
  }
};

var manageComputerChoices = function () {
  if (computerHandSum < 17 && mode == 'hit or stay') {
    computerHand.push(shuffledDeck.pop());
    computerHandSum = computerHandSum + computerHand[computerHand.length - 1].cardValue;
  }
};
var main = function (input) {
  myOutputValue = 'click submit to start new round';
  manageGamePhase();
  // 2. User clicks Submit to deal 2 cards to player and computer.
  if (mode == 'deal phase') {
    dealStartingCards();
    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
    winDisplay = checkWinCondition();
    // 4. The cards are displayed to the user.
    playerFinalOutput = 'Your hand is: ' + displayCardsInHand(playerHand, playerHandSum);
    computerFinalOutput = 'Computer hand is: ' + displayCardsInHand(computerHand, computerHandSum);

    myOutputValue = winDisplay + playerFinalOutput + '<br><br>' + computerFinalOutput;
  }
  // 5. The computer decides to hit or stand automatically based on game rules.
  manageComputerChoices();
  // 6. The user decides whether to hit or stand, using the submit button to submit their choice.
  playerInput = input;
  managePlayerChoices();

  if (roundRestart == true) {
    deck = makeDeck();
    // when game restarts, deck is reshuffled.
    shuffledDeck = shuffleCards(deck);
  }
  console.log(deck.length);
  // 7. The game either ends or continues.
  return myOutputValue;
};
