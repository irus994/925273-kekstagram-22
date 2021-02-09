
// Функция возвращающая случайное число из диапазона
const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  //случайное число меньше единицы умножаем на возможное количество чисел в диапазоне + 1, чтобы
  //учесть отсчет идуший с 0, а не с 1. Прибавляем минимальное значение, чтобы сдвинуть диапазон к его точке отсчета
  //и округляем все в меньшую сторону
}
randomNumber(50, 160);
export {randomNumber};

// Функция для проверки максимальной длины строки
const lineLength = function (comment, maxLength) {
  return comment.length <= maxLength;
}
lineLength('строка', 140)
