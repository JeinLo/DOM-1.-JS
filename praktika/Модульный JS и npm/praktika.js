import { renderStudents } from './modules/renderStudents.js'
import { students } from './modules/students.js'

renderStudents()

const button = document.getElementById('add')
const input = document.getElementById('field')

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
