// JOIN BLOCK
const emailInput = document.querySelector('#gmail_input');
const checkButton = document.querySelector('#check_button');
const emailResult = document.querySelector('#gmail_result');
// PHONE BLOCK
const phoneInput = document.querySelector('#phone_input');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regExpPhone = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/


checkButton.onclick = () => {
    if (regExp.test(emailInput.value) && regExpPhone.test(phoneInput.value)) {
        emailResult.innerHTML = `<div style="text-align: center">Вы выдержали испытание <br/>травами и не умерли.</div>`;
        emailResult.style.color = '#1ac012';
    } else {
        emailResult.innerHTML = `<div style="text-align: center">Вы не выдержали испытание <br/>травами и умерли.</div>`;
        emailResult.style.color = '#f32424';
    }
}


// -------- MAYBE FRIENDS ---------

const characters_list = document.querySelector('.characters-list');

const getCharacters = async () => {
    try {
        const response = await fetch("../data/characters.json")
        const data = await response.json()
        createCharacters(data);
    } catch (e) {
        console.log(e)
    }
}

const createCharacters = (characters) => {
    characters_list.innerHTML = '';

    characters.forEach((character) => {
        const character_card = document.createElement('div');
        character_card.classList.add('character-card');

        character_card.innerHTML = `
        <div class="character-photo">
            <img src="${character.photo}" alt="${character.name}"></img>
        </div>
        <h3>${character.name}</h3>
        <span><i>alias:</i> ${character.alias}</span>
        <span><i>gender:</i> ${character.gender}</span>
    `

        characters_list.append(character_card);
    })
}

getCharacters().then(r => console.log("success fetched characters"));


// FILL YOURSELF

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let cardId = 1


const fetchTodo = async (cardId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
            .then(res => res.json())

        const {id, title} = response
        cardBlock.innerHTML = `<p>${title}</p><p>${id}</p>`

    } catch (e) {
        console.log(e)
    }
}


const updateIdForTodo = (btnType) => {
    if (btnType === 'next') {
        cardId = cardId === 200 ? 1 : cardId + 1;
    } else if (btnType === 'prev') {
        cardId = cardId === 1 ? 200 : cardId - 1;
    }
    fetchTodo(cardId).then()
}

btnNext.onclick = () => updateIdForTodo('next')
btnPrev.onclick = () => updateIdForTodo('prev')

fetchTodo(cardId).then()


// Exchange the currency

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const cnyInput = document.querySelector('#cny')

const converter = (element, targetElements) => {
    element.oninput = async () => {
        const response = await fetch("../data/converter.json")
        const data = await response.json()

        for (const targetElement of targetElements) {
            if (element.id === "som") {
                if (targetElement.id === "usd") {
                    targetElement.value = (element.value / data.usd).toFixed(2)
                } else if (targetElement.id === "cny") {
                    targetElement.value = (element.value / data.cny).toFixed(2)
                }
            }

            if (element.id === "usd") {
                if (targetElement.id === "som") {
                    targetElement.value = (element.value * data.usd).toFixed(2)
                } else if (targetElement.id === "cny") {
                    targetElement.value = ((element.value * data.usd) / data.cny).toFixed(2)
                }
            }

            if (element.id === "cny") {
                if (targetElement.id === "som") {
                    targetElement.value = (element.value * data.cny).toFixed(2)
                } else if (targetElement.id === "usd") {
                    targetElement.value = ((element.value * data.cny) / data.usd).toFixed(2)
                }
            }


            if (element.value === '') targetElement.value = ''
        }
    }

}

converter(somInput, [usdInput, cnyInput]);
converter(usdInput, [somInput, cnyInput]);
converter(cnyInput, [somInput, usdInput]);

