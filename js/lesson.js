// TAB SLIDER

const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParent = document.querySelector('.tab_content_items');
let intervalId;
let currentIndex = 0;

const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    });
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    });
};

const showTabsContentCards = (indexElement) => {
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active');
    currentIndex = indexElement;
};

const nextTab = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= tabsItems.length) {
        nextIndex = 0;
    }
    hideTabsContentCards();
    showTabsContentCards(nextIndex);
};

const startInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextTab, 3000);
};

hideTabsContentCards();
showTabsContentCards(currentIndex);

startInterval();

tabsItemsParent.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        const clickedIndex = Array.from(tabsItems).indexOf(event.target);

        if (clickedIndex !== currentIndex) {
            clearInterval(intervalId);

            hideTabsContentCards();
            showTabsContentCards(clickedIndex);
            startInterval();
        }
    }
});


// STOPWATCH

const time = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');


let startTime = 0;
let elapsedTime = 0;
let intervalIdTimer;
let paused = true;

const pad = (unit, targetLength = 2) => {
    const unitString = String(unit);
    return unitString.padStart(targetLength, '0');
}

const updateTime = () => {
    elapsedTime = Date.now() - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000 * 2000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const millis = elapsedTime % 100;

    renderTime(hrs, mins, secs, millis);
}

const renderTime = (hrs, mins, secs, millis) => {
    const formattedHrs = pad(hrs);
    const formattedMins = pad(mins);
    const formattedSecs = pad(secs);
    const formattedMillis = pad(millis);

    time.textContent = `${formattedHrs}:${formattedMins}:${formattedSecs}.${formattedMillis}`;

}

startButton.addEventListener('click', (e) => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalIdTimer = setInterval(updateTime, 10);
    }
})

pauseButton.addEventListener('click', (e) => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalIdTimer);
    }
})

resetButton.addEventListener('click', (e) => {
    paused = true;
    clearInterval(intervalIdTimer);
    startTime = 0;
    elapsedTime = 0;

    renderTime(0, 0, 0, 0);
})

renderTime(0, 0, 0, 0);


// Ciri Game

const CELL_SIZE = 40;
const MAZE_COLS = 21;
const MAZE_ROWS = 21;

let maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];


let player = { x: 1, y: 1 };
let ciri = { x: MAZE_COLS - 2, y: MAZE_ROWS - 2 };
let score = 0;
let ciriMoveInterval;
let isCatchMessageVisible = false;
let isPaused = false;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const catchMessage = document.getElementById('catchMessage');

canvas.width = MAZE_COLS * CELL_SIZE;
canvas.height = MAZE_ROWS * CELL_SIZE;

const geraltImage = new Image();
geraltImage.src = '../img/chibi_geralt.png';
geraltImage.onerror = () => console.error("Не удалось загрузить изображение Геральта.");

const ciriImage = new Image();
ciriImage.src = '../img/chibi_ciri.png';
ciriImage.onerror = () => console.error("Не удалось загрузить изображение Цири.");


function getFarthestValidPosition() {
    let farthestX = -1;
    let farthestY = -1;
    let maxDistance = -1;

    for (let row = 0; row < MAZE_ROWS; row++) {
        for (let col = 0; col < MAZE_COLS; col++) {
            if (maze[row][col] === 0 && !(col === player.x && row === player.y)) {
                const distance = Math.abs(player.x - col) + Math.abs(player.y - row);
                if (distance > maxDistance) {
                    maxDistance = distance;
                    farthestX = col;
                    farthestY = row;
                }
            }
        }
    }
    return { x: farthestX, y: farthestY };
}

function drawGame() {
    window.onscroll = () => {
        isPaused = true;
    }

    if (isPaused) {

    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < MAZE_ROWS; row++) {
            for (let col = 0; col < MAZE_COLS; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'rgba(139,71,163,0.8)';

                    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else {
                    ctx.fillStyle = 'rgba(73,60,78,0.8)';

                    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }

        ctx.drawImage(geraltImage, player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(ciriImage, ciri.x * CELL_SIZE, ciri.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        scoreDisplay.textContent = score;
    }
}


function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX >= 0 && newX < MAZE_COLS && newY >= 0 && newY < MAZE_ROWS && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        checkCollision();
        requestAnimationFrame(drawGame);
    }
}

function moveCiri() {
    const possibleMoves = [];
    const moves = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 }
    ];

    for (const move of moves) {
        const newX = ciri.x + move.dx;
        const newY = ciri.y + move.dy;

        if (newX >= 0 && newX < MAZE_COLS && newY >= 0 && newY < MAZE_ROWS && maze[newY][newX] === 0) {
            possibleMoves.push({ x: newX, y: newY });
        }
    }

    if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        ciri.x = randomMove.x;
        ciri.y = randomMove.y;
        checkCollision();
        requestAnimationFrame(drawGame);
    } else {

    }
}

function checkCollision() {
    if (player.x === ciri.x && player.y === ciri.y) {
        score++;
        ciri = getFarthestValidPosition();
        showCatchMessage();
    }
}

function showCatchMessage() {
    if (!isCatchMessageVisible) {
        catchMessage.style.display = 'block';
        isCatchMessageVisible = true;
        setTimeout(() => {
            catchMessage.style.display = 'none';
            isCatchMessageVisible = false;
        }, 1500);
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            e.preventDefault();
            isPaused = false;
            if (e.key === 'ArrowUp') movePlayer(0, -1);
            else if (e.key === 'ArrowDown') movePlayer(0, 1);
            else if (e.key === 'ArrowLeft') movePlayer(-1, 0);
            else if (e.key === 'ArrowRight') movePlayer(1, 0);
            break;
    }
});


function initGame() {
    player = { x: 1, y: 1 };
    ciri = getFarthestValidPosition();
    score = 0;

    clearInterval(ciriMoveInterval);
    ciriMoveInterval = setInterval(moveCiri, 250);
    console.log('Ciri move interval started.');

    requestAnimationFrame(drawGame);
}

window.onload = function() {
    initGame();
};

window.addEventListener('resize', () => {
    requestAnimationFrame(drawGame);
});


//WEATHER
const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

searchButton.onclick = async () => {
    try {
        if (searchInput.value !== ''){
            const response = await fetch(`${BASE_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=ru`)
            const data = await response.json()
            if (data.cod === '404'){
                cityName.innerHTML = 'Город не найден'
            }else {
                cityName.innerHTML = data.name
                cityTemp.innerHTML = Math.round(data.main.temp) + '°C'
            }
            searchInput.value = ''

        }else {
            cityName.innerHTML = 'Введите название города'
            cityTemp.innerHTML = ''
        }
    }catch (e){
        console.error('Error')
    }

}

