
//function to generate a random numeric value------------------------------
var  randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

return value;
};
//randon numeric generator end--------------------------------------------------------------------------


//function to check fight or skip---------------------------
var fightOrSkip = function() {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or skip this battle?  Enter 'FIGHT' or 'SKIP' to choose.");
    
    //validate prompt answer
    if (promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        // use reture to call again and stop the rest of this () 
        return fightOrSkip();
    }
    //conert promptFIGHT to all lowercase
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        //confirm to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from player for skipping, but above 0
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // stop while() loop using break; and enter next fight

            //return if player wants leave
            return true;
        }
    }
    return false;
};
//-------------------------------------------------------





//fight function ---------include enemy object------------------------------------------
var fight = function (enemy) {
    //track who goes first
    var isPlayerTurn = true;
    
    //randomly change turn order
    if (Math.random() > 0.5){
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            //ask playerif they's like to fight or skip using fightoeskip ()
            if (fightOrSkip()) {
                //if true, leave fight with break
                break;
            }

        //generate random DAMAGE value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);

            console.log
            (playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. "
            );

        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! ");
            //award player money for winning
            playerInfo.money = playerInfo.name + 20;
            //leave while() loop since enemy is dead
            break;
        }   else {
            window.alert(enemy.name + " still has " + enemy.health + " health left. "
            );
        }

        //player gets attacked first
    } else {
      
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        //remove player's health by subtracting the amount set in the enemy.attack variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        );

        //check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //leave while loop if player dies

            break;
        }   else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
        }
        }
        //switch turn orer for next round
        isPlayerTurn = !isPlayerTurn;

    }
};
//end----------------------------------------------------------------------    


//function to start a new game // loop   ---------------------------------------------- 
var startGame = function () {

    //reset player status 
    playerInfo.reset();
    
    //fight each enemy one at a time loop over
    for (var i = 0; i < enemyInfo.length; i++) {

        //check player stats
        console.log(playerInfo);

        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            //let player know what round they're in 
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
          

            //pick new enemy to fight based on index of enemy array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before startin new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            
            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
             //if yeas, take them to the store( function
            if (storeConfirm) {
                    shop();
                }
            }
        }
        //if player isn't alive, break; let endgame function run else
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    //after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endgame function
    endGame();
};
//------------------------------------------------------------------


//function to end the entire game-----------------------------------
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    //check localstorage for high score,if it's not there use  0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null){
        highScore = o;
    }
    //if player has more money, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + "now has the high score of" + playerInfo.money + "!");

    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!")
    }
   
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
         }
};
//endGame end ---------------------------------------------------------------------



//shop function------call between battles------------------------------------------
var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action---------------------
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
             break;
        case 2:
            playerInfo.upgradeAttack();
             break;
        case 3:
            window.alert("Leaving the store");
            //do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};
//shop() end -----------------------------------------------------

//function to set player name-----------------------------------------------
var getplayerInfo, name = function () {
    var name = "";
    //loop prompt
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};
// END GAME FUNCTION---------------------------------------------



/*INFO-----------------------------------------------------------*/

//players info----//
var playerInfo = {
    name: getplayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
               }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;

        } else {
            window.alert("You don't have enough money!");
               }
    }
};

//enemy info----------------------------------------------
var enemyInfo = [

        {
            name: "Roborto",
            attack: randomNumber(10, 14)
        },

        {
            name: "Amy Android",
            attack: randomNumber(10, 14)
        },

        {
            name: "Robo Trumble",
            attack: randomNumber(10, 14)
        }
    ];


/*INFO END----------------------------------------------------------------*/

//call startgame>>>>>>>>>>>>>>>>>>
startGame();



