// Create Pokemon

class Pokemon {
    constructor(name, maxHP, moveList = [], sprites) {
        this.name = name;
        this.maxHP = maxHP;
        this.moveList = moveList;
        this.sprites = sprites;  
        this.level = 10; 
    }
    escape() {
        // Give pokemon a 75% chance to run away
        let runChance = Math.random();
        // write an if else statement for running away
        if (runChance > .75) {
            alert(`You could not get away.`);
        } else {
            alert(`You got away.`); 
            location.reload(); 
        }
    }
}

const squirtle = new Pokemon('Squirtle', 48, [
    {
        name: 'Tackle',
        power: 40
    },
    {
        name: 'Water Gun',
        power: 40
    },
    {
        name: 'Rapid Spin',
        power: 50
    },
    {
        name: 'Bite',
        power: 60
    },
], 
    {
        frontSprite: 'images/squirtle front.gif',
        backSprite: 'images/squirtle back.gif'
    }
)

const charmander = new Pokemon('Charmander', 39, [
    {
        name: 'Scratch',
        power: 40
    },
    {
        name: 'Ember',
        power: 40
    },
    {
        name: 'Dragon Breath',
        power: 60
    },
    {
        name: 'Fire Fang',
        power: 65
    },
],
    {
        frontSprite: 'images/charmander front.gif',
        backSprite: 'images/charmander back.gif'
    }
)

const bulbasaur = new Pokemon('Bulbasaur', 45, [
    {
        name: 'Tackle',
        power: 40
    },
    {
        name: 'Vine Whip',
        power: 45
    },
    {
        name: 'Razor Leaf',
        power: 55
    },
    {
        name: 'Leech Seed', // make sure to add some health gain
        power: 30
    },
],
    {
        frontSprite: 'images/bulbasaur front.gif',
        backSprite: 'images/bulbasaur back.gif'
    }
)

// Global variables
const gameContainer = document.querySelector('#game-container'); 
const rules = document.querySelector('#rules'); 
const pokemonSelection = document.querySelector('#pokemon-selection'); 
const pokemonBattle = document.querySelector('#pokemon-battle'); 
const battleArenaDiv = document.querySelector('#battle-arena');
const bagDiv = document.querySelector('#bag-div');
const pokemonOptions = [bulbasaur, charmander, squirtle];


// Create a new function for hitting the start button and then choosing pokemon
function startGame () {
    const bulbasaurDiv = document.querySelector('#bulbasaur');
    const charmanderDiv = document.querySelector('#charmander');
    const squirtleDiv = document.querySelector('#squirtle');
    rules.remove(); 
    pokemonSelection.style.display = ''; 
    bulbasaurDiv.addEventListener('click', myBulbasaur);
    charmanderDiv.addEventListener('click', myCharmander);
    squirtleDiv.addEventListener('click', mySquirtle);
    
}

// Create functions for selecting your pokemon
function myBulbasaur (event) {
    pokemonBattlePage(bulbasaur);
}
function myCharmander (event) {
    pokemonBattlePage(charmander);
}
function mySquirtle (event) {
    pokemonBattlePage(squirtle);
}

