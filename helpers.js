export const correceDateApi = (myDate) => {
  //Создаю объекты для работы с датой
  let date = myDate.getDate();
  let month = myDate.getMonth();
  let year = myDate.getFullYear();
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();

  //Если в дате, месяце, часах и минутах будут числа меньше 10, добавлять к ним 0 в начале
  date = date < 10 ? "0" + date : date;
  month = month < 10 ? "0" + (month + 1) : month + 1;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  //Создаю объект, который включает в себя формат "день.месяц.год(последние две цифры) часы:минуты"
  return (
    date +
    "." +
    month +
    "." +
    year.toString().slice(2) +
    " " +
    hours +
    ":" +
    minutes
  );
};