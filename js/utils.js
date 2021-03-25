
const ALERT_SHOW_TIME = 5000;
export const  ALTER_MESSAGE = 'Ошибка, попробуйте еще раз';

// Функция возвращающая случайное число из диапазона
//случайное число меньше единицы умножаем на возможное количество чисел в диапазоне + 1, чтобы
//учесть отсчет идуший с 0, а не с 1. Прибавляем минимальное значение, чтобы сдвинуть диапазон к его точке отсчета
//и округляем все в меньшую сторону
export const createRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Создание всплывающего окна с сообщением об ошибке
export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '0';
  alertContainer.style.width = '500px';
  alertContainer.style.height = '50px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME)
};
