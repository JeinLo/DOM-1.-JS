"use strict";
import { checkInputs } from "./additional.js";
// Импортирую функцию запроса контента API и др.
import { getComment, postComment } from "./api.js";

// Объявляю константы для хранения данных
const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('comment-script');
const acceptName = document.getElementById('input-accept-name');
const acceptComment = document.getElementById('textarea-accept-comment');
const buttonDelete =  document.getElementById('delete-button');
const waitForLoading = document.getElementById('wait_for_loading');



// ДЗ API №1
function dataAcquisitionFunction () {
	buttonElement.disabled = true;
		buttonElement.textContent = 'Комментарий загружается'
		acceptName.disabled = true;
		acceptComment.disabled = true;

	// Получаю данные из API 
	// Вызываю функцию getComment из модуля
getComment().then((responseData) => {
	//Обращаюсь к массиву из API
		commentators = responseData.comments.map((comment) => {
			//Добавил константы даты и времени.
			const currentDate = new Date(comment.date).toLocaleDateString('ru-Ru');
			const currentTime = new Date(comment.date).toLocaleTimeString('ru-RU');
			return {
				name: comment.author.name,
				data: `${currentDate} ${currentTime}`,
				comment: comment.text,
				like: comment.likes, 
				isLike: comment.isLiked
			};
		});
		renderCommentators();
		waitForLoading.classList.add('hide'); 
	}).then((response) => {
	buttonElement.classList.remove('gray')
	buttonElement.disabled = false;
	buttonElement.textContent = 'Написать';
	acceptName.disabled = false;
	acceptComment.disabled = false;

	// Добавляю catch для обработки ошибки статуса 500
}).catch((error) => {
	if (error === "Упавший сервер") {
		alert("Да..кажется что-то пошло не так, попробуй позже");
	console.log('Ошибочка');
	}
});
};

dataAcquisitionFunction ();


//Добавляю массив на основе разметки HTML.
let commentators = [];

		//Вызываю фукнцию из другого модуля по доп. заданиям
		checkInputs(acceptName, acceptComment, buttonElement);

// 	// Доп. задание - добавляю кнопку удалить и пишу её функционал
buttonDelete.addEventListener('click', () => {
commentators.pop();
renderCommentators();
checkInputs();
});

// Функция, которая делает кнопку "удалить" неактивной когда в массиве нет элементов
function inactiveDeleteButton() {
if (commentators.length === 0) {
	buttonDelete.disabled = true;
	buttonDelete.classList.add("gray-delete");
} else {
	buttonDelete.disabled = false;
	buttonDelete.classList.remove("gray-delete");
}
};

// // Делаю доп.задание отправляю коммент по нажатию клавиши
document.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			buttonElement.click();
		}
	})

//Добавляю функцию лайка
const addLikeButtonEventListener = () => {
	const likesButtonElement = document.querySelectorAll('.like-button');
for (const likeButton of likesButtonElement) {
	let isLike = false;
	likeButton.addEventListener("click", event => {
		event.stopPropagation();
		const index = likeButton.dataset.index;
		if (commentators[index].isLike === false) {
			commentators[index].isLike = true;
			commentators[index].like++;
		} else {
			commentators[index].isLike = false;
			commentators[index].like--;
		}
		likeButton.classList.toggle('-active-like', commentators[index].isLike);
		renderCommentators();
		checkInputs();
	});
};
};


let text; 

// ДЗ 2.11 --- Реализую ответ на комментарий
const replyToCommentFunction = () => {
const replyComments = document.querySelectorAll('.comment-text');
const commentTextArea = document.getElementById('textarea-accept-comment');
for (const replyComment of replyComments) {
	replyComment.addEventListener("click", event => {
		event.stopPropagation();

	const replyUserName = event.target.closest('.comment').querySelector('.comment-header').dataset.user;
	text = replyComment.dataset.text;
	commentTextArea.value = text + ' ' + '\n : - ' + replyUserName;

		renderCommentators();
		checkInputs();
	});
};
};
	//Рендер функция
	const renderCommentators = () => {
	const commentatorHTML = commentators.map((commentator, index) => {
			return `<li class="comment">
			<div data-user="${commentator.name}" class="comment-header">
				${commentator.name}
				<div>${commentator.data}</div>
			</div>
			<div class="comment-body">
				<div data-text=">-${commentator.comment}" class="comment-text">
					${commentator.comment}
				</div>
			</div>
			<div class="comment-footer">
				<div class="likes">
					<span data-like="0" class="likes-counter">${commentator.like}</span>
					<button class="like-button ${commentator.isLike ? '-active-like' : ''}" data-index="${index}" ></button>
				</div>
			</div>
		</li>`;
		}).join("");
		listElement.innerHTML = commentatorHTML;
		addLikeButtonEventListener();
		replyToCommentFunction();
		inactiveDeleteButton();
	};

	// Клик на кнопку "Написать"
	buttonElement.addEventListener("click", () => {

		// Записываю введенные данные в переменные 
	const shortName = acceptName.value ;
	const shortComment = acceptComment.value;
	//Добавляю новый коммент в список
	
	//Вызываю фукнцию поста комментария из модуля API
		postComment({
			text: acceptName.value,
			name: acceptComment.value
		})
		.then((response) => {
			dataAcquisitionFunction();
			// Добавляю обработчик ошибки и при условии, что сообщение ошибки будет - "Упавший сервер",
			// То вывожу алерт, 
			// Изменил логику, не знаю в правильную ли сторону? 
			// Получается, при срабатывании ошибки ставлю условие, если ошибка имеет ключевые слова 
			// То выполняю код в if, иначе при другой ошибке т.е. 500 выполняю код о сообщении ошибки сервера.
		}).catch((error) => {
			console.log(error)
			if (error === "Короткий запрос") {
				alert("Вы ввели слишком короткий запрос. Запрос должен быть не менее 3 символов");
				acceptName.value = shortName;
				acceptComment.value = shortComment;
				return;
			} else {
				alert("Кажется, у нас сломался сервер, повторите попытку позже");
				
				return;
			}
		});
		
	// Очистка поля ввода для комментария и имени после отправления комментария
	const clearCommmentTextArea = document.querySelector('.add-form-text');
	const clearName = document.querySelector('.add-form-name');
	clearCommmentTextArea.value = '';
	clearName.value = '';
	renderCommentators();
	checkInputs();
});
renderCommentators();
checkInputs();