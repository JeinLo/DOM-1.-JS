const button = document.getElementById('add')
const list = document.getElementById('list')
const input = document.getElementById('field')

export const students = [
    { name: 'Глеб', age: 20 },
    { name: 'Иван', age: 30 },
    { name: 'Люси', age: 40 },
]

const initDeleteListeners = () => {
    const deleteElements = document.querySelectorAll('.delete')

    for (const deleteElement of deleteElements) {
        deleteElement.addEventListener('click', (event) => {
            event.stopPropagation() //Останавливает всплытие события вверх по дереву.
            const index = deleteElement.dataset.index
            students.splice(index, 1)
            renderStudents()
        })
    }
}

const initStudentsListeners = () => {
    const studentsElements = document.querySelectorAll('li')

    for (const studentElements of studentsElements) {
        studentElements.addEventListener('click', () => {
            const age = studentElements.dataset.age
            alert(`Возраст студента - ${age}`)
        })
    }
}

const renderStudents = () => {
    const studentsHtml = students
        .map((student, index) => {
            return `<li data-age='${student.age}'><span>${student.name}</span><button class="delete" data-index="${index}">удалить</button></li>`
        })
        .join('')

    list.innerHTML = studentsHtml

    initDeleteListeners()
    initStudentsListeners()
}

renderStudents()

button.addEventListener('click', () => {
    input.classList.remove('error')

    if (input.value === '') {
        input.classList.add('error')
        return
    }

    const newStudents = {
        name: input.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'), // Обработка пользовательского ввода
    }
    students.push(newStudents)
    input.value = ''
    renderStudents()
})
