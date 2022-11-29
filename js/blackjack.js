//need to fix bug in the  ace/1 if else statement. somehow it thinks 10 gets accepted and it subtracts 10 from 10 to make it zero so the player score stays the same but the player still remains in the game although technically bluffing because receiving a card worth 10. need to fix somehow otherwise its good to go








//declaring vars to make the cards later
const kinds = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = []; 

//trying to fix the ace 11 or 1 problem. had to add new arrays and new classes. took forever to figure out rippp
let playerCardsArr = [];
let dealerCardsArr = [];

//setting up player wallet
let playerWallet = 0;

//setting up game pot
let gamePot = 0;

//grabbing the output box i added at bottom
const feedback = document.querySelector('h2');

//making 52 cards
for (let i = 0; i < kinds.length; i++) {
    for (let j = 0; j < suits.length; j++) {

        //making card and giving it name
        let card = `${kinds[i]}-of-${suits[j]}.jpg`;
        deck.push(card); 
    }
}
    //declaring deck   
    const deckOfCards = [];
    //making deck with values listed below
    for (let i = 0; i < kinds.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            
            let kind = kinds[i];
            let suit = suits[j];
            let name = `${kind} of ${suit}`;
            let file = `${kind}-of-${suit}.png`;
            let valu = 0;
            
            if(kind == 'Ace')  {
                valu = 11; 
            } else if(kind.length > 3) { 
                valu = 10; 
            } else { 
                valu = Number(kind); 
            }
            
            let card = { name: name, file: file, 
                         kind: kind, suit: suit, 
                         valu: valu };
            deckOfCards.push(card);
    }
}

//getting the player array to display cards
const playerImg = document.getElementById('player');

// //doing the dealer array
const dealerImg = document.getElementById('dealer');

//grabbing element to hide dealers card later
let hiddenCard = document.getElementById('hidden-card')

//grabbing entire image array
const imgArr = document.getElementsByClassName('card-image');



let dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', dealCard);

//making hit button
let hitBtn = document.getElementById('hit-btn');

//making stay button
let stayBtn =  document.getElementById('stay-btn');


//grabbing pot info display
let potInfo = document.getElementById('pot');

//grabbing players bet amount
let playerBet = document.getElementById('player-bet')

//grabbing wallet
let walletInfo = document.getElementById('wallet');


//making add money button
let addBtn =  document.getElementById('add');
addBtn.addEventListener('click', addMoney);


//fetching bet button
let betBtn = document.getElementById('bet-btn');
betBtn.addEventListener('click', placeBet);

//new deck so you never touch og deck
let deckCopy = deckOfCards.slice(0);




 //setting a variable to store the total value of player cards
let playerCards = 0;
let dealerCards = 0;

//making blackjack game
function dealCard() {

    //clear hit me cards function took some time to figure out how to grab and remove multiple elements
    const elements = document.getElementsByClassName("hit-me-card");
    //while there are hit me cards, remove them starting with index 0. found on stackoverflow
    while (elements.length > 0) elements[0].remove();
    //changing button to say deal cards instead of play game
    dealBtn.innerText = 'DEAL CARDS';

    //resetting values
    playerCards = 0;
    dealerCards = 0;

    //resetting array as well
    playerCardsArr = [];
    dealerCardsArr = [];

    //resetting buttons and hiding dealer first card
    hiddenCard.style.visibility = 'hidden';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';
    feedback.style.backgroundColor = 'orange';

    //resetting the deck if less than 4 cards left
    if (deckCopy.length < 4) {
                deckCopy = deckOfCards.slice(0);
            }

    //for loop to generate player cards and display them
    for (i = 0; i < imgArr.length; i++) {
    //generating random card for us and displaying it    
    let r = Math.floor(Math.random() * deckCopy.length);
    //setting src for the new images
    let file = deckCopy[r].file;
    imgArr[i].src = "images/" + file;

    //if else statement to add up the starting values
    if (imgArr[i].classList.contains('player-box')) {
        //adding and pushing to respective arrays/vars
        playerCardsArr.push(deckCopy[r].valu);
        playerCards += deckCopy[r].valu;
        
    } else {
        dealerCardsArr.push(deckCopy[r].valu);
        dealerCards += deckCopy[r].valu;
        console.log(dealerCards);
    }
    deckCopy.splice(r, 1); //removing the card so no dupes
    }
    //displaying stats for testing/clarity in the feedback element
    feedback.textContent = `Player Score: ${playerCards}________
        Dealer Score: ${dealerCards}________
        Cards Left: ${deckCopy.length}
        `;
    //nested. watching for next button clicks    
    hitBtn.addEventListener('click', hitMe);
    stayBtn.addEventListener("click", playerStay);
}


