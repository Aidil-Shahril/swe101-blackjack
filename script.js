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
var playerHand = [];
var computerHand = [];
var playerHandSum = 0;
var computerHandSum = 0;

var startRound = function () {
  for (var i = 0; i <= 1; i += 1) {
    // cards are drawn from the top of the deck
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());

    playerHandSum = playerHandSum + playerHand[i].cardValue;
    computerHandSum = computerHandSum + computerHand[i].cardValue;
  }
};

// var winConditions = function (handSum) {
// if (playerHandSum == 21 && playerHand.length == 2){

// }
// };

var outputDisplay = function (CardsInHand, handSum) {
  var counter = 0;
  var handOutput = '';

  while (counter < CardsInHand.length) {
    handOutput = handOutput + '<br>'
    + CardsInHand[counter].name
    + CardsInHand[counter].suit;
    counter += 1;
  }
  return handOutput + '<br> Hand total is: ' + handSum;
};

var main = function (input) {
  var myOutputValue;
  // 2. User clicks Submit to deal 2 cards to player and computer.
  startRound();

  // 3. The cards are analysed for game winning conditions, e.g. Blackjack.

  // 4. The cards are displayed to the user.
  var myHandOutput = outputDisplay(playerHand, playerHandSum);
  var computerHandOutput = outputDisplay(computerHand, computerHandSum);

  myOutputValue = 'Your hand is: ' + myHandOutput + '<br><br>Computer hand is: ' + computerHandOutput;
  // The user decides whether to hit or stand, using the submit button to submit their choice.

  // The user's cards are analysed for winning or losing conditions.
  // The computer decides to hit or stand automatically based on game rules.
  // The game either ends or continues.
  return myOutputValue;
};
