export let comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        isLiked: false,
        likes: 3,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        isLiked: true,
        likes: 75,
    },
]

export const updateComments = (newComments) => {
    comments = newComments
}