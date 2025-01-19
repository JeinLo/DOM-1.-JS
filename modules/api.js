import { formatCustomDate } from './date.js'

const host = 'https://wedev-api.sky.pro/api/v1/Giorgi-Bahuta'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((resData) => {
            const appComments = resData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatCustomDate(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                }
            })

            return appComments
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    }).then(() => {
        return fetchComments()
    })
}