function hitMe() {
     //resetting the deck if less than 1 cards left
    if (deckCopy.length < 1) {
        deckCopy = deckOfCards.slice(0);
    }

    //creating new image element and setting the src value with rand num like above
    let hitMeCard = new Image();
    //generate another random number
    let r = Math.floor(Math.random() * deckCopy.length);
    let file = deckCopy[r].file;
    hitMeCard.className = 'hit-me-card';
    hitMeCard.src = "images/" + file;


    //trying to fix the 10 bug
    console.log(playerCardsArr);


    //all of this just to fix the aces problem lmao ripppp. took at least an hour+
    //if you were dealt an ace and this next card(ace card) you hit on would make you bust
    if ((playerCardsArr.includes(11)) && (deckCopy[r].valu + playerCards > 21)) {

        //finding the index of 11 to replace it with 1 (this is the part that took a minute)
        let elevenInd = playerCardsArr.indexOf(11);
        playerCardsArr.splice(elevenInd, 1, 1)

        //changing the value from 11 to 1. basicallicy just -10
        playerCards += (deckCopy[r].valu - 10);  



        //trying to fix the 10 bug
        console.log(playerCardsArr);



        
        //if youre receiving an ace and it would make you bust
    } else if (deckCopy[r].valu == 11 && (deckCopy[r].valu + playerCards > 21)) {

        //same thing as above
        let elevenInd = playerCardsArr.indexOf(11);
        playerCardsArr.splice(elevenInd, 1, 1);
        playerCards += (deckCopy[r].valu - 10);



        //trying to fix the 10 bug
        console.log(playerCardsArr);



    } else {
        //if normal card then proceed as usual
        playerCards += deckCopy[r].valu; 





        //trying to fix the 10 bug
        console.log(playerCardsArr);
    }

    //adding the value to array for later
    playerCardsArr.push(deckCopy[r].valu);
    console.log(playerCardsArr);
    
    // playerCards += deckCopy[r].valu;
   
    deckCopy.splice(r, 1); //remove card after adding

    playerImg.appendChild(hitMeCard); //append to player specific div

    //if else statements to check if bust. if not display normal stats
    if (playerCards > 21) {
        hiddenCard.style.visibility = 'visible'; //making dealer card visible if you lose
        feedback.innerHTML = `PLAYER BUSTED!
        --> Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->`;
        feedback.style.backgroundColor = 'red';
        hitBtn.style.display = 'none'; //hiding buttons
        stayBtn.style.display = 'none';

        //subtracting money from wallet since lost rip
        
        gamePot = 0; 
        potInfo.innerHTML = '$ ' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;
        
    } else {
        feedback.innerHTML = `Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->
        Cards Left: ${deckCopy.length}
        `
    } 
}

