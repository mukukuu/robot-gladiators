//player
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames[0]);
console.log(enemyNames[1]);
console.log(enemyNames[2]);
console.log(enemyNames.length);

for(var i = 0; i < enemyNames.length; i++) {
console.log(enemyNames[i]);
console.log(i);
console.log(enemyNames[i] + " is at " + i + " index ");
  }
//enemy



var fight = function(enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    
    while(playerHealth > 0 && enemyHealth > 0)
          {
         
   
    // ask player if they'd like to fight or run

var promptFight =window.prompt("Would you like to FIGHT or skip this battle?  Enter 'FIGHT' or 'SKIP' to choose."
);

    //if player picks skip then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP" ) {
    // confirm player wants to skip
    var confirmSkip = window.confirm ( "Are you sure you'd like to quit?");
    
    // if yes ( true ), leave fight
    if (confirmSkip) {
        window.alert (playerName + " has decided to skip this fight. Goodbye!");
    //subtract money from playerMoney for skipping
    playerMoney = playerMoney - 10;
    console.log("playerMoney", playerMoney);
    break;
    }
    } 


     //REMOVE ENEMY'S HEALTH BY SUBTRACTING THE AMOUNT SET IN  THE PLAYERATTACK VARIABLE
     enemyHealth = enemyHealth -playerAttack;
     console.log (
         playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
     );

     //check enemy's health
     if (enemyHealth <= 0) {      
           window.alert(enemyName + " has died! ");
     //award player money for winning
     playerMoney = playerName + 20;
     //leave while() loop since enemy is dead
    break;
         } 

    else {
           window.alert(enemyName + " still has " + enemyHealth + " health left. "
           );
         }

   //remove player's health by subtracting the amount set in the enemyAttack variable
   playerHealth = playerHealth - enemyAttack;
   console.log(
       enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
   );
   //check player's health
   if (playerHealth <= 0) {
       window.alert (playerName + " has died!");
       break;
            } 
   else {
       window.alert(playerName + " still has " + playerHealth + " health left. " ); 
        } 
    //while function end    
    }
//fight function end    
};

// loop   ---------------------------------------------- 
for(var i = 0; i < enemyNames.length; i++) {

    //if player is still alive, keep fighting
if (playerHealth > 0) {
    //let player know what round they're in 
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    //pick new enemy to fight based on index of enemy array
   var pickedEnemyName = enemyNames[i];
   
   //reset enemyHealth before starting new fight
    enemyHealth = 50;
    
   //use debugger to pause script from running and check what's going on at that moment in the code
   // debugger;


   // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
}
   //if player isn't alive, stop the game
 else {
    window.alert('You have lost your robot in battle! Game Over!');
 break;
  }
}


