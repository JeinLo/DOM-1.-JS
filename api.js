export function getPromise () {
    return fetch("https://wedev-api.sky.pro/api/v1/Angellina/comments",{
			method: "GET"
			}).then((response) => {
			return response.json();
		}).then((responseData) => {
			//массив из API
      //comments = 
      responseData.comments.map((comment) => {
					// дата и время
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
      })
}

export function postPromise({ text, name})  {
return fetch(" https://wedev-api.sky.pro/api/v1/Angellina/comments",{
						method: "POST",	
						body:	JSON.stringify ({
							text: textInputElement.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
							name: nameInputElement.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
							forceError: true
						}),
				}).then((response) => {
          console.log(response);

                if (response.status === 201) {
                return response.json();
                }else if (response.status === 500) {
                throw new Error("Сервер сломался")
                } else if (response.status === 400) {
                throw new Error("Недопустимое количество символов")
                }
                //}).then((response) => {
					//commentsFunction();
				})
      }
   