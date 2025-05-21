


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



// HW 2 - Stopwatch

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

    const totalSeconds = Math.floor(elapsedTime / 1000);
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


// MOVE BLOCK

const parent_block = document.querySelector('.parent_block');
const child_block = document.querySelector('.child_block');

let child_pos_x = 0, child_pos_y = 0;

const maxX = parent_block.clientWidth - child_block.offsetWidth;
const maxY = parent_block.clientHeight - child_block.offsetHeight;

child_block.style.left = `${child_pos_x}px`;
child_block.style.top = `${child_pos_y}px`;

let currentState = 'end';

const animate = () => {

    switch (currentState) {
        case 'end':
            if (child_pos_x < maxX) {
                child_pos_x++;
            } else {
                child_pos_x = maxX;
                currentState = 'bottom';
            }
            child_block.style.left = `${child_pos_x}px`;
            requestAnimationFrame(animate)
            break;

        case 'bottom':
            if (child_pos_y < maxY) {
                child_pos_y++;
            } else {
                child_pos_y = maxY;
                currentState = 'start';
            }
            child_block.style.top = `${child_pos_y}px`;
            requestAnimationFrame(animate)
            break;

        case 'start':
            if (child_pos_x > 0) {
                child_pos_x--;
            } else {
                child_pos_x = 0;
                currentState = 'top';
            }
            child_block.style.left = `${child_pos_x}px`;
            requestAnimationFrame(animate)
            break;

        case 'top':
            if (child_pos_y > 0) {
                child_pos_y--;
            } else {
                child_pos_y = 0;
                currentState = 'end';
            }
            child_block.style.top = `${child_pos_y}px`;
            requestAnimationFrame(animate)
            break;

        default:
            break;
    }
};

animate();

