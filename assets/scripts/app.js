// Global variable
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(typeOfAttack) {
  let maxDamage;
  if (typeOfAttack === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  }else if (typeOfAttack === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damageMonster = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damageMonster;

  const damagePlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damagePlayer
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!, congratulations...')
  }else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster won!')
  }else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!')
  }
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
 attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);