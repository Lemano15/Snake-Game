let instructionsBtn = document.getElementById('instructionsBtn');
let welcomeScreen = document.getElementById('welcomeScreen')
let snakeArea = document.getElementById('snakeArea')
let instructionsScreen = document.getElementById('instructionsScreen')
let backBtn = document.getElementById('backBtn')
let startBtn = document.getElementById('startBtn')
let gamePage = document.getElementById('gamePage')
let gameInfo = document.getElementById('gameInfo')
let resetBtn = document.getElementById('reset')
let scoreDisplay = document.getElementById('scoreDisplay')
let endScreen = document.getElementById('gameOverScreen')
const grid = []
let currentSnake = [2,1,0]
let direction = 1;
let appleSquare = 0
let score = 0
let intervalTime = 1000
let timerId = 0;

//Button Functionality & Styling

instructionsBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
instructionsScreen.style.display = 'flex';
})

backBtn.addEventListener('click', () => {
    instructionsScreen.style.display = 'none'
    welcomeScreen.style.display = 'flex'
})

startBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    gamePage.style.display = 'flex';
    gameInfo.style.display = 'flex';
    startGame()
})

resetBtn.addEventListener('click', () => {
    gamePage.style.display = 'none'
    document.getElementById('gameInfo').style.display = 'none'
    welcomeScreen.style.display = 'flex'
    endScreen.style.display = 'none'
    resetGame()
})


//Game Mechanics
function startGame() {
    timerId = setInterval(move, intervalTime);
    generateApple();
}

function resetGame() {
    //remove styling from previous snake
    currentSnake.forEach(index => grid[index].classList.remove('snake'));
    currentSnake = [2,1,0]
    //re-add styling to starting snake
    currentSnake.forEach(index => grid[index].classList.add('snake'));
    direction = 1;
    //reset and re-render apple
    grid[appleSquare].classList.remove('apple')
    //reset scoreDisplay 
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = 1000;
    timerId = 0;
    snakeArea.style.backgroundColor = 'rgb(0, 128, 0, 1)'
}

    function createGrid() {
        //creating 100 squares for our grid
        let count = 0;
        for (let i = 0; i < 100; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            snakeArea.appendChild(square);
            grid.push(square);
        }
    }

    createGrid();
    currentSnake.forEach(index => grid[index].classList.add('snake'));

    function move() {
        //checks if snake is at a border
        if ((currentSnake[0] - 10 < 0  && direction === -10)|| 
            (currentSnake[0] % 10 === 9 && direction === 1) || 
            (currentSnake[0] + 10 >= 100 && direction === 10) || 
            (currentSnake[0] % 10 === 0 && direction === -1) || 
            (grid[currentSnake[0] + direction].classList.contains('snake'))) {
                endScreen.style.display = 'block';
                snakeArea.style.backgroundColor = 'rgb(0, 128, 0, .5)'
                return clearInterval(timerId);
            }
            
        //remove the first index of currentSnake
        let tail = currentSnake.pop();
        //remove the styling of that index
        grid[tail].classList.remove('snake');
        //add a value to the end of the currentSnake array and add styling
        currentSnake.unshift(currentSnake[0] + direction);
        grid[currentSnake[0]].classList.add('snake');

        if (grid[currentSnake[0]].classList.contains('apple')) {
            //remove the apple in the location
            grid[appleSquare].classList.remove('apple');

            //regenerate another apple
            generateApple();
            //increase the length of the currentSnake array
            grid[tail].classList.add('snake');
            currentSnake.push(tail);

            //increase score
            score++;
            scoreDisplay.textContent = score;

            //increase the speed of the game
            clearInterval(timerId);
            intervalTime = intervalTime * .9;
            timerId = setInterval(move, intervalTime);
        }
    }

    function generateApple() {
        do {
            appleSquare = Math.floor(Math.random() * grid.length);
        } while (grid[appleSquare].classList.contains('snake'));
        grid[appleSquare].classList.add('apple');
    }
    
    //directional controls
    function control(event) {
        if (event.keyCode === 37) {
            direction = -1;
        } else if(event.keyCode === 38) {
            direction = -10;
        } else if(event.keyCode === 39) {
            direction = 1;
        } else if(event.keyCode === 40) {
            direction = 10;
        }
    }
    document.addEventListener('keyup', control);