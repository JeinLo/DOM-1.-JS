// Функция получения комментария из API
export function getComment() {
	return fetch(
		"https://wedev-api.sky.pro/api/v1/Pavel-Kalashnikoff/comments",
		{
			method: "GET"
		}).then((response) => {
			// Ставлю условие, если статус 500, то возвращаю промис с ключевыми словами - "Упавший сервер"
			// Иначе дальше выполняю код
		if (response.status === 500) {
			return Promise.reject("Упавший сервер");
		}
		else {
			return response.json();
		}
	});
}
// Функция написания комментария
export function postComment({text, name}) {
	return fetch(
		"https://wedev-api.sky.pro/api/v1/Pavel-Kalashnikoff/comments",
		{
			method: "POST",	
			body:	JSON.stringify ({
			text: text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
			name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
			}),
		}
	).then((response) => {
		// Добавляю условие если статус ошибки 400 и кол-во символов в полях меньше 3
		// То возвращаяю промис с ключевыми словами иначе дальше выполняю код
		if (response.status === 400 && (shortName.length < 3|| shortComment.length < 3)) {
			return Promise.reject("Короткий запрос");
		}
		if (response.status === 500) {
	return Promise.reject("Упавший сервер");
		}
	else {
			return response.json();
		};
	});
}

