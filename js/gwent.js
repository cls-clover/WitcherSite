const gwentCards = document.querySelector('#gwentCards');

function cachedFetch(url) {
    return caches.open('my-gwent-cache').then(cache => {
        return cache.match(url).then(response => {
            if (response) {
                console.log(`Загружено из кеша: ${url}`);
                return response;
            }
            console.log(`Запрос к сети: ${url}`);
            return fetch(url).then(networkResponse => {
                cache.put(url, networkResponse.clone()); // Клонируем ответ для кеша
                return networkResponse;
            });
        });
    });
}

function initTippyTooltips() {
    const cardArtElements = document.querySelectorAll('.G1-card-art-only[data-g1id]'); // Находим контейнеры артов с data-g1id

    cardArtElements.forEach(cardArt => {
        const cardId = cardArt.dataset.g1id;
        const requestUrl = `https://api.gwent.one/?key=data&response=html&language=ru&version=latest&id=${cardId}&html=artsize.name.category.ability.keywords.flavor`;

        const tippyCfg = {
            trigger: 'mouseenter focus', // Показывать при наведении и фокусе
            theme: 'G1',
            interactive: true,
            maxWidth: '420px',
            allowHTML: true,
            onShow(instance) {
                cachedFetch(requestUrl)
                    .then(response => response.text())
                    .then(text => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = text;
                        const name = tempDiv.querySelector('.G1-name span')?.textContent || 'Нет названия';
                        const category = tempDiv.querySelector('.G1-category span')?.textContent || '';
                        const ability = tempDiv.querySelector('.G1-ability span')?.innerHTML || '';
                        const keywords = tempDiv.querySelector('.G1-keywords span')?.innerHTML || '';
                        const flavor = tempDiv.querySelector('.G1-flavor span')?.textContent || '';

                        const tooltipContent = `
                            <h4>${name}</h4>
                            <p>Категория: ${category}</p>
                            ${ability ? `<p>Способность: ${ability}</p>` : ''}
                            ${keywords ? `<p>Ключевые слова: ${keywords}</p>` : ''}
                            ${flavor ? `<p>Вкус: <i>${flavor}</i></p>` : ''}
                        `;

                        const purified = DOMPurify.sanitize(tooltipContent);
                        instance.setContent(purified);
                    })
                    .catch(error => {
                        console.error(`Ошибка загрузки данных для карты ${cardId}:`, error);
                        instance.setContent('Ошибка загрузки данных');
                    });
            }
        };
        tippy(cardArt, tippyCfg);
    });
}

window.addEventListener( 'load', () => {

    cachedFetch("https://api.gwent.one/?key=data&response=html&language=ru&version=latest")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // Получаем HTML как текст
        })
        .then(html => {
            const factionContainers = document.getElementById("faction-containers");
            if (factionContainers) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html; // Парсим HTML в DOM

                const allCards = tempDiv.querySelectorAll('.G1-card');
                const factionMap = {
                    "nilfgaard": document.getElementById("nilfgaard-cards"),
                    "northern_realms": document.getElementById("northern_realms-cards"),
                    "scoiatael": document.getElementById("scoiatael-cards"),
                    "monster": document.getElementById("monster-cards"),
                    "skellige": document.getElementById("skellige-cards")
                };

                allCards.forEach(card => {
                    const faction = card.getAttribute('data-faction');
                    if (factionMap[faction]) {
                        const artDiv = card.querySelector('.G1-art');
                        if (artDiv && card.dataset.id) {
                            const cardContainer = document.createElement('div');
                            cardContainer.classList.add('G1-card-art-only'); // Добавим класс для стилизации
                            cardContainer.dataset.g1id = card.dataset.id; // Используем data-id для g1id
                            cardContainer.innerHTML = artDiv.outerHTML; // Вставляем арт
                            factionMap[faction].appendChild(cardContainer);
                        }
                    }
                });

                // После вставки артов инициализируем tippy.js
                initTippyTooltips();

            } else {
                console.error("Элемент с id 'faction-containers' не найден в HTML.");
            }
        })
        .catch(error => {
            console.error("Произошла ошибка при получении данных:", error);
        });

} );


