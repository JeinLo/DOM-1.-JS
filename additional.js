
	
	// Доп. задание - создаю фукнцию для неактивной кнопки при незаполненом поле
export function checkInputs(acceptName, acceptComment, buttonElement) {
		if (acceptName.value.trim() === "" || acceptComment.value.trim() === "") {
			buttonElement.disabled = true;
			buttonElement.classList.add("gray");
		} else {
			buttonElement.disabled = false;
			buttonElement.classList.remove("gray");
		};
		acceptName.addEventListener("input", checkInputs);
		acceptComment.addEventListener("input", checkInputs);
}