const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

const updateFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("你好爛");
    location.reload();
}

const changeDirection = (e) =>{
    if(e.key == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


const initGame = () => {
    if(gameOver){ 
        handleGameOver();
        return;
    }
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        if(score > highScore){
            highScore = score;
            localStorage.setItem("high-score", highScore);
        }
        scoreElement.textContent = `Score: ${score}`;
        highScoreElement.textContent = `High Score: ${highScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];

    if(snakeX > 30 || snakeX <= 0 || snakeY > 30 || snakeY <= 0)
        return gameOver = true;
    
    for(let i=0; i<snakeBody.length; i++){
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i!=0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
            gameOver = true;
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener('keydown', changeDirection);




//reload
var ppp = (e, num) => {
    console.log(num);
    alert("mother fucker");    
};

const button = document.querySelector('.test');
button.addEventListener('click', tmp =>{
    var num = 2;
    ppp(tmp, num);
});