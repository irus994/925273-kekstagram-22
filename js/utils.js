
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
lineLength('строка', 140);



const alertShowTime = 5000;
export const alertMassege = 'Ошибка, попробуйте еще раз';


const showAlert = (massege) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.width = '500px';
  alertContainer.style.height = '50px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = massege;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, alertShowTime)

};

export {showAlert};

