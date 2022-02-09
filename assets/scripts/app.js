// Global variables
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const LOG_EVENT_BONUS_LIFE = 'BONUS_LIFE';


const enteredValue = prompt('Enter the maximun life for you and the monster: ', '100')
let chosenMaxLife = parseInt(enteredValue);

let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);


function printLogHandler() {
  console.log(battleLog);
}

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry ={
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };

  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER'
    
  } else if (event === LOG_EVENT_STRONG_PLAYER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };

  }  else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };

  }  else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };

  }  else if (event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const damagePlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damagePlayer

  writeToLog(LOG_EVENT_MONSTER_ATTACK, damagePlayer, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);

    alert('You would be dead but the bonus life save you!');
  }
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    alert('You won!, congratulations...');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    alert('Monster won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    writeToLog(LOG_EVENT_GAME_OVER, 'IT IS A DRAW', currentMonsterHealth, currentPlayerHealth);
    alert('You have a draw!');
  }

  if (currentMonsterHealth <=0 || currentPlayerHealth <=0) {
    reset();
  }
}

function attackMonster(typeOfAttack) {
  let maxDamage;
  let logEvent;
  if (typeOfAttack === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK
  }else if (typeOfAttack === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_STRONG_PLAYER_ATTACK
  }

  const damageMonster = dealMonsterDamage(maxDamage);
  writeToLog(logEvent, damageMonster, currentMonsterHealth, currentPlayerHealth);

  currentMonsterHealth -= damageMonster;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
 attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue

  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
  endRound();
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);