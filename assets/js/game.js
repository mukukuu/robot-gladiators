
//function to generate a random numeric value------------------------------
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};
//randon numeric generator end--------------------------------------------------------------------------



//fight or skip ()-------------------------------------------------------------------------

//ask player to fight or skip
var fightOrSkip = function () {
    //question window
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose. ');

    //conditional recursive () call--------------------

    //validate prompt answer
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        //return to call again and stop the rest()
        return fightOrSkip();
    }

    // let promptfight to all lowercase
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        //CONFIRM to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        //if yes(true), quit fight.
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // -money playermoney for skipping
            playerInfo.playerMoney = playerInfo.money - 10;

            //return true if choose to leave
            return true;
        }
    }
    return false;
};


//fight function ---------include enemy object------------------------------------------
var fight = function (enemy) {

    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
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
                playerInfo.money = playerInfo.money + 20;
                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left. "
                );
            }

             //player gets taacked first
        }else {
            
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //remove player's health by subtracting the amount set in the enemy.attack variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leave while( when die)
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
            }
            //while end    
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
      }
    };
    //fight function end----------------------------------------------------------------------    


    //function to start a new game // loop   ---------------------------------------------- 
    var startGame = function () {

        //reset player status 
        playerInfo.reset();

        //fight each enemy one at a time loop over
        for (var i = 0; i < enemyInfo.length; i++) {

            //if player is still alive, keep fighting
            if (playerInfo.health > 0) {
                //let player know what round they're in 
                window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
                debugger;

                //pick new enemy to fight based on index of enemy array
                var pickedEnemyObj = enemyInfo[i];

                //reset enemy.health before starting new fight
                pickedEnemyObj.health = randomNumber(40, 60);

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
            //if player isn't alive, stop the game, let endgame function run else
            else {
                window.alert('You have lost your robot in battle! Game Over!');
                break;
            }
        }
        //after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endgame function
        endGame();
    };



    //function to end the entire game-----------------------------------
    var endGame = function () {
        window.alert("The game has now ended. Let's see how you did!");

        //if player is still alive, player wins!
        if (playerInfo.health > 0) {
            window.alert("great job, you've survived the game! You now have a score of " + playerInfo.money + "."
            );
        }
        else {
            window.alert("You've lost your robot in battle!");
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
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter: '1 for REFILL', '2 for UPGRADE', or '3 for LEAVE' to make a choice."
        );

        //convert answer to number
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




    //function to set name--------------------------
    var getPlayerName = function () {
        var name = "";
        //loop
        while (name === "" || name === null) {
            name = prompt("What is your robot's name?");
            return name;
        }
        console.log("Your robot's name is " + name);
        return name
    };
    //function to set name end------------------------



    /*INFO-----------------------------------------------------------*/

    //players info----//
    var playerInfo = {
        name: getPlayerInfo(),
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
    console.log(enemyInfo);
    console.log(enemyInfo[0]);
    console.log(enemyInfo[0].name);
    console.log(enemyInfo[0]['attack']);

    /*INFO END----------------------------------------------------------------*/

    //call startgame>>>>>>>>>>>>>>>>>>
    startGame();


