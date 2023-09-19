/**
 * Конвертация температуры
 * @param {number} value температура
 * @param {string} unit единицы измерения
 * @returns 
 */
function convertTemperature(value, unit) {
    if (unit === "Fahrenheit") {
        return (value - 32) * 5 / 9;
    } else if (unit === "Celsius") {
        return value * 9 / 5 + 32;
    }
}

const unitRus = {
    'Fahrenheit': 'цельсию',
    'Celsius': 'фаренгейту',
}

function updResult() {
    const temperature = parseFloat(document.getElementById("temperature-input").value || 0);
    const unit = document.getElementById("unit-select").value;
    const convertedTemperature = convertTemperature(temperature, unit);
    // console.log(temperature, unit, convertedTemperature)
    document.getElementById("result").innerText = `${convertedTemperature.toFixed(5)}° по ${unitRus[unit]}`;
}

document
    .getElementById("temperature-input")
    .addEventListener('keyup', () => updResult());
document.getElementById("unit-select")
    .addEventListener('change', () => updResult());

updResult();
