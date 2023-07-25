
// let place_name = 'Ухта'
// let res;
let main = document.getElementById('air-pollution')
let link_map = ''

// Вешаем клик на кнопку поиска
document.getElementById('btn_getData').addEventListener('click', function () {
    if (document.getElementById('city').value.length) {
        getCitysList(document.getElementById('city').value)
    } else {
        main.innerHTML = 'Укажите название места';
    }
})

const createNode = el => {
    return document.createElement(el)
}
const appendToParent = (parent, el) => {
    return parent.appendChild(el)
}

/**
 * Получение списка мест
 * @param {string} place_name 
 */
const getCitysList = place_name => {
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

    fetch(API_URL_GEO_DATA)
        .then(res => res.json())
        .then(data => {
            if (data.response.GeoObjectCollection.featureMember.length) {
                allData = data.response.GeoObjectCollection.featureMember
                renderListResult(data.response.GeoObjectCollection.featureMember)
            } else {
                main.innerHTML = 'Упс... Мы не нашли такого города!';
            }
        })
        .catch(err => {
            main.innerHTML = 'Упс... Мы не нашли такого города!';
        })
}
/**
 * Получение данных по указанному месту
 * @param {string} place_name 
 */
const getCityData = place_name => {
    let coordinates = [];
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

    fetch(API_URL_GEO_DATA)
        .then(res => res.json())
        .then(data => coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' '))
        .then(() => {
            const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[1]}&longitude=${coordinates[0]}&hourly=pm10,pm2_5`
            link_map =
                `<span style="margin: 1rem 0 0'">Выбранное место: <a href="https://yandex.ru/maps/?text=${coordinates[1]}%2C${coordinates[0]}" target="_blank">${place_name}<a></span>`

            fetch(API_OPEN_METEO)
                .then(res => res.json())
                .then(data => renderView(data.hourly))
        })
        .catch(err => {
            main.innerHTML = 'Упс... Мы не нашли такого города!';
        })
}

/**
 * Вывод разметки с данными по указанному месту
 * @param {array} res 
 */
const renderView = (res) => {
    templ = `<div>
                <div style="display:inline-block; width:240px; margin:6px 0 0;">%date% (<span style="color:#0072c6">%value1%</span>, <span style="color:red">%value2%</span>)</div>
                <div style="display:inline-block; height:14px; width:%graf1%px; background:#0072c6;" title="pm10"></div><span style="margin: 0 0 0 14px;">%value1%</span><br>
                <div style="display:inline-block; height:14px; width:%graf2%px; background:#1ce700; margin-left: 244px;" title="pm2_5"></div><span style="margin: 0 0 0 14px;">%value2%</span>
            </div>`

    let pm;
    pm = createNode('div');
    pm.innerHTML = `<h4>Показания</h4>`

    res.time.map(
        (date, i) => {
            let d = new Date(date)
            div = createNode('div')
            div.innerHTML =
                templ.replace('%date%', `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`)
                    .replaceAll('%value1%', res.pm10[i])
                    .replace('%graf1%', res.pm10[i] * 10)
                    .replaceAll('%value2%', res.pm2_5[i])
                    .replace('%graf2%', res.pm2_5[i] * 10)
            appendToParent(pm, div)
        }
    )
    main.innerHTML = link_map;
    appendToParent(main, pm)

}

/**
 * Вывод разметки списка выриантов
 * @param {array} res 
 */
const renderListResult = (res) => {
    let ul = createNode('ul')
    res.forEach(el => {
        let li = createNode('li')
        li.style = 'cursor:pointer'
        li.innerHTML = `${el.GeoObject.name}, ${el.GeoObject.description}`
        li.dataset['name'] = el.GeoObject.name
        appendToParent(ul, li)
        li.addEventListener('click', function () {
            getCityData(this.dataset['name'])
        })
    })
    main.innerHTML = '';
    appendToParent(main, ul)
}