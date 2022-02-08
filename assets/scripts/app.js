const ATTACK_VALUE = 10; // Global variable
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 5;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damageMonster = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damageMonster;

  const damagePlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damagePlayer
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!, congratulations..')
  }else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster won!')
  }else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!')
  }
}

attackBtn.addEventListener('click', attackHandler)