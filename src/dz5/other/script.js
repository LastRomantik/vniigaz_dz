console.log('Work')

// Массив с меткам месяцев
const labels = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

// Получаем canvas элемент
const canvas = document.getElementById('canvas')

// Указываем элемент для 2D рисования 
// настраиваем на то, что бы рисовать 2D объекты
const ctx = canvas.getContext('2d')


// сделали по высоте метки допустимых значениях, 
// а по ширине в качестве меток месяцы
ctx.fillStyle = "black"; // Задаём чёрный цвет для линий 
ctx.lineWidth = 2.0; // Ширина линии
ctx.beginPath(); // Запускает путь
ctx.moveTo(30, 10); // Указываем начальный путь
ctx.lineTo(30, 460); // Перемешаем указатель
ctx.lineTo(1500, 460); // Ещё раз перемешаем указатель
ctx.stroke(); // Делаем контур

// Цвет для рисования
ctx.fillStyle = "black";
// Цикл для отображения значений по Y 
for (let i = 0; i < labels.length; i++) {
    ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60);
    ctx.beginPath();
    ctx.moveTo(25, i * 80 + 60);
    ctx.lineTo(30, i * 80 + 60);
    ctx.stroke();
}

// Выводим метки
for (let i = 0; i < labels.length; i++) {
    ctx.fillText(labels[i], 50 + i * 100, 475);
}

// Рисуем столбцы

// Объявляем массив данных графика
let data = [10, 53, 39, 54, 21, 10, 53, 39, 54, 21, 22, 40];

// Назначаем зелёный цвет для графика
ctx.fillStyle = "green";
// Цикл для от рисовки графиков
for (var i = 0; i < data.length; i++) {
    var dp = data[i];
    ctx.fillRect(40 + i * 100, 460 - dp * 5, 50, dp * 5);
}