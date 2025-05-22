document.addEventListener('DOMContentLoaded', () => {
    const armorButtons = {
        geralt_manticore: document.getElementById('geralt_manticore'),
        geralt_wolf: document.getElementById('geralt_wolf'),
        geralt_griffin: document.getElementById('geralt_griffin'),
        geralt_felline: document.getElementById('geralt_felline'),
        geralt_bear: document.getElementById('geralt_bear')
    };

    const geraltImage = document.querySelector('#geralt_image');
    const descriptionContainer = document.createElement('p'); // Создаем контейнер для описания
    descriptionContainer.style.marginTop = '20px'; // Добавляем отступ сверху
    descriptionContainer.style.color = '#ccc'; // Задаем цвет текста

    const inventoryContainer = document.querySelector('.inventory .container');
    inventoryContainer.appendChild(descriptionContainer); // Добавляем контейнер описания в DOM

    const armorImages = {
        geralt_manticore: '../img/geralt_manticore.png',
        geralt_wolf: '../img/geralt_wolf.png',
        geralt_griffin: '../img/geralt_griffin.png',
        geralt_felline: '../img/geralt_felline.png',
        geralt_bear: '../img/geralt_bear.png'
    };

    const armorDescriptions = {
        geralt_manticore: 'Броня Школы Мантикоры: Легкая броня, идеально подходящая для алхимиков и тех, кто ценит скорость и смертоносные яды.',
        geralt_wolf: 'Броня Школы Волка: Универсальная средняя броня, обеспечивающая баланс между защитой и маневренностью, предпочитаемая опытными ведьмаками.',
        geralt_griffin: 'Броня Школы Грифона: Средняя броня, усиливающая Знаки и идеально подходящая для ведьмаков, полагающихся на магию в бою.',
        geralt_felline: 'Броня Школы Кота: Легкая броня, созданная для быстрых и ловких бойцов, наносящих сокрушительные удары.',
        geralt_bear: 'Броня Школы Медведя: Тяжелая броня, обеспечивающая максимальную защиту от врагов, предпочитаемая теми, кто не боится прямого столкновения.'
    };

    for (const armor in armorButtons) {
        if (armorButtons.hasOwnProperty(armor)) {
            armorButtons[armor].addEventListener('click', () => {
                if (geraltImage && armorImages[armor] && descriptionContainer && armorDescriptions[armor]) {
                    geraltImage.src = armorImages[armor];
                    descriptionContainer.textContent = armorDescriptions[armor]; // Обновляем описание
                }
            });
        }
    }

    // Изначально показываем описание для первой брони (Мантикоры)
    if (descriptionContainer && armorDescriptions['geralt_manticore']) {
        descriptionContainer.textContent = armorDescriptions['geralt_manticore'];
    }
});