// Create a function for the pokemon battle
function pokemonBattlePage(pokemon) {
    const enemyPokemon = pokemonOptions[Math.floor(Math.random() * 3)];
    const enemyPokemonDiv = document.querySelector('#enemy-pokemon');
    const playerPokemonDiv = document.querySelector('#player-pokemon');

    pokemonSelection.remove();
    pokemonBattle.style.display = ''; 

    // Add pokemon sprite for enemy
    const enemyImg = document.createElement('img');
    enemyImg.id = 'enemy-img'; 
    enemyImg.src = enemyPokemon.sprites.frontSprite;
    enemyImg.alt = enemyPokemon.name; 
    enemyPokemonDiv.appendChild(enemyImg);

    // Add health bar for enemy
    const enemyHealth = document.querySelector('#enemy-health');
    enemyHealth.value = enemyPokemon.maxHP; 
    enemyHealth.max = enemyPokemon.maxHP; 
    
     
    // Add pokemon sprite for player
    const playerImg = document.createElement('img');
    playerImg.src = pokemon.sprites.backSprite;
    enemyImg.alt = pokemon.name; 
    playerPokemonDiv.appendChild(playerImg);

    // Add health bar for player
    const playerHealth = document.querySelector('#player-health');
    playerHealth.value = pokemon.maxHP; 
    playerHealth.max = pokemon.maxHP; 

    // Add click options for all buttons
    const battleButton = document.querySelector('#fight');
    const runButton = document.querySelector('#run');
    const bagButton = document.querySelector('#bag');
    const jumpButton = document.querySelector('#jump');
    
    document.querySelector('#battle-choices').addEventListener('click', buttonSelection);

    function buttonSelection (event) {
        const button = event.target;

        if(button.id === 'fight') {
            battle(); 
        } else if (button.id === 'run') {
            run();
        } else if (button.id === 'bag') {
            bag();
        } else if (button.id === 'jump') {
            jump();
        }
    }

    function battle() {
    const battleChoices = document.querySelector('#battle-choices');
    
    // Clear existing event listeners
    const newBattleChoices = battleChoices.cloneNode(true);
    battleChoices.parentNode.replaceChild(newBattleChoices, battleChoices);

    const battleButton = newBattleChoices.querySelector('#fight');
    const runButton = newBattleChoices.querySelector('#run');
    const bagButton = newBattleChoices.querySelector('#bag');
    const jumpButton = newBattleChoices.querySelector('#jump');

    // Set new button text to reflect moves
    battleButton.textContent = pokemon.moveList[0].name;
    runButton.textContent = pokemon.moveList[1].name;
    bagButton.textContent = pokemon.moveList[2].name;
    jumpButton.textContent = pokemon.moveList[3].name;

    // Assign attack selection event
    newBattleChoices.addEventListener('click', attackSelection);

    function attackSelection (event) {
        const button = event.target;

        if(button.id === 'fight') {
            attackOne(); 
        } else if (button.id === 'run') {
            attackTwo();
        } else if (button.id === 'bag') {
            attackThree();
        } else if (button.id === 'jump') {
            attackFour();
        }
    }
        
        function attackOne () {
            const attackPower = pokemon.moveList[0].power * .25; 
            enemyHealth.value -= attackPower; 

            setTimeout(() => {if(enemyHealth.value <= 0) {
                alert(`Congratulations! You've defeated the enemy ${enemyPokemon.name}.`);
                location.reload();
            } else {
                setTimeout(enemyAttack, 500);
            }}, 500); 
        }
        function attackTwo () {
            const attackPower = pokemon.moveList[1].power * .25; 
            enemyHealth.value -= attackPower; 
            
            setTimeout(() => {if(enemyHealth.value <= 0) {
                alert(`Congratulations! You've defeated the enemy ${enemyPokemon.name}.`);
                location.reload();
            } else {
                setTimeout(enemyAttack, 500);
            }}, 500);
            
        }
        function attackThree () {
            const attackPower = pokemon.moveList[2].power * .25; 
            enemyHealth.value -= attackPower; 

            setTimeout(() => {if(enemyHealth.value <= 0) {
                alert(`Congratulations! You've defeated the enemy ${enemyPokemon.name}.`);
                location.reload();
            } else {
                setTimeout(enemyAttack, 500);
            }}, 500);
        }
        function attackFour () {
            const attackPower = pokemon.moveList[3].power * .25; 
            enemyHealth.value -= attackPower; 

            setTimeout(() => {if(enemyHealth.value <= 0) {
                alert(`Congratulations! You've defeated the enemy ${enemyPokemon.name}.`);
                location.reload();
            } else {
                setTimeout(enemyAttack, 500);
            }}, 500);
        }
    }
    
    function run() {
        pokemon.escape(); 
    }
    
    function bag() {
        bagDiv.style.display = '';
        document.querySelector('#potion').addEventListener('click', usePotion);

        function usePotion (event) {
            playerHealth.value += 20; 
            bagDiv.style.display = 'none';
            setTimeout(enemyAttack, 500); 
            resetBattleOptions();
        }
    }
    
    function jump() {
        const jumpChance = Math.random();

        if (jumpChance < .8) {
            alert(`You successfully avoided the enemy ${enemyPokemon.name}'s attack`);
        } else {
            alert(`You jumped, but the enemy ${enemyPokemon.name}'s attack still managed to hit you.`);
            setTimeout(enemyAttack, 500);
        }
    }

    function resetBattleOptions () {
    
    const battleChoices = document.querySelector('#battle-choices');
    
    // Clear existing event listeners
    const newBattleChoices = battleChoices.cloneNode(true);
    battleChoices.parentNode.replaceChild(newBattleChoices, battleChoices);

    const battleButton = newBattleChoices.querySelector('#fight');
    const runButton = newBattleChoices.querySelector('#run');
    const bagButton = newBattleChoices.querySelector('#bag');
    const jumpButton = newBattleChoices.querySelector('#jump');

    // Reset button text
    battleButton.textContent = 'FIGHT';
    runButton.textContent = 'RUN';
    bagButton.textContent = 'BAG';
    jumpButton.textContent = 'JUMP';

    // Re-assign original event listeners
    battleButton.onclick = battle;
    runButton.onclick = run;
    bagButton.onclick = bag;
    jumpButton.onclick = jump; 
    }

    function enemyAttack() {
        const attackIndex = Math.floor(Math.random() *4);
        const attackPower = enemyPokemon.moveList[attackIndex].power * .25;
        alert(`Enemy ${enemyPokemon.name} used ${enemyPokemon.moveList[attackIndex].name}.`)
        playerHealth.value -= attackPower; 
        setTimeout(() => {if (playerHealth.value <= 0) {
            alert(`You have been defeated by the enemy ${enemyPokemon.name}.`); 
            location.reload();  
        } else {
            resetBattleOptions();
        }}, 500); 
    }

    

}


