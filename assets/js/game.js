//player
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttact = 10;
var playerMoney =10;

//enemy
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttact = 12;

var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
var promptFight =window.prompt("Would you like to FIGHT or skip this battle?  Enter 'FIGHT' or 'SKIP' to choose."
);
  // if player choose to fight, then fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
      //REMOVE ENEMY'S HEALTH BY SUBTRACTING THE AMOUNT SET IN  THE PLAYERATTACK VARIABLE
      enemyHealth = enemyHealth -playerAttact;
      console.log (
          playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
      );

      //check enemy's health
      if (enemyHealth 
        <= 0) {
            window.alert(enemyName + " has died! ");
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left. "
            );
        }

    //remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttact;
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
    );
    //check player's health
    if (playerHealth <= 0) {
        window.alert (playerName + " has died!");
    } 
    else {
        window.alert(playerName + " still has " + playerHealth + " health left. " ); 
    } 
    //if player choose to skip
    } 
    else if (promptFight === "skip" || promptFight === "SKIP" ) {
        // confirm player wants to skip
        var confirmSkip = window.confirm ( "Are you sure you'd like to quit?");
        
        // if yes ( true ), leave fight
        if (confirmSkip) {
            window.alert (playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 2;
        }
    //if no ( false ), ask question again by running fight () again
    else {
        fight();
    }
    }

    
 //function end  
}
fight();