function playerStay() {
    hiddenCard.style.visibility = 'visible';

    //resetting automatically if deck is 0. was running into problems
    if (deckCopy.length == 0) {
        deckCopy = deckOfCards.slice(0);
    }

    //according to blackjack rules, if dealer is less than 17 you must hit. (and dealer is lower than player)
    while (dealerCards < 17 || dealerCards < playerCards) {
    
        //new image just like hit me above
        let dealerHit = new Image();
        let r = Math.floor(Math.random() * deckCopy.length);
        let file = deckCopy[r].file;
        dealerHit.className = 'hit-me-card';
        dealerHit.src = "images/" + file;
        
        //copied over from the hit button. read notes above. to deal with the aces problem rippppp lol
        if ((dealerCardsArr.includes(11)) && (deckCopy[r].valu + dealerCards > 21)) {

            let elevenInd = dealerCardsArr.indexOf(11);
            dealerCardsArr.splice(elevenInd, 1, 1)
            dealerCards += (deckCopy[r].valu - 10);
            console.log(dealerCards);
        } else if (deckCopy[r].valu == 11 && (deckCopy[r].valu + dealerCards > 21)) {

            let elevenInd = dealerCardsArr.indexOf(11);
            dealerCardsArr.splice(elevenInd, 1, 1);
            dealerCards += (deckCopy[r].valu - 10);
            console.log(dealerCards);
            
        } else {
            dealerCards += deckCopy[r].valu;
            console.log(dealerCards);
        }
        //pushing, slicing, appending etc ripppp almost done!
        dealerCardsArr.push(deckCopy[r].valu)

        //commented out line below to try and fix dealer score issue
        // dealerCards += deckCopy[r].valu;

        deckCopy.splice(r, 1);
        dealerImg.appendChild(dealerHit);

    }
    //more logic. took hours of testing. 100% sure i got everything. went thru alot of bugs
    if (playerCards == dealerCards) {
        feedback.innerHTML = `Its a Tie! Push!
        --> Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->`;
        feedback.style.backgroundColor = 'green';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    } else if (playerCards == 21) {
        feedback.innerHTML = `Congrats! You hit Blackjack!
        --> Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->`;
        feedback.style.backgroundColor = 'green';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';

        
        //adding money to wallet and resetting pot since you won
        
        playerWallet += (gamePot * 2);
        gamePot = 0; 
        potInfo.innerHTML = '$ ' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;

    } else if (playerCards > 21) {
        feedback.innerHTML = `PLAYER BUSTED!`;
        feedback.style.backgroundColor = 'red';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';

        //subtracting money from wallet since lost rip
        
        gamePot = 0; 
        potInfo.innerHTML = '$ ' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;

    } else if (dealerCards > 21) {
        feedback.innerHTML = `DEALER BUSTED! YOU WIN!
        --> Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->`;
        feedback.style.backgroundColor = 'green';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';

        

        //adding money to wallet and resetting pot since you won
        playerWallet += (gamePot * 2);
        gamePot = 0;    
        potInfo.innerHTML = '$ ' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;

    } else if (dealerCards > playerCards && dealerCards <= 21) {
        feedback.innerHTML = `Sorry! Dealer won
        --> Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->`;
        feedback.style.backgroundColor = 'red';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';

        //subtracting money from wallet since lost rip
       
        gamePot = 0; 
        potInfo.innerHTML = '$ ' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;
    } else {
        feedback.innerHTML = `Player Score: ${playerCards}-->
        Dealer Score: ${dealerCards}-->
        Cards Left: ${deckCopy.length}
        `
    }
}





function placeBet() {

    //better for memory
    let betAmt = Number(playerBet.value);


    //making sure player has enough money to bet and subtracting/adding to pot and updating info. neeed to add the logic for win and lose later
    //also making it so you can only bet in the beginning of the round
    if (playerWallet >= betAmt && playerCardsArr.length < 3) {
        gamePot += betAmt;
        playerWallet -= betAmt;
        potInfo.innerHTML = 'POT: $' + gamePot;
        walletInfo.innerHTML = '$ ' + playerWallet;

        console.log(gamePot)
    } else if (playerCardsArr.length > 2){
        console.log('CANT BET YET');
    } else {
        console.log('ADD MONEY PLS')

    }
}


//just testing random amount for now
function addMoney() {
    playerWallet += 10;
    walletInfo.innerHTML = '$ ' + playerWallet;
    
}

//need to add login maybe
//maybe add a class that way i can store the wallet value in the users class sort of like a profile or database without a database?
//can also store info like password and username to have a log in maybe?
//login with check against values in the player/user object/class if values are correct login and then display proper info like custom name and wallet etc
//add money can be something else later.
