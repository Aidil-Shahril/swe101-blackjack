// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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

// 1.Deck is shuffled.

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
var shuffledDeck = shuffleCards(deck);

var main = function (input) {
  // 2. User clicks Submit to deal 2 cards to player and computer.
  // cards are drawn from the top of the deck
  var playerFirstCard = shuffledDeck.pop();
  var computerFirstCard = shuffledDeck.pop();

  var playerSecondCard = shuffledDeck.pop();
  var computerSecondCard = shuffledDeck.pop();

  // The cards are analysed for game winning conditions, e.g. Blackjack.

  var playerHandSum = playerFirstCard.cardValue + playerSecondCard.cardValue;
  console.log(playerHandSum);

  var computerHandSum = computerFirstCard.cardValue + computerSecondCard.cardValue;
  console.log(computerHandSum);

  if (playerHandSum == 21) {

  }

  // Initialise an output value with the cards drawn by each player.
  var myOutputValue = 'PLAYER: '
    + playerFirstCard.name
    + ' of '
    + playerFirstCard.suit
    + ' and '
    + playerSecondCard.name
    + ' of '
    + playerSecondCard.suit
    + '<br>COMPUTER: '
    + computerFirstCard.name
    + ' of '
    + computerFirstCard.suit
    + ' and '
    + computerSecondCard.name
    + ' of '
    + computerSecondCard.suit
    + '<br>';

  return myOutputValue;
};
