const forecastDiv = document.getElementById('forecast');
const weatherSymbols = {
    'Sunny': '☀',
    'Partly sunny': '⛅',
    'Overcast': '☁',
    'Rain': '☂',
    'degrees': '°'
}

function attachEvents() {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {
    forecastDiv.style.display = 'block';

    try {
        const location = document.getElementById('location').value;

        const locationCode = await getCode(location);

        const [current, upcoming] = await Promise.all([
            getTodayWeater(locationCode),
            getThreeDaysWeather(locationCode)
        ])

     } catch (error) {
         forecastDiv.textContent = 'Error';
     }
}

async function getCode(location) {
    const url = `http://localhost:3030/jsonstore/forecaster/locations`;

    const responseLocation = await fetch(url);
    const dataLocation = await responseLocation.json();

    let currLocation = dataLocation.find(l => l.name.toLowerCase() == location.toLowerCase());

    if (!currLocation) {
        throw new Error;
    }

    return currLocation.code;
}

async function getTodayWeater(locationCode) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;

    const responseCurrent = await fetch(url);
    const dataCurrent = await responseCurrent.json();

    //HTML elements
    const currentDiv = document.getElementById('current');

    const forecastsDiv = createEl('div', ['class=forecasts']);
    const symbolSpan = createEl('span', weatherSymbols[dataCurrent.forecast.condition], ['class=condition symbol'])
    const conditionSpan = createEl('span', ['class=condition'])
    const dataLocationSpan = createEl('span', dataCurrent.name, ['class=forecast-data'])
    const dataDegreesSpan = createEl('span', `${dataCurrent.forecast.low}°/${dataCurrent.forecast.high}°`, ['class=forecast-data'])
    const dataConditionSpan = createEl('span', dataCurrent.forecast.condition, ['class=forecast-data'])

    conditionSpan.appendChild(dataLocationSpan);
    conditionSpan.appendChild(dataDegreesSpan);
    conditionSpan.appendChild(dataConditionSpan);
    forecastsDiv.appendChild(symbolSpan);
    forecastsDiv.appendChild(conditionSpan);
    currentDiv.appendChild(forecastsDiv);

    return currentDiv;
}

async function getThreeDaysWeather(locationCode) {
    const upcomingDiv = document.getElementById('upcoming');
    const forecastInfoDiv = createEl('div', '', ['class=forecast-info']);

    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`

    const responseUpcoming = await fetch(url);
    const dataUpcoming = await responseUpcoming.json();

    //HTML elements
    let threeDays = dataUpcoming.forecast.map(c => {
        const upcomingSpan = createEl('span', '', ['class=upcoming'])
        const symbolSpan = createEl('span', weatherSymbols[c.condition], ['class=symbol'])
        const dataDegreesSpan = createEl('span', `${c.low}°/${c.high}°`, ['class=forecast-data'])
        const dataConditionSpan = createEl('span', c.condition, ['class=forecast-data'])

        upcomingSpan.appendChild(symbolSpan);
        upcomingSpan.appendChild(dataDegreesSpan);
        upcomingSpan.appendChild(dataConditionSpan);
        forecastInfoDiv.appendChild(upcomingSpan);

    })

    upcomingDiv.appendChild(forecastInfoDiv);

    return upcomingDiv;
}

function createEl(type, content, attributes = []) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (attributes) {
        attributes.map(a => a.split('='))
            .forEach(([name, value]) => element.setAttribute(name, value));
    }

    return element;
}

